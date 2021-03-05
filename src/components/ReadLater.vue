<template>
  <div>
    <div v-for="(library, index) in library" :key="index">
      <h1>{{ library.title }}</h1>
      <p v-html="library.description"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadLater",
  props: {
    library: {
      required: true,
      type: Array,
    },
    showLibrary: {
      type: Boolean,
    },
  },
  methods: {
    showDiv() {
      console.log(this.library);
    },
  },
};
</script>
