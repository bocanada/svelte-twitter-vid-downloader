import type { Tweet } from "$lib/twitter";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, setHeaders, params }): Promise<Tweet> => {
    const { tweetId } = params;


    // Cache the response
    setHeaders({
        'cache-control': `public, max-age=${60 * 60 * 24}`
    })

    const getTweet = async () => {
        const resp = await fetch("/api/tweetById", { method: "POST", body: JSON.stringify({ tweetId }) });
        const json = await resp.json()
        if (!resp.ok) {
            throw error(resp.status, json.error)
        }
        return json

    }
    return getTweet()
};