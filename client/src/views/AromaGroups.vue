<template>
  <div>
    <h1 id="top">Aroma Groups</h1>

    <div class="note top">
      <div
        v-for="aroma in aromasTopList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note middle-top">
      <div
        v-for="aroma in aromasMiddleTopList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note middle">
      <div
        v-for="aroma in aromasMiddleList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note base-middle">
      <div
        v-for="aroma in aromasBaseMiddleList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note base">
      <div
        v-for="aroma in aromasBaseList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="aroma.highlightClass"
      >
        {{ aroma.name }}
      </div>
    </div>

  </div>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'



export default {
  name: 'AromaGroups',
  components: {

  },
  data() {
    return {
      association: {
        name: "",
        blendsWellWith: []
      }
    };
  },
  setup(props, context) {
    const { Aroma } = context.root.$FeathersVuex.api
    //const { $store } = context.root
    //console.log($store)
    const aromasParams = computed(() => {
      return {
        query: {
          $sort: { name: 1 },
          $limit: 200
        }
      }
    })
    const { items: aromas } = useFind({
      model: Aroma,
      params: aromasParams
    })

    return {
      aromas
    }
  },
  computed: {
    aromasList() {
      return this.aromas
        .map(this.associationMap)
    },
    aromasBaseList() {
      const aromas = this.aromasList
        .filter(a => a.note.includes('base') && !a.note.includes('middle'))
      return aromas
    },
    aromasBaseMiddleList() {
      const aromas = this.aromasList
        .filter(a => a.note.includes('base') && a.note.includes('middle'))
      return aromas
    },
    aromasMiddleList() {
      const aromas = this.aromasList
        .filter(a => !a.note.includes('base') && a.note.includes('middle') && !a.note.includes('top'))
      return aromas
    },
    aromasMiddleTopList() {
      const aromas = this.aromasList
        .filter(a => a.note.includes('middle') && a.note.includes('top'))
      return aromas
    },
    aromasTopList() {
      const aromas = this.aromasList
        .filter(a => !a.note.includes('middle') && a.note.includes('top'))
      return aromas
    },
  },
  methods: {
    getReferenceId(name) {
      return name.replace(/,/g, '').replace(/ /g,'-').toLowerCase()
    },
    onClickAroma(aroma) {
      // Highlight clicked aroma plus all associated aromas
      // in blendsWellWith and recommendedCombination
      this.association.name = aroma.name
      this.association.reference = aroma.name.split(" - ")[0]
      this.association.blendsWellWith = aroma.blendsWellWith
      console.log({association: this.association})
    },
    associationMap(aroma) {
      //console.log("in associationMap ", aroma.name)
      let highlightClass = ""
      if (aroma.name === this.association.name) {
        highlightClass = "highlight1"
      }
      if (this.association.blendsWellWith.includes(aroma.name) || aroma.blendsWellWith.includes(this.association.reference)) {
        highlightClass = "highlight2"
      }
      aroma.highlightClass = highlightClass
      return aroma
    },
  }
}
</script>

<style scoped>
.note {
  margin-bottom: 1em;
}
.highlight1 {
  color: #f7f335;
}
.highlight2 {
  color: #29dc58;
}
</style>
