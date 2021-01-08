<template>
    <div>
        <div v-bind:key="towatch.id" v-for="towatch in towatch">
            <TowatchItem v-bind:towatch="towatch" v-on:del-towatch="$emit('del-towatch', towatch.id)" />
        </div>
    </div>
</template>

<script>
import TowatchItem from './TowatchItem.vue';

export default {
    name: "Towatch",
    components: {
        TowatchItem
    },
    props : ["towatch"]
}
</script>

<style scoped>

</style>