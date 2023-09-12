<template>
  <div :class="ns.b()">
    <h1>{{ msg }}</h1>

    <div :class="ns.e('card')">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/vuejs/language-tools" target="_blank"
        >Volar</a
      >
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@/hooks'

defineProps<{ msg: string }>()

const ns = useNamespace('hello')

const count = ref(0)
</script>

<style lang="scss">
@use '@/assets/scss/mixins/bem.scss' as *;

@include b(hello) {
  @include e(card) {
    background-color: #1263f8;
  }
}

.read-the-docs {
  color: #888;
}
</style>
