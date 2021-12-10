<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { useScroll } from '../../utils/scrollutils/useScroll.js';
    import { useScrollEnd } from '../../utils/scrollutils/useScrollUtils.js';
    import { useScrollStart } from '../../utils/scrollutils/useScrollUtils.js';

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

        return() => {
            unsubscribeScroll();
            unsubscribeScrollEnd();
            unsubscribeScrollStart();
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
