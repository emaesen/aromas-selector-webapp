<template>
  <form class="aroma-form" @submit.prevent="onSubmit">
    <fieldset>
      <legend>Add Aroma</legend>
      <div v-if="errors.length" class="errors">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div>
        <label for="name">name</label>
        <input
          id="name"
          name="name"
          v-model="aroma.name"
          required
          type="text"
        />
      </div>

      <div>
        <label for="note">note</label>
        <input
          id="note"
          name="note"
          v-model="aroma.note"
          type="text"
        />
      </div>

      <div>
        <button v-if="!isCreatePending" :disabled="!isValid" class="action button">
          Submit
        </button>
        <button v-if="isCreatePending" class="action button pending" disabled>
          in progress..
        </button>
      </div>
    </fieldset>


  </form>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  name: 'AddAroma',
  data() {
    return {
      errors: [],
      elements: []
    };
  },
  setup(props, context) {
    const { Aroma } = context.root.$FeathersVuex.api
    const aroma = ref(new Aroma({ name: '' }))
    const isCreatePending = computed(() =>
      aroma.isCreatePending
    )
    function reset() {
      aroma.value = new Aroma({ name: '' })
    }
    function onSubmit() {
      if (this.validForm()) {
        aroma.value.save()
        reset()
      } else {
        return
      }
    }
    return {
      aroma,
      isCreatePending,
      reset,
      onSubmit
    }
  },
  computed: {
    isValid() {
      return this.validName();
    },
  },
  methods: {
    validForm() {
      // form has html5 validation
      // do some js validation as backup
      let err = (this.errors = []);
      if (!this.validName()) {
        err.push("Name is invalid.");
      }
      // TODO: ADD MORE ERROR MESSAGES
      return err.length === 0;
    },
    validName() {
      // TODO: TEST FOR UNIQUENESS
      return this.aroma.name.length > 2 
    }

  }
}
</script>

<style lang="less" scoped>
.aroma-form {
  margin-top: 3em;
}
</style>