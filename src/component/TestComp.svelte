<script>
    import { createEventDispatcher } from 'svelte'
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';

    const dispatch = createEventDispatcher()

    export let size = 50;
    export let id = 0;

    onMount(() => {
		console.log(`comp ${id} mounted`);
	});

    onDestroy(() => {
        console.log('the component is being destroyed');
    })

</script>


<div class="test-component">
    <div class="sqaure" style='height:{size}px;width:{size}px;'>
        {id}
    </div>
    <button type="button" class="remove-btn" on:click={dispatch("remove-item", id)}>
        remove item {id}
    </button>
</div>


<style>

.sqaure {
    width: 100px;
    height: 100px;
    background: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

</style>
