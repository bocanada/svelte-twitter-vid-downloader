<script lang="ts">
    import type { PageData } from "./$types";
    import { transformTweet } from "$lib/utils";
    import VideoCard from "$lib/components/VideoCard.svelte";
    import { page } from "$app/stores";

    export let data: PageData;

    $: ({ username, created_at, text } = data ?? {});
    $: allMedia = transformTweet(data);

    $: createdDate = new Date(created_at as string);
</script>

<svelte:head>
    <title>@{username} - {text.substring(0, 10)}...</title>
    <meta name="description" content={text} />

    <!-- Twitter Card Data -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content="@{username} - {text.substring(0, 10)}"
    />
    <meta name="twitter:site" content="@bocanada" />
    <meta name="twitter:creator" content="@{username}" />
    <meta name="twitter:description" content={text} />
    <meta name="twitter:image" content={allMedia[0].preview_image_url} />

    <!-- Open Graph Data -->
    <meta name="og:title" content="@{username} - {text.substring(0, 10)}" />
    <meta name="og:description" content={text} />
    <meta name="og:image" content={allMedia[0].preview_image_url} />
    <meta name="og:url" content={$page.url.toString()} />
</svelte:head>

<div class="flex">
    <h1 class="title">Twitter video downloader!</h1>
    {#if data?.media}
        {#each allMedia as media}
            <VideoCard
                {media}
                caption={text ?? ""}
                uploadedAt={createdDate}
                uploadedBy={username ?? "anon"}
            />
        {/each}
    {/if}
</div>

<style>
    .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
    }

    .title {
        text-align: center;
    }

    .flex {
        flex: auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4rem 0;
    }
</style>
