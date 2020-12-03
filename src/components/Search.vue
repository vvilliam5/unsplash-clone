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
      <div v-for="n in 4" :key="n" class="col-span-4 sm:col-span-4">
        <ImageCard
          v-for="image in images[n - 1]"
          :key="image.id"
          :image="image"
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
import axios from "axios";
export default {
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
    axios
      .get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization:
            "Client-ID 0-KXM0n7e9HsEgCEit8vVK6J0kheYc_vpj0LR7Fi9K4",
        },
        params: {
          query: this.searchWord,
          page: 1,
          per_page: 12,
        },
      })
      .then((resp) => {
        //get length of response, then divide by 3, whatever you get then you create an array holdi that number, then another hodling that number
        let results = resp.data.results;
        let start = 0;
        let size = Math.ceil(results.length / 3);
        let end = size;
        for (let i = 0; i < 3; i++) {
          this.images.push(results.slice(start, end));
          start += size;
          end += size;
        }
      });
  },
  components: {
    Preloader,
    ImageCard,
  },
};
</script>