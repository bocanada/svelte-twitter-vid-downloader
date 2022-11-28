export const API_URL_TEMPLATE = 'https://api.twitter.com/2/tweets/{}';

export type TweetId = string;


export type MediaType = "video" | "photo" | "animated_gif"

export type Variant = {
    bit_rate: number;
    url: string;
    content_type?: string;
}
export type Media = {
    width: number;
    height: number;
    preview_image_url: string;
    variants: Variant[];
    type: MediaType;
}

export type Tweet = {
    id: string,
    text: string,
    created_at: string,
    media: Media[],
    username?: string,
}

export type MediaMaxVariant = Media & {
    maxVariant: Variant
}

export const re = new RegExp(/\/[\w]*\/status\/(?<id>\d*)$/);
