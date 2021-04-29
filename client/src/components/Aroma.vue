<template>
  <div class="aroma">
    <div class="aroma-wrapper">
      <p class="aroma-header">
        <span class="aroma-name">{{ aroma.name }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aroma: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>