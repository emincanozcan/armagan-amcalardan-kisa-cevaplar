<script>
import Container from '@/components/Container'

export default {
  components: { Container },
  setup() {}
}
</script>

<template lang="pug">
container
  article
    p Armağan Amcalar, Youtube'da sevdiğim videolar yayınlayan bir yazılım geliştirici. Videolarında paylaştığı fikirlerin oldukça değerli olduğunu düşünüyorum. Bu sebeple, videolarında yer alan bazı bölümleri daha kolay erişilebilir kılmak için bu hobi projesini hayata geçirdim.
    p İlgili videoları topladığım Youtube kanalına gitmek için{{ " " }}
      a(
        target='_blank',
        href='https://www.youtube.com/c/Arma%C4%9FanAmcalar/videos'
      ) tıklayınız.
    p Proje GitHub Reposuna gitmek için{{ " " }}
      a(
        target='_blank',
        href='https://github.com/emincanozcan/armagan-amcalardan-kisa-cevaplar'
      ) tıklayınız.
</template>

<style lang="scss" scoped>
article {
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07));
  color: #222;
  font-size: 0.875rem;
  line-height: 1.6;

  p:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  a {
    color: rgb(18, 175, 120);
  }
}
</style>
