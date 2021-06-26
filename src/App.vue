<template lang="pug"> 
.bg-gray-50.min-h-screen
  nav.bg-gray-900.py-1.mb-4
    .max-w-2xl.w-full.mx-auto.text-white.text-left.space-x-4.px-4.text-sm.font-medium
      router-link(to="/", active-class="text-green-400") Cevaplar
      router-link(to="/about", active-class="text-green-400") Proje Hakkında
  <router-view />
</template> 
