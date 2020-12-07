<template>
  <div id="app">
    <component
      @search="search($event)"
      :searchWord="searchWord"
      :is="getComponent"
    ></component>
  </div>
</template>
<script>
import Landing from "./components/Landing";
import Search from "./components/Search";
export default {
  data() {
    return {
      searchWord: "",
      page: "home",
    };
  },
  components: {
    Landing,
    Search,
  },
  methods: {
    search(word) {
      this.searchWord = word;
      this.page = "Search";
    },
  },
  computed: {
    /**
     * @method getComponent
     * @description a simple component selector since there are only 2 component routes
     */
    getComponent() {
      return this.page === "home" ? "Landing" : "Search";
    },
  },
};
</script>
<style>
</style>
