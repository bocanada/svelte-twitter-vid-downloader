import { re, type TweetId } from "$lib/twitter";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

type Payload = {
    tweetUrl?: string
};

const parseUrl = (tweetUrl: URL): TweetId | Response => {
    const matches = re.exec(tweetUrl.pathname);
    if (!matches?.groups) {
        throw error(400, "couldn't find a tweet id on the url");
    }

    const { id } = matches.groups;
    return id
}

const parseRequest = async (request: Request) => {
    const { tweetUrl }: Payload = await request.json();
    if (!tweetUrl) {
        throw error(400, "invalid tweet url")
    }
    try {
        const userUrl = new URL(tweetUrl);
        return parseUrl(userUrl);
    } catch (e) {
        throw error(400, (e as Error).message)
    }
}

export const POST: RequestHandler = async ({ fetch, request }) => {
    const result = await parseRequest(request);

    return await fetch("/api/tweetById", {
        method: "POST",
        body: JSON.stringify({
            tweetId: result
        })
    });
};