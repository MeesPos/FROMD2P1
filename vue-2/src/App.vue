<template>
  <div id="app">
    <Header />
    <Towatch v-bind:towatch="towatch" v-on:del-towatch="deleteTowatch" />
    <AddTowatch v-on:add-towatch="AddTowatch"/>
  </div>
</template>

<script>
import Header from './components/layout/header';
import Towatch from './components/Towatch';
import AddTowatch from './components/AddTowatch';

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
          picture: "",
          place: "",
          completed: false
        },
        {
          id: 2,
          title: "Stranger Things",
          picture: "",
          place: "",
          completed: true
        },
      ],
    };
  },
  methods: {
    deleteTowatch(id) {
      this.towatch = this.towatch.filter((towatch) => towatch.id !== id);
    },
    AddTowatch(newTowatch) {
      this.towatch = [...this.towatch, newTowatch];
    }
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
