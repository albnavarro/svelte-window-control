<script context="module">
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
</script>

<script>
    import ScrollTesterItem from './ScrollTesterItem.svelte';

    let compId = 0;
    let componentList = [];

    const handleAddComponent = () => {
        const newComponent = {
            component: ScrollTesterItem,
            props: {
                id: compId,
            },
        };

        componentList = [...componentList, newComponent];

        compId++;
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
        <h1>Centralize window scrollEvent for multiple instances</h1>
        <p>
            scroll, scrollStart, scrollEnd
        </p>
        <p>
            Add and remove component, then scroll until first component and watch in console debug for ever instance
        </p>
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
    </div>
</section>

<style lang="scss">
    section {
        margin-top: 150vh;
        min-height: 1px;
    }

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
            padding: 0;
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
