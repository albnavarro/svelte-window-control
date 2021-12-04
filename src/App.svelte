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

        compId ++
        size = clamp(size + 20, 20, 300);
        opacity = clamp(opacity - .1, .1, 1).toFixed(2);
        stiffness = clamp(stiffness - 0.01, .05, .1).toFixed(2);

        componentList = [...componentList, ...[newComponent]];
    }

    const handleRemoveComponent = ({detail : id}) => {
        componentList = componentList.filter((item) => item.props.id !== id)
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

        <label>
            Size of component
            <input class="size-btn" type=number bind:value={size}>
        </label>

        <label>
            alpha of component
            <input class="size-btn" type=number bind:value={opacity} step='0.01'>
        </label>

        <label>
            alpha of stiffness
            <input class="size-btn" type=number bind:value={stiffness} step='0.01'>
        </label>
    </div>

</main>

<style>
    .size-btn,
    .add-btn {
        width: 200px;
    }

    .nav {
        position: fixed;
        top: 30px;
        right: 30px;
    }
</style>
