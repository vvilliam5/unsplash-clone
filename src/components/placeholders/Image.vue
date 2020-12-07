<template>
  <div class="relative rounded-md cursor-pointer">
    <ImageModal
      @closemodal="closemodal"
      :image="image"
      v-show="clicked"
    ></ImageModal>
    <div @click="clicked = true">
      <img
        :src="image.urls.small"
        class="rounded-md min-w-full min-w-full bg-gray-200 min-h-50 sm:min-h-100 lg:min-h-150 xl:min-h-200"
        :alt="image.alt_description"
      />
      <div
        class="rounded-md bg-gradient-to-t from-black absolute bottom-0 w-full h-full sm:h-3/6"
      ></div>
      <div class="absolute pl-3 pb-4 bottom-0 text-gray-300">
        <p class="font-medium sm:font-light text-msm sm:text-base">
          {{ image.user.name }}
        </p>
        <p class="font-light text-mxs sm:text-xs">{{ image.user.location }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import ImageModal from "../Modals/ImageModal";
export default {
  data() {
    return {
      clicked: false,
    };
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  components: {
    ImageModal,
  },
  methods: {
    closemodal() {
      this.clicked = false;
    },
  },
};
</script>