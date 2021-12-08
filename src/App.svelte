<script>
    import MouseTester from './component/mouse/MouseTester.svelte';
    import ScrollTester from './component/scroll/ScrollTester.svelte';

    let mouseCompIsActive = false;
    let scrollCompIsActive = false;

    function mouseHandler() {
        mouseCompIsActive = true;
        scrollCompIsActive = false;
    }

    function scrollHandler() {
        mouseCompIsActive = false;
        scrollCompIsActive = true;
    }
</script>

<main>
    <nav class="nav">
        <button type="button" on:click={ mouseHandler }>
            test mouse
        </button>
        <button type="button" on:click={ scrollHandler }>
            scroll test
        </button>
    </nav>
    <div class="components">
        {#if mouseCompIsActive}
            <MouseTester/>
        {/if}
        {#if scrollCompIsActive}
            <ScrollTester/>
        {/if}
    </div>
</main>

<style lang="scss">
    .nav {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
