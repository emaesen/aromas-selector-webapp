<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//import { onMounted, watch } from '@vue/composition-api'

export default {
  name: 'App',
  setup(props, context) {
    const { $store, $router } = context.root
    console.log({$store, $router})

    return {}
  }
}
</script>

<style>

</style>