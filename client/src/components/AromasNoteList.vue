<template>
  <div>
    <div
      v-for="aroma in aromasList"
      :key="aroma.name"
      class="action button"
      @click="()=>onClickAroma(aroma)"
      :class="aroma.highlightClass"
    >
      {{ aroma.name }}
    </div>
  </div>
</template>


<script>
export default {
  name: 'AromasNoteList',
  props: {
    aromasList: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    onClickAroma(aroma) {
      this.$emit("associate-aroma", aroma)
    },
  }
}
</script>

<style lang="less" scoped>
.highlight1 {
  color: #f7f335;
}
.highlight2 {
  color: #29dc58;
}
</style>