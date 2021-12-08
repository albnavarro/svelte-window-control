<script context="module">
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
</script>

<script>
    import MouseTestItem from './MouseTestItem.svelte';

    let componentList = [];
    let size = 50;
    let opacity = 1;
    let stiffness = 0.1;
    let compId = 0;

    const handleAddComponent = () => {
        const newComponent = {
            component: MouseTestItem,
            props: {
                size: size,
                opacity: opacity,
                stiffness: stiffness,
                id: compId,
            },
        };

        componentList = [...componentList, newComponent];

        compId++;
        size = clamp(size + 20, 50, 300);
        opacity = clamp(opacity - 0.1, 0.1, 1).toFixed(2);
        stiffness = clamp(stiffness - 0.01, 0.05, 0.1).toFixed(2);
    };

    const handleRemoveComponent = ({ detail: id }) => {
        componentList = componentList.filter((item) => item.props.id !== id);
    };

    const handleRemovelast = () => {
        componentList = componentList.filter(
            (item, index) => index < componentList.length - 1
        );
    };


</script>

<section>
    <div class="header">
        <h1> Centralize window mouseEvent for multiple instances </h1>
        <p> Detect touch or not and use only one listener for event type </p>
        <p> Add instance and look at console for event traking </p>
        <p> Centralize requestAnimationFrame at 60 or custom fps ( only test, native spring doesn't need it) </p>
    </div>

    {#each componentList as { component, props }, index (props.id)}
        <div class="istances">
            <svelte:component
                this={component}
                {...props}
                on:remove-item={handleRemoveComponent}
            />
        </div>
    {/each}

    <div class="nav">
        <div class="add">
            <button
                type="button"
                class="add-btn"
                on:click={() => handleAddComponent()}
            >
                add component
            </button>
        </div>

        <div class="add">
            <button
                type="button"
                class="add-btn"
                on:click={() => handleRemovelast()}
            >
                remove component
            </button>
        </div>

        <div>
            <span>
                Tot component: {componentList.length}
            </span>
        </div>

        <div>
            <span>
                Size: {size}
            </span>
            <input
                class="size-btn"
                bind:value={size}
                type="range"
                min="50"
                max="300"
                step="10"
            />
        </div>

        <div>
            <span>
                alpha: {opacity}
            </span>
            <input
                class="size-btn"
                bind:value={opacity}
                type="range"
                min="0.1"
                max="1"
                step="0.05"
            />
        </div>

        <div>
            <span>
                stiffness: {stiffness}
            </span>
            <input
                class="size-btn"
                bind:value={stiffness}
                type="range"
                min="0.05"
                max="0.1"
                step="0.01"
            />
        </div>
    </div>
</section>

<style lang="scss">
    .size-btn,
    .add-btn {
        width: 200px;
    }

    .header {
        position: fixed;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        :global(p) {
            margin: 0;
            padding: 0
        }
    }

    .nav {
        position: fixed;
        top: 30px;
        right: 30px;
    }

    span {
        display: block;
        margin-top: 20px;
    }
</style>
