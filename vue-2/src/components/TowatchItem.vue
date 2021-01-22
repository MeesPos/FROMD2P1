<template>
    <div class="towatch-item" v-bind:class="{'is-complete':towatch.completed}">
        <img class="item-image" v-bind:src="towatch.picture" v-bind:alt="towatch.title">
        <div class="content">
            <span class="movie-title">{{towatch.title}}</span><br>
            <span class="te-bekijken">Te bekijken op: {{towatch.place}}</span>
            <div class="buttons">
                <input type="checkbox" v-on:change="markComplete" class="completed">
                <button @click="$emit('del-towatch', towatch.id)" class="del">Verwijderen</button>
            </div>
        </div>
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
        background: #F8F8F8;
        margin: 20px;
        border-radius: 20px;
        width: 100%;
        box-shadow: 0 3px 6px rgba(0,0,0,.2);
        transition: .5s;
        position: relative;
    }

    .item-image{
        width: 100%;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
        height: 350px;
    }

    .movie-title{
        font-size: 20px;
        font-weight: bold;
    }

    .del{
        background: red;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 10px;
        position: absolute;
        right: 10px;
        bottom: 5px;
    }

    .buttons{
        padding: 5px 0;
    }

    .is-complete{
        background: lightgreen;
    }

    .content{
        margin: 4px 10px;
    }
</style>