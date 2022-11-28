<script lang="ts">
    import type { Media, Variant } from "$lib/twitter";

    export let media: Media & { maxVariant: Variant };

    export let caption: string;
    export let uploadedBy: string;
    export let uploadedAt: Date;
</script>

<article>
    <header>
        <details role="list">
            <summary aria-haspopup="listbox">Bitrates</summary>
            <ul role="listbox">
                {#each media.variants as variant}
                    {#if variant.bit_rate}
                        <li>
                            <a href={variant.url}>
                                {variant.bit_rate}
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </details>
    </header>

    <div class="media-container">
        <video
            width={media.width}
            height={media.height}
            poster={media.preview_image_url}
            preload="none"
            controls
        >
            <source
                src={media.maxVariant.url}
                type={media.maxVariant.content_type}
                muted
            />
            <track kind="captions" />
        </video>
    </div>

    <footer>
        <blockquote>
            {caption}
            <footer>
                <cite
                    >-
                    <a href="https://twitter.com/{uploadedBy}">
                        {uploadedBy}
                    </a>,
                    <time datetime={uploadedAt.toISOString()}>
                        {uploadedAt.toLocaleDateString()}
                    </time>
                </cite>
            </footer>
        </blockquote>
    </footer>
</article>

<style>
    video {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>
