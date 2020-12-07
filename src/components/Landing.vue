<template>
  <div>
    <div class="backdrop bg-gray-300">
      <div class="w-4/5 mx-auto py-20">
        <form
          @submit.prevent="search"
          class="w-full bg-white py-5 rounded-md shadow-md grid grid-cols-12"
        >
          <SearchBarIcon class="col-span-2 lg:col-span-1 mx-auto" />
          <input
            class="col-span-6 xl:col-span-9 focus:outline-none"
            v-model="searchWord"
            placeholder="Search for Photo"
          />
          <span
            class="hidden sm:block col-end-13 col-span-4 lg:col-end-13 lg:col-span-3 xl:col-end-13 xl:col-span-2 text-gray-400"
            >Press Enter to Search</span
          >
        </form>
      </div>
    </div>
    <div v-if="isImageLoaded" class="xl:w-4/6 mx-auto grid grid-cols-12 -m-12">
      <div v-for="n in 3" :key="n" class="col-span-4 sm:col-span-4">
        <ImageCard
          v-for="image in images[n - 1]"
          :key="image.id"
          :image="image"
          :class="
            images[n - 1].indexOf(image) === images[n - 1].length - 1
              ? 'lastItem'
              : ''
          "
          :id="images[n - 1].indexOf(image)"
          class="mx-4 my-6"
        ></ImageCard>
      </div>
    </div>
    <div v-else class="xl:w-4/6 mx-auto grid grid-cols-12 -m-12">
      <Preloader v-for="n in 6" :key="n" class="m-2 sm:m-6 col-span-4" />
    </div>
  </div>
</template>
<script>
import SearchBarIcon from "./icon/Search";
import Preloader from "./placeholders/Preloader";
import ImageCard from "./placeholders/Image";
import { dataFetcher } from "@/mixins/dataFetcher.js";
export default {
  mixins: [dataFetcher],
  data() {
    return {
      images: [],
      counter: 0,
      searchWord: "",
      page: 1,
    };
  },
  computed: {
    isImageLoaded() {
      if (this.images.length > 0) return true;
      else return false;
    },
  },
  methods: {
    search() {
      this.$emit("search", this.searchWord);
    },
  },
  mounted() {
    this.partitionResults();
  },
  updated() {
    this.addIntersectionObserver();
  },
  components: {
    SearchBarIcon,
    Preloader,
    ImageCard,
  },
};
</script>