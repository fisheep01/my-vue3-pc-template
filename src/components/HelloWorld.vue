<template>
  <div :class="ns.b()">
    <div :class="ns.e('card')">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@/hooks'

const ns = useNamespace('hello')

const count = ref(0)
</script>

<style lang="scss">
@use '@/assets/scss/mixins/bem.scss' as *;

@include b(hello) {
  margin-top: 40px;
  @include e(card) {
    padding: 20px;
    background-color: #1263f8;
  }
}
</style>
