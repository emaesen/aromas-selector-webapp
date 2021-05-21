<template>
  <div class="aromas">
    <Aroma
      v-for="aroma in aromas"
      :key="aroma._id"
      :aroma="aroma"
    />
  </div>
</template>

<script>
import { watch, onMounted } from '@vue/composition-api'

import Aroma from '@/components/Aroma.vue'

export default {
  name: 'Aromas',
  components: {
    Aroma
  },
  props: {
    aromas: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
    console.log({props, context})

    onMounted(() => {
      watch(
        () => props.aromas.length
      )
    })
  }
}
</script>

<style>
.aromas {
  margin-top: 3em;
}

</style>