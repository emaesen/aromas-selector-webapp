<template>
  <main>
    <h1 id="top">Aromas</h1>
    <div class="summary-list">
      <router-link
        v-for="aromaID in aromaSummaryList"
        :key="aromaID"
        :to="'#'+aromaID"
        class="action button"
      >{{ aromaID }}
      </router-link>
    </div>

    <AddAroma/>

    <div class="full-list">
      <AromaList :aromas="aromas" />
    </div>

  </main>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'

import AromaList from '../components/Aromas'
import AddAroma from '../components/AddAroma'

export default {
  name: 'Aromas',
  components: {
    AromaList,
    AddAroma
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
    aromaSummaryList() {
      const aromas = this.aromas.map(a => this.getReferenceId(a.name))
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

</style>
