<template>
  <div :class="ns.b()">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" :class="ns.e('logo')" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img
        src="./assets/vue.svg"
        :class="[ns.e('logo'), ns.em('logo', 'vue')]"
        alt="Vue logo"
      />
    </a>
  </div>
  <HelloWorld />
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import { useNamespace } from '@/hooks'

const ns = useNamespace('main')
</script>

<style lang="scss">
@use '@/assets/scss/mixins/bem.scss' as *;

@include b(main) {
  display: flex;
  width: 960px;
  margin: 0 auto;
  padding-top: 40px;
  justify-content: center;
  gap: 40px;

  @include e(logo) {
    height: 120px;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }

    @include m(vue) {
      &:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
    }
  }
}
</style>
