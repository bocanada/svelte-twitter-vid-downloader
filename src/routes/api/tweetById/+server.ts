
import type { Tweet } from "$lib/twitter";
import { makeAPIUrl } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { BEARER_TOKEN } from "$env/static/private";

type Payload = {
    tweetId?: string
};

export const POST: RequestHandler = async ({ fetch, request, setHeaders }) => {
    const { tweetId } = await request.json() as Payload;
    if (!tweetId) {
        return json({ "error": "body is empty" }, { status: 400 });
    }

    const url = makeAPIUrl(tweetId);
    const resp = await fetch(url, {
        headers: {
            authorization: `Bearer ${BEARER_TOKEN}`
        }
    });

    if (!resp.ok) {
        console.error('Got an error', await resp.json());
        throw error(500, "Something bad has happened");
    }

    // Cache the response
    setHeaders({
        'cache-control': `public, max-age=${60 * 60 * 24}`
    });

    const { data, includes, errors } = await resp.json();
    const { media, users } = includes ?? {};

    if (errors) {
        const err = errors[0];
        if (err.title === 'Not Found Error') {
            throw error(404, err.detail);
        } else {
            throw error(500, err.detail);
        }
    }
    if (!media || !data) {
        throw error(400, "Tweet includes no videos");
    }

    const tweet = {
        id: data.id,
        text: data.text,
        created_at: data.created_at,
        media: media,
        username: users?.[0]?.username
    } as Tweet;

    return json(tweet);
};