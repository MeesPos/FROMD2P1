<template>
  <div id="app">
    <Header />
    <Towatch v-bind:towatch="towatch" v-on:del-towatch="deleteTowatch" />
  </div>
</template>

<script>
import Header from './components/layout/header';
import Towatch from "./components/Towatch";

export default {
  name: "App",
  components: {
    Header,
    Towatch
  },
  data() {
    return {
      towatch: [
        {
          id: 1,
          title: "Lost in Space",
          completed: false
        },
        {
          id: 2,
          title: "Stranger Things",
          completed: true
        },
      ],
    };
  },
  methods: {
    deleteTowatch(id) {
      this.towatch = this.towatch.filter((towatch) => towatch.id !== id);
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
</style>
