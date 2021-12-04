<script>
    import { createEventDispatcher } from 'svelte'
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
    import { afterUpdate } from 'svelte';
    import { spring } from 'svelte/motion';
    import { addframe } from '../store/useFrame.js'

    // Create dispatch event
    const dispatch = createEventDispatcher()

    // Props
    export let size = 50;
    export let opacity = 1;
    export let stiffness = .1
    export let id = 0;

    // Get element withouse use bidirection bind and fire update Component
    let element;
    const getNode = (node) => {
        element = node;
    }

    // animation caluculator store
    const coords = spring({ x: 0, y: 0 }, {
        stiffness,
        damping: 0.5
    });

    const handleCoords = (e) => {
        coords.set({ x: e.clientX, y: e.clientY })
    }

    // React to store changes and request animation frame
    const unsuscribe = coords.subscribe(({x,y}) => {
        addframe(() => {
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    })

    // Update stle with prop
    $: circleStyle = `height:${size}px;width:${size}px;opacity:${opacity};`
    $: compStyle = `z-index:${50-id};`

    onMount(() => {
		console.log(`comp ${id} mounted`);
	});

    afterUpdate(() => {
		console.log('the component just updated');
	});

    onDestroy(() => {
        unsuscribe
        console.log('the component is being destroyed');
    })

</script>

<svelte:window on:mousemove="{ handleCoords }"/>

<div class="test-component" use:getNode style='{compStyle}'>
    <div  class="circle" style='{circleStyle}'>
        {id}
    </div>
</div>
<button type="button" class="remove-btn" on:click={dispatch("remove-item", id)}>
    remove item {id}
</button>


<style>

.test-component {
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}

.circle {
    width: 100px;
    height: 100px;
    background: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
