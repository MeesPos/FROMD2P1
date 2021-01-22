<template>
  <div id="app">
    <Header />
    <AddTowatch v-on:add-towatch="AddTowatch" />
    <Towatch v-bind:towatch="towatch" v-on:del-towatch="deleteTowatch" class="movie-items"/>
  </div>
</template>

<script>
import Header from "./components/layout/header";
import Towatch from "./components/Towatch";
import AddTowatch from "./components/AddTowatch";

export default {
  name: "App",
  components: {
    Header,
    Towatch,
    AddTowatch,
  },
  data() {
    return {
      towatch: [
        {
          id: 1,
          title: "Lost in Space",
          picture:
            "https://static.wikia.nocookie.net/lostinspace/images/0/08/Lost-in-space-poster.jpg/revision/latest/top-crop/width/360/height/360?cb=20180306154741",
          place: "Netflix",
          completed: true,
        },
        {
          id: 2,
          title: "Stranger Things",
          picture: "https://images-na.ssl-images-amazon.com/images/I/81PkURLEK1L._SL1500_.jpg",
          place: "Netflix",
          completed: true,
        },
        {
          id: 3,
          title: "1917",
          picture: "https://i.pinimg.com/736x/c7/d2/4a/c7d24a91e0d0d9fc1a56e7b1c86bc0ea.jpg",
          place: "Prime Video",
          completed: true,
        },
        {
          id: 4,
          title: "Tenet",
          picture: "https://pbs.twimg.com/media/EfKLphcWsAEtuC5.jpg",
          place: "Pathé Thuis",
          completed: false,
        }
      ],
    };
  },
  methods: {
    deleteTowatch(id) {
      this.towatch = this.towatch.filter((towatch) => towatch.id !== id);
    },
    AddTowatch(newTowatch) {
      this.towatch = [...this.towatch, newTowatch];
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.movie-items{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 50px;
}
</style>
