<template>
  <div>
    <main>
      <Aroma
        v-for="aroma in aromas"
        :key="aroma._id"
        :aroma="aroma"
      />
    </main>

  </div>
</template>

<script>
import { watch, onMounted } from '@vue/composition-api'

import Aroma from './Aroma.vue'

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
.aroma {
  flex: 0 0 auto;
}
.aroma img.avatar {
  margin-right: 10px;
}
.aroma p.aroma-header {
  margin: 0;
  font-size: 0.9em;
}
.aroma p.aroma-header span.sent-date {
  color: #969696;
}
</style>