import type { Tweet } from "$lib/twitter";
import { invalid, type Actions, type ValidationError } from "@sveltejs/kit";

type Payload = {
    tweetId: string;
};

type Response = Tweet | ValidationError<{ message?: string }>;

export const actions: Actions = {
    getTweet: async ({ fetch, request, setHeaders }): Promise<Response> => {
        const formData = Object.fromEntries(await request.formData()) as Payload;

        // Cache the response
        setHeaders({
            'cache-control': `public, max-age=${60 * 60 * 24}`
        });

        const resp = await fetch("/api/tweetByUrl", {
            method: "POST"
            , body: JSON.stringify(formData)
        });

        const json = await resp.json();

        if (!resp.ok) {
            return invalid<{ message?: string }>(resp.status, json) as Response;
        }
        return json as Response;
    }

};