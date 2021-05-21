<template>
  <div>

    <h1 id="top">Aroma Groups</h1>

    <div class="aroma-notes">

      <div class="action button reset"
        @click="resetAssociation"
        v-if="association.name"
      >reset</div>

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

      <h2>Legenda</h2>
      <dl class="legenda">
        <dt class="action button highlight1">
          ...name...
        </dt> 
        <dd class="def">Primary selection</dd>
        <dt class="action button highlight2">
          ...name...
        </dt>
        <dd class="def">Recommended blend - by primary</dd>
        <dt class="action button highlight3">
          ...name...
        </dt>
        <dd class="def">Recommended blend - by current</dd>
        <dt class="action button highlight4">
          ...name...
        </dt>
        <dd class="def">Blends well with primary</dd>
        <dt class="action button highlight-off">
          ...name...
        </dt>
        <dd class="def">Has no blending recommendation</dd>
      </dl>

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
        reference: "",
        recommendedCombination: [],
        blendsWellWith: [],
      },
      nameRefExceptions:  ["Clary Sage", "Orange Blossom", "Balsam of Peru"]
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
      let ref = name.split(" - ")[0].split(" ")[0]
      // exceptions
      const exceptions = this.nameRefExceptions
      if (exceptions.includes(name)) ref = name
      return ref
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
      let highlightClass = this.association.name ? "highlight-off" : ""
      if (this.association.name) {
        if (aroma.name === this.association.name) {
          highlightClass = "highlight1"
        }
        if (this.association.blendsWellWith.includes(aroma.name) || this.association.blendsWellWith.includes(this.getAssociationReference(aroma.name)) || aroma.blendsWellWith.includes(this.association.reference)) {
          highlightClass = "highlight4"
        }
        if (aroma.recommendedCombination.flat().includes(this.association.reference) ) {
          highlightClass = "highlight3"
        }
        if (this.association.recommendedCombination.includes(aroma.name) || this.association.recommendedCombination.includes(this.getAssociationReference(aroma.name))) {
          highlightClass = "highlight2"
        }
      }
      aroma.highlightClass = highlightClass
      return aroma
    },
    resetAssociation() {
      this.association.name = ""
      this.association.reference = ""
      this.association.recommendedCombination = []
      this.association.blendsWellWith = []
    }
  }
}
</script>

<style lang="less">
.aroma-notes {
  .note {
    margin-bottom: 1em;
  }
  .aroma-name {
    transition: all 1s ;
  }
  .highlight-off {
    font-weight: 400;
    font-size: 81%;
    opacity: .6;
  }
  .highlight1 {
    color: #f7f335;
    border-color: #f7f335;
    font-style: italic;
  }
  .highlight2 {
    color: #bdf735;
    border-color: #bdf735;
    font-style: italic;
  }
  .highlight3 {
    color: #bdf735;
    font-style: italic;
  }
  .highlight4 {
    color: #29dc58;
  }
  dl {
    display: grid;
    grid-template-columns: 6em auto;
  }
  dd {
    padding: 3px 0;
    margin: 7px 1em;
    font-style: italic;
  }
  .action.button.reset {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
