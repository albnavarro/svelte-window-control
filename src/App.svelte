<script>
    import TestComp from './component/TestComp.svelte';

    let componentList = [];
    let size = 50;
    let compId = 0

    const handleAddComponent = () => {
        const newComponent = {
            'component': TestComp,
            'props': {
                'size': size,
                'id': compId
            }
        }

        compId ++
        componentList = [...componentList, ...[newComponent]];
    }

    const handleRemoveComponent = ({detail : id}) => {
        componentList = componentList.filter((item) => item.props.id !== id)
    }

</script>


<main>
	<div class="nav">

        {#each componentList as {component, props}, index}
            <div class="add">
                <svelte:component this={component} {...props} on:remove-item="{ handleRemoveComponent }" />
            </div>
        {/each}

        <div class="add">
            <button type="button" class="add-btn" on:click="{() => handleAddComponent()}">
                add component
            </button>
        </div>

        <label>
            Size of component
            <input class="size-btn" type=number bind:value={size} min=10 max=200>
        </label>

    </div>
</main>

<style>
    .size-btn,
    .add-btn {
        width: 200px;
    }
</style>
