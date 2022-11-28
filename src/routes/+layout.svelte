<svelte:head>
    <!-- Open Graph Data -->
    <meta name="og:type" content="article" />
    <meta name="og:site_name" content="Twitter Video Downloader" />
</svelte:head>

<main class="container main">
    <slot />
</main>

<style>
    .main {
        min-height: 100vh;
        padding: 4rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
