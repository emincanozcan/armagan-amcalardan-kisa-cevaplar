<script>
import Container from '@/components/Container'

export default {
  components: { Container }
}
</script>

<template lang="pug">
main
  nav
    Container
      router-link(to='/', active-class='active') Cevaplar
      router-link(to='/about', active-class='active') Proje Hakkında
  router-view
</template>

<style lang="scss" scoped>
main {
  background: #f4f4f4;
  min-height: 100vh;
}

nav {
  background: #222;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

nav a {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  margin-right: 1.5rem;

  &.active {
    color: rgb(50, 220, 160);
  }
}
</style>
