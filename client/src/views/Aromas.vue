<template>
  <main>
    <header >
      <div >
        <span >Aromas</span>
      </div>
    </header>
    <div >
      <AromaList :aromas="aromas" />
    </div>
  </main>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'

import AromaList from '../components/Aromas'

export default {
  name: 'Chat',
  components: {
    AromaList
  },
  setup(props, context) {
    const { Aroma } = context.root.$FeathersVuex.api
    const { $store } = context.root
    console.log($store)
    const aromasParams = computed(() => {
      return {
        query: {
          $sort: { name: 1 },
          $limit: 100
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
  }
}
</script>

<style scoped>

</style>
