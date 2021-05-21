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
        @click="(evt)=>onClickAroma(aroma,evt)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }} 
        <span :title="aroma.recommendedAmount" class="aroma-recommendedAmount">{{ aroma.recommendedAmount ? "☣" : "" }}</span>
        <span class="aroma-properties">{{ properties(aroma) }}</span>
        <span title="aphrodisiac" class="aroma-aphrodisiac">{{ aroma.aromaProperties.includes('aphrodisiac') ? "♥" : ""}}</span>
        <span :title="aroma.popularity" class="aroma-popularity">{{ aroma.popularity ? "𝒫" : ""}}</span>
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
    onClickAroma(aroma,evt) {
      evt.target.blur()
      window.getSelection().removeAllRanges()
      this.$emit("associate-aroma", aroma)
    },
    properties(aroma) {
      let props = ""
      props += aroma.fixative? "F": ""
      props += aroma.diffusive? "D": ""
      props += aroma.tenacious? "T": ""
      return props? "("+props+")": ""
    }
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
.aroma-properties {
  color: rgba(204, 204, 204, 0.541);
  font-size: 81%;
}
.aroma-aphrodisiac {
  color: rgb(202, 122, 255);
  font-size: 117%;
}
.aroma-popularity {
  color: rgb(204, 164, 255);
  font-size: 117%;
}
.aroma-recommendedAmount {
  color: rgba(255, 117, 117, 0.507);
}
.action.button {
  margin-left: 5px;
}
</style>