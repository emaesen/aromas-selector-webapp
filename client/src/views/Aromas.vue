<template>
  <main>
    <h1>Aromas</h1>
    <div>
      <AromaList :aromas="aromas" />
    </div>

    <AddAroma/>

  </main>
</template>

<script>
import { useFind } from 'feathers-vuex'
import { computed } from '@vue/composition-api'

import AromaList from '../components/Aromas'
import AddAroma from '../components/AddAroma'

export default {
  name: 'Chat',
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
  }
}
</script>

<style scoped>

</style>
