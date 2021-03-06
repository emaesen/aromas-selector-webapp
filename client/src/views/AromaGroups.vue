<template>
  <div>

    <h1 id="top">Aroma Groups</h1>

    <div class="aroma-notes">

      <div class="action button reset no-print"
        @click="resetAssociation"
        v-if="association.name"
      >reset</div>

      <AromasNoteList
        note="top"
        :aromasList="aromasTopList"
        @associate-aroma="onAssociateAroma"
        @preview-aroma="onPreviewAroma"
      />

      <AromasNoteList
        note="middle-top"
        :aromasList="aromasMiddleTopList"
        @associate-aroma="onAssociateAroma"
        @preview-aroma="onPreviewAroma"
      />

      <AromasNoteList
        note="middle"
        :aromasList="aromasMiddleList"
        @associate-aroma="onAssociateAroma"
        @preview-aroma="onPreviewAroma"
      />

      <AromasNoteList
        note="base-middle"
        :aromasList="aromasBaseMiddleList"
        @associate-aroma="onAssociateAroma"
        @preview-aroma="onPreviewAroma"
      />

      <AromasNoteList
        note="base"
        :aromasList="aromasBaseList"
        @associate-aroma="onAssociateAroma"
        @preview-aroma="onPreviewAroma"
      />

      <h2 class="no-print">
        Legenda
        <div class="action button" @click="toggleLegenda">{{ legandaToggleTxt }}</div>
      </h2>
      <dl class="legenda no-print" v-if="showLegenda">
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

    <div class="aroma-preview" v-if="previewAroma">
      <aroma
        :aroma="previewAroma"
      />
    </div>
  </div>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'

import AromasNoteList from '@/components/AromasNoteList'
import Aroma from '@/components/Aroma.vue'

export default {
  name: 'AromaGroups',
  components: {
    AromasNoteList,
    Aroma,
  },
  data() {
    return {
      association: {
        name: "",
        reference: "",
        recommendedCombination: [],
        blendsWellWith: [],
      },
      nameRefExceptions:  ["Clary Sage", "Orange Blossom", "Balsam of Peru"],
      previewAroma: null,
      showLegenda: false,
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
    legandaToggleTxt() {
      return "≺ " + (this.showLegenda ? "collapse" : "expand")
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
    onPreviewAroma(aroma) {
      this.previewAroma = aroma
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
    },
    toggleLegenda() {
      this.showLegenda = !this.showLegenda
    },
  }
}
</script>

<style lang="less">
.aroma-notes {
  .note {
    margin-bottom: 1em;
  }
  .aroma-name {
    transition: all 1s;
    font-size: 13px;
    border: 1px solid rgba(130, 112, 173, .5);
  }
  .highlight-off {
    font-weight: 400;
    font-size: 81%;
    opacity: .45;
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
    border-color: rgb(130, 112, 173);
  }
  .highlight4 {
    color: #29dc58;
    border-color: rgb(130, 112, 173);
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
  dd::before {
    content: "=";
    padding-right: 9px;
  }
  .action.button.reset {
    position: absolute;
    top: 0;
    right: 0;
  }
}

@media print {
  .aroma-notes {
    .highlight-off {
      display: none !important;
    }
    .highlight1 {
      color: #024b26;
      font-style: italic;
      font-weight: 700;
      border: 3px double #638d00;
    }
    .highlight2 {
      color: #4f6816;
      font-style: italic;
      font-weight: 400;
      border: 2px solid #757317;
    }
    .highlight3 {
      color: #4f6816;
      font-style: normal;
      font-weight: 400;
      border: 1px solid #757317;
    }
    .highlight4 {
      color: #39493d;
      font-style: normal;
      font-weight: 400;
      border: 1px dashed #1f7ba7;
    }
  }
}
</style>
