<template>
  <div>
    <h1 id="top">Aroma Groups</h1>

    <div class="aroma-notes">
      <AromasNoteList
        note="top"
        :aromasList="aromasTopList"
        @associate-aroma="onAssociateAroma"
      />

      <AromasNoteList
        note="middle-top"
        :aromasList="aromasMiddleTopList"
        @associate-aroma="onAssociateAroma"
      />

      <AromasNoteList
        note="middle"
        :aromasList="aromasMiddleList"
        @associate-aroma="onAssociateAroma"
      />

      <AromasNoteList
        note="base-middle"
        :aromasList="aromasBaseMiddleList"
        @associate-aroma="onAssociateAroma"
      />

      <AromasNoteList
        note="base"
        :aromasList="aromasBaseList"
        @associate-aroma="onAssociateAroma"
      />
    </div>

  </div>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'

import AromasNoteList from '@/components/AromasNoteList'

export default {
  name: 'AromaGroups',
  components: {
    AromasNoteList,
  },
  data() {
    return {
      association: {
        name: "",
        recommendedCombination: [],
        blendsWellWith: [],
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
    getAssociationReference(name) {
      return name.split(" - ")[0].split(" ")[0]
    },
    onAssociateAroma(aroma) {
      // Highlight clicked aroma plus all associated aromas
      // in blendsWellWith and recommendedCombination
      this.association.name = aroma.name
      this.association.reference = this.getAssociationReference(aroma.name)
      this.association.blendsWellWith = aroma.blendsWellWith
      this.association.recommendedCombination = aroma.recommendedCombination.flat()
      console.log({association: this.association})
    },
    associationMap(aroma) {
      //console.log("in associationMap ", aroma.name)
      let highlightClass = ""
      if (aroma.name === this.association.name) {
        highlightClass = "highlight1"
      }
      if (this.association.blendsWellWith.includes(aroma.name) || this.association.blendsWellWith.includes(this.getAssociationReference(aroma.name)) || aroma.blendsWellWith.includes(this.association.reference)) {
        highlightClass = "highlight3"
      }
      if (this.association.recommendedCombination.includes(aroma.name) || this.association.recommendedCombination.includes(this.getAssociationReference(aroma.name))) {
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
</style>
