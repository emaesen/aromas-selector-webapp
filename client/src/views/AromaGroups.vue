<template>
  <main>
    <h1 id="top">Aroma Groups</h1>

    <div class="note top">
      {{ aromasTopList }}
    </div>

    <div class="note middle-top">
      {{ aromasMiddleTopList }}
    </div>

    <div class="note middle">
      {{ aromasMiddleList }}
    </div>

    <div class="note base-middle">
      {{ aromasBaseMiddleList }}
    </div>

    <div class="note base">
      {{ aromasBaseList }}
    </div>

  </main>
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
    aromasBaseList() {
      const aromas = this.aromas
        .filter(a => a.note.includes('base') && !a.note.includes('middle'))
        .map(a => a.name)
      return aromas
    },
    aromasBaseMiddleList() {
      const aromas = this.aromas
        .filter(a => a.note.includes('base') && a.note.includes('middle'))
        .map(a => a.name)
      return aromas
    },
    aromasMiddleList() {
      const aromas = this.aromas
        .filter(a => !a.note.includes('base') && a.note.includes('middle') && !a.note.includes('top'))
        .map(a => a.name)
      return aromas
    },
    aromasMiddleTopList() {
      const aromas = this.aromas
        .filter(a => a.note.includes('middle') && a.note.includes('top'))
        .map(a => a.name)
      return aromas
    },
    aromasTopList() {
      const aromas = this.aromas
        .filter(a => !a.note.includes('middle') && a.note.includes('top'))
        .map(a => a.name)
      return aromas
    },
  },
  methods: {
    getReferenceId(name) {
      return name.replace(/,/g, '').replace(/ /g,'-').toLowerCase()
    }
  }
}
</script>

<style scoped>
.note {
  margin-bottom: 1em;
}
</style>
