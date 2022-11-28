<script lang="ts">
    import type { ActionData } from "./$types";
    import type { Tweet } from "$lib/twitter";
    import { enhance } from "$app/forms";
    import { transformTweet } from "$lib/utils";
    import VideoCard from "$lib/components/VideoCard.svelte";

    export let form: ActionData;

    $: ({ username, created_at, text } = form ?? {});

    $: allMedia = form?.media ? transformTweet(form as Tweet) : [];

    $: createdDate = new Date(created_at as string);

    $: isInvalidInput =
        form?.message !== undefined ||
        (form?.media === undefined ? null : false);

    let loading = false;
</script>

<svelte:head>
    {#if username && text}
        <title>@{username} - {text?.substring(0, 10)}...</title>
    {:else}
        <title>Twitter video downloader!</title>
    {/if}
</svelte:head>

<div>
    <h1 class="title">Twitter video downloader!</h1>
    <label for="tweetUrl" class="description">
        Enter a tweet URL and then press
        <kbd>ENTER</kbd>
    </label>

    <form
        action="?/getTweet"
        method="POST"
        use:enhance={() => {
            loading = true;
            return async ({ update }) => {
                await update({ reset: false });
                loading = false;
            };
        }}
    >
        <div class="grid">
            <input
                id="tweetUrl"
                name="tweetUrl"
                type="text"
                placeholder="Tweet URL"
                autocomplete="off"
                aria-invalid={isInvalidInput}
                aria-busy={loading}
                required
            />
            <button type="submit" aria-busy={loading} disabled={loading}>
                Go!
            </button>
        </div>
        {#if form?.message}
            <label for="tweetUrl">
                <small class="error"> {form?.message} </small>
            </label>
        {/if}
    </form>

    {#if !allMedia && !text}
        <i class="warn">This tweet contains no videos</i>
    {:else}
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

    .error {
        color: #b71c1c;
    }

    .title,
    .description,
    .warn {
        text-align: center;
    }

    .description {
        margin: 4rem 0;
        line-height: 1.5;
        font-size: 1.5rem;
    }
</style>
