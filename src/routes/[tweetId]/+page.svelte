<script lang="ts">
    import type { PageData } from "./$types";
    import { transformTweet } from "$lib/utils";
    import VideoCard from "$lib/components/VideoCard.svelte";

    export let data: PageData;

    $: ({ username, created_at, text } = data ?? {});
    $: allMedia = transformTweet(data);

    $: createdDate = new Date(created_at as string);
</script>

<svelte:head>
    <title>@{username} - {text.substring(0, 10)}...</title>
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
