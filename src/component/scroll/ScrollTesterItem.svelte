<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { useScroll } from '../../utils/scrollUtils/useScroll.js';
    import { useScrollEnd } from '../../utils/scrollUtils/useScrollUtils.js';
    import { useScrollStart } from '../../utils/scrollUtils/useScrollUtils.js';
    import { useResize } from '../../utils/resizeUtils/useResize.js';

    export let id = 0;

    // Create dispatch event
    const dispatch = createEventDispatcher();

    onMount(() => {
        const unsubscribeScrollStart = useScrollStart(({scrolY}) => {
            console.log('start scroll at', scrolY);
        });

        const unsubscribeScroll = useScroll(({scrolY, direction}) => {
            console.log(scrolY,direction);
        });

        const unsubscribeScrollEnd = useScrollEnd(({scrolY}) => {
            console.log('end scroll at', scrolY);
        });

        const unsubscribeResize = useResize(({scrolY, windowsHeight, windowsWidth, documentHeight}) => {
            console.log('resize', scrolY, windowsHeight, windowsWidth, documentHeight);
        });

        return() => {
            unsubscribeScroll();
            unsubscribeScrollEnd();
            unsubscribeScrollStart();
            unsubscribeResize();
        };
    });

</script>

<div class="item">
    <button type="button" class="remove-btn" on:click={dispatch('remove-item', id)}>
        remove item {id}
    </button>
</div>

<style lang="scss">
    .item {
        width: 200px;
        height: 400px;
        background: red;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
