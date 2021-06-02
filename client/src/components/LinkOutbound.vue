<template>
  <a class="link-outbound" :href="to" target="_blank" rel="noopener noreferrer"><slot></slot></a>
</template>

<script>

export default {
  name: 'LinkOutbound',
  props: {
    to: {
      type: String,
    },
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.link-outbound::after {
  content: '⧉';
  transform: scale(-1,1);
  opacity: .6;
  display: inline-block;
  font-style: normal;
}
</style>
