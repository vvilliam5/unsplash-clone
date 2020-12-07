<template>
  <div>
    <div class="backdrop bg-gray-300">
      <div class="w-4/5 mx-auto py-20">
        <h1 class="text-2xl sm:text-5xl font-semibold">
          {{ isImageLoaded ? "Search Results for" : "Searching for " }}
          <span class="text-gray-500">"{{ searchWord }}"</span>
        </h1>
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
import Preloader from "./placeholders/Preloader";
import ImageCard from "./placeholders/Image";
import { dataFetcher } from "@/mixins/dataFetcher.js";

export default {
  mixins: [dataFetcher],
  data() {
    return {
      images: [],
      counter: 0,
    };
  },
  props: {
    searchWord: {
      type: String,
      required: true,
    },
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
    this.partitionResults(this.searchWord);
  },
  updated() {
    this.addIntersectionObserver();
  },
  components: {
    Preloader,
    ImageCard,
  },
};
</script>