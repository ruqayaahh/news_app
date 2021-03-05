<template>
    <div>
        <h2>This is an about us page</h2>
    </div>
</template>

<script>
export default {
  mounted() {
      this.$axios.get('/top-headlines').then(res => console.log(res).catch(error => alert(error.response.data.message))  );
  }
}
</script>

<style scoped>

</style>