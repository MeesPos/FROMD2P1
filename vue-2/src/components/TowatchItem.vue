<template>
    <div class="towatch-item" v-bind:class="{'is-complete':towatch.completed}">
        <p>
            <input type="checkbox" v-on:change="markComplete">
            {{towatch.title}}</p>
            <button @click="$emit('del-towatch', towatch.id)" class="del" >x</button>
    </div>
</template>

<script>
export default {
    name: "TowatchItem",
    props: ["towatch"],
    methods: {
        markComplete() {
            this.towatch.completed = !this.towatch.completed;
        }
    }
}
</script>

<style scoped>
    .towatch-item{
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }

    .is-complete{
        text-decoration: line-through;
    }

    .del{
        background: #ff0000;
        color: #fff;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }
</style>