<template>
  <div
    @click="closeModal($event)"
    class="overflow-y-scroll fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 grid"
  >
    <div class="sm:w-4/6 mx-auto opacity-100 self-center space-y-4">
      <CloseIcon class="ml-auto"></CloseIcon>
      <div class="w-5/6 mx-auto">
        <img
          class="rounded-t-lg"
          id="content"
          :src="image.urls.regular"
          :alt="image.alt_description"
        />
        <div class="bg-white px-10 py-8 rounded-b-lg" id="content">
          <p class="font-medium sm:text-3xl" id="content">
            {{ image.user.name }}
          </p>
          <p class="font-light text-xs sm:text-xl" id="content">
            {{ image.user.location }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from "../icon/Close";
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  components: {
    CloseIcon,
  },
  methods: {
    closeModal(event) {
      if (event.target.id.includes("content")) {
        return;
      } else {
        this.$emit("closemodal");
      }
    },
  },
};
</script>