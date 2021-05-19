<template>
  <div>
    <h1 id="top">Aroma Groups</h1>

    <div class="note top">
      <div
        v-for="aroma in aromasTopList"
        :key="aroma.name"
        class="action button"
        @click="()=>onClickAroma(aroma)"
        :class="{highlight: aroma.highlight}"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note middle-top">
      <div
        v-for="aroma in aromasMiddleTopList"
        :key="aroma.name"
        class="action button"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note middle">
      <div
        v-for="aroma in aromasMiddleList"
        :key="aroma.name"
        class="action button"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note base-middle">
      <div
        v-for="aroma in aromasBaseMiddleList"
        :key="aroma.name"
        class="action button"
      >
        {{ aroma.name }}
      </div>
    </div>

    <div class="note base">
      <div
        v-for="aroma in aromasBaseList"
        :key="aroma.name"
        class="action button"
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
        .map(a => {
          return a
        })
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
      // TODO: 
      // Add `reference` property: a reference name that can be used to cross link
      // and should also be used in blendsWellWith and recommendedCombination
      console.log("Associate with ", aroma.name)
    }
  }
}
</script>

<style scoped>
.note {
  margin-bottom: 1em;
}
.highlight {
  color: #29dc58;
}
</style>
