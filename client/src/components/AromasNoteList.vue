<template>
  <div :class="['note', note]">
    <div class="note-name">
      {{ note }}
    </div>
    <div class="note-list">

      <div
        v-for="aroma in aromasList"
        :key="aroma.name"
        class="action button aroma-name"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'AromasNoteList',
  props: {
    aromasList: {
      type: Array
    },
    note: {
      type: String
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
.note {
  border: 5px solid rgb(6, 4, 20);
  background-color: rgb(32, 32, 44);
  border-radius: 5px;
  padding: 3px 0;
  display: flex;
  align-items: center;
}
.note-name {
  text-align: center;
  min-width: 7em;
  font-style: italic;
}
.aroma-name {
  transition: color 1s ;
}
.highlight1 {
  color: #f7f335;
}
.highlight2 {
  color: #29dc58;
}
</style>