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
        :class="[aroma.highlightClass, {'out-of-stock':aroma.inventory==='0'}]"
      >
        <span class="aroma-preview-button"
          title="click to preview aroma below"
          @click.stop="(evt)=>onPreviewAroma(aroma,evt)"
        >☟</span>
        {{ aroma.name }} 
        <div class="aroma-meta">
          <span :title="aroma.recommendedAmount" class="aroma-recommendedAmount">{{ aroma.recommendedAmount ? "☣" : "" }}</span>
          <span class="aroma-properties">{{ properties(aroma) }}</span>
          <span title="aphrodisiac" class="aroma-aphrodisiac">{{ aroma.aromaProperties.includes('aphrodisiac') ? "♥" : ""}}</span>
          <span :title="aroma.popularity" class="aroma-popularity">{{ aroma.popularity ? "𝒫" : ""}}</span>
        </div>
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
      this.$emit("preview-aroma", aroma)
    },
    onPreviewAroma(aroma) {
      this.$emit("preview-aroma", aroma)
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
.aroma-preview-button {
  color: rgb(204, 204, 204);
  border: 1px solid rgba(204, 204, 204, .45);
  border-radius: 3px;
  opacity: .54;
  font-size: 117%;
  padding: 2px 5px;
  margin: -3px;
  position: relative;
  top: 1px;
  font-style: normal;
}
.aroma-meta {
  display: inline-block;
  font-style: normal;
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
  margin: 3px 4px;
  padding: 2px 3px;
}
.out-of-stock {
  opacity: .7;
  text-decoration: line-through;
}

@media print {
  .note {
    border: 1px dashed rgb(153, 139, 230) !important;
  }
  .aroma-preview-button {
    display: none;
  }
  .aroma-properties {
    font-weight: 400;
    color: rgb(104, 104, 104);
  }
  .aroma-recommendedAmount {
    color: rgb(255, 97, 97);
  }
  .aroma-popularity {
    font-weight: 700;
  }
}
</style>