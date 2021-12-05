<script context="module">
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
</script>

<script>
    import TestComp from './component/TestComp.svelte';

    let componentList = [];
    let size = 50;
    let opacity = 1;
    let stiffness = .1;
    let compId = 0;

    const handleAddComponent = () => {
        const newComponent = {
            'component': TestComp,
            'props': {
                'size': size,
                'opacity': opacity,
                'stiffness': stiffness,
                'id': compId
            }
        }

        componentList = [...componentList, newComponent];

        compId ++
        size = clamp(size + 20, 50, 300);
        opacity = clamp(opacity - .1, .1, 1).toFixed(2);
        stiffness = clamp(stiffness - 0.01, .05, .1).toFixed(2);
    }

    const handleRemoveComponent = ({detail : id}) => {
        componentList = componentList.filter((item) => item.props.id !== id)
    }

    const handleRemovelast = () => {
        componentList = componentList.filter((item, index) => index < componentList.length - 1);
    }

</script>


<main>
    {#each componentList as {component, props}, index}
        <div class="istances">
            <svelte:component this={component} {...props} on:remove-item="{ handleRemoveComponent }" />
        </div>
    {/each}

    <div class="nav">
        <div class="add">
            <button type="button" class="add-btn" on:click="{() => handleAddComponent()}">
                add component
            </button>
        </div>

        <div class="add">
            <button type="button" class="add-btn" on:click="{() => handleRemovelast()}">
                remove component
            </button>
        </div>

        <label>
            <span>
                Tot component: {componentList.length}
            </span>
        </label>

        <label>
            <span>
                Size: {size}
            </span>
            <input class="size-btn" bind:value={size} type="range" min="50" max="300" step="10">
        </label>

        <label>
            <span>
                alpha: {opacity}
            </span>
            <input class="size-btn" bind:value={opacity} type="range" min="0.1" max="1" step="0.05">
        </label>

        <label>
            <span>
                stiffness: {stiffness}
            </span>
            <input class="size-btn" bind:value={stiffness} type="range" min="0.05" max="0.1" step="0.01">
        </label>
    </div>

</main>

<style lang="scss">
    .size-btn,
    .add-btn {
        width: 200px;
    }

    .nav {
        position: fixed;
        top: 30px;
        right: 30px;
    }

    label span{
        display: block;
        margin-top: 20px;
    }
</style>
