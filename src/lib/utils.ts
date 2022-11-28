import { API_URL_TEMPLATE, type MediaMaxVariant, type Tweet, type TweetId } from "./twitter";

export const toNumber = (t: any): Number => {
    const n = Number(t);
    return isNaN(n) ? -1 : n;
}

export const makeAPIUrl = (id: TweetId) => {
    const url = new URL(API_URL_TEMPLATE.replace('{}', id));
    const qParams = {
        "tweet.fields": "attachments,created_at"
        , "expansions": "attachments.media_keys,author_id"
        , "media.fields": "duration_ms,height,media_key,preview_image_url,type,url,width,variants"
    };

    for (const [k, v] of Object.entries(qParams)) {
        url.searchParams.append(k, v);
    }
    return url
}

export const transformTweet = ({ media }: Tweet) => {
    return media.filter((m) => m.type !== "photo")?.map((m) => {
        return {
            ...m,
            maxVariant: m.variants?.reduce((p, c) =>
                toNumber(p.bit_rate) > toNumber(c.bit_rate) ? p : c
            ),
        };
    }) as MediaMaxVariant[];

}

export const dbg = (o: any) => {
    console.log('dbg', o);
    return o;
}