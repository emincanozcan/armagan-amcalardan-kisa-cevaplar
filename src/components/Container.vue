<template lang="pug">
.container
  slot
</template>
<script>
export default { name: "Container" };
</script>
<style scoped>
.container {
  max-width: 44rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
