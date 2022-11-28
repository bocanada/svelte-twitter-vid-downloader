import { re, makeAPIUrl, type TweetId, type Tweet } from "$lib/twitter";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { BEARER_TOKEN } from "$env/static/private";

type Payload = {
    tweetUrl?: string
};

const parseUrl = (tweetUrl: URL): TweetId | Response => {
    const matches = re.exec(tweetUrl.pathname);
    if (!matches?.groups) {
        return json({ "error": "couldn't find a tweet id on the url" }, { status: 400 });
    }

    const { id } = matches.groups;
    return id
}

const parseRequest = async (request: Request) => {
    const { tweetUrl }: Payload = await request.json();
    if (!tweetUrl) {
        return json({ "error": "invalid tweet url" }, { status: 400 })
    }
    try {
        const userUrl = new URL(tweetUrl);
        return parseUrl(userUrl);
    } catch (e) {
        return json({ "error": (e as Error).message }, { status: 400 })
    }
}

export const POST: RequestHandler = async ({ fetch, request }) => {
    const result = await parseRequest(request);
    if (result instanceof Response) {
        return result;
    }

    return await fetch("/api/tweetById", {
        method: "POST",
        body: JSON.stringify({
            tweetId: result
        })
    });
};