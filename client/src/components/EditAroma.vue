<template>
  <form class="aroma-form" @submit.prevent="onSubmit">
    <fieldset>
      <legend>Edit Aroma</legend>
      <div v-if="errors.length" class="errors">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="form-elements">
        <div class="form-element">
          <label class="form-label" for="name">Name</label>
          <input
            id="name" name="name"
            v-model="aroma.name"
            required
            type="text"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="note">Note</label>
          <select
            id="note" name="note"
            v-model="aroma.note"
            required
            multiple
            size="3"
          >
            <option v-bind:value="'base'">base</option>
            <option v-bind:value="'middle'">middle</option>
            <option v-bind:value="'top'">top</option>
          </select>
        </div>

        <div class="form-element">
          <label class="form-label" for="aromaFamilies">Aroma families</label>
          <select
            id="aromaFamilies" name="aromaFamilies"
            v-model="aroma.aromaFamilies"
            required
            multiple
            :size="afExpand? aromaFamilies.length : 4"
          >
            <option v-for="aromaFamily in aromaFamilies"
              :key="aromaFamily"
              v-bind:value="aromaFamily"
            >
              {{ aromaFamily }}
            </option>
          </select>
          <div class="button action" @click="afExpand = !afExpand">{{ afExpand? "collapse" : "expand" }}</div>
          <div class="preview">{{ aroma.aromaFamilies }}</div>
        </div>

        <div class="form-element">
          <label class="form-label" for="aroma">Aroma</label>
          <textarea
            id="aroma" name="aroma"
            v-model="aroma.aroma"
            required
          />
        </div>

        <div class="form-element">
          <label class="form-label">Properties</label>
          <div>
            <input
              id="fixative" name="fixative"
              v-model="aroma.fixative"
              type="checkbox"
              :value="aroma.fixative"
            />
            <label for="fixative" class="action button">Fixative</label>

            <input
              id="tenacious" name="tenacious"
              v-model="aroma.tenacious"
              type="checkbox"
              :value="aroma.tenacious"
            />
            <label for="tenacious" class="action button">Tenacious</label>

            <input
              id="diffusive" name="diffusive"
              v-model="aroma.diffusive"
              type="checkbox"
              :value="aroma.diffusive"
            />
            <label for="diffusive" class="action button">Diffusive</label>

          </div>
        </div>

        <div class="form-element">
          <label class="form-label" for="aromaProperties">Aroma properties</label>
          <select
            id="aromaProperties" name="aromaProperties"
            v-model="aroma.aromaProperties"
            multiple
            :size="apExpand? aromaProperties.length : 4"
          >
            <option v-for="aromaProperty in aromaProperties"
              :key="aromaProperty"
              v-bind:value="aromaProperty"
            >
              {{ aromaProperty }}
            </option>
          </select>
          <div class="button action" @click="apExpand = !apExpand">{{ apExpand? "collapse" : "expand" }}</div>
          <div class="preview">{{ aroma.aromaProperties }}</div>
        </div>

        <div class="form-element">
          <label class="form-label" for="description">Description</label>
          <textarea
            id="description" name="description"
            v-model="aroma.description"
            required
            class="tall"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="blendsWellWith">Blends well with</label>
          <textarea
            id="blendsWellWith" name="blendsWellWith"
            v-bind:value="aroma.blendsWellWith.join(', ')"
            v-on:input="aroma.blendsWellWith = $event.target.value.trim().replace(/ *, */g, ', ').split(', ')"
            required
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="blendingSuggestion">Blending suggestion</label>
          <textarea
            id="blendingSuggestion" name="blendingSuggestion"
            v-model="aroma.blendingSuggestion"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="safetyConsiderations">Safety considerations</label>
          <textarea
            id="safetyConsiderations" name="safetyConsiderations"
            v-model="aroma.safetyConsiderations"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="dilutionNote">Dilution note</label>
          <textarea
            id="dilutionNote" name="dilutionNote"
            v-model="aroma.dilutionNote"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="recommendedAmount">Recommended amount</label>
          <textarea
            id="recommendedAmount" name="recommendedAmount"
            v-model="aroma.recommendedAmount"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="recommendedCombination">Recommended combination</label>
          <textarea
            id="recommendedCombination" name="recommendedCombination"
            v-bind:value="aroma.recommendedCombination.join(', ')"
            v-on:input="aroma.recommendedCombination = $event.target.value.trim().replace(/ *, */g, ', ').split(', ')"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="appearance">Appearance</label>
          <textarea
            id="appearance" name="appearance"
            v-model="aroma.appearance"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="storageSuggestion">Storage suggestion</label>
          <textarea
            id="storageSuggestion" name="storageSuggestion"
            v-model="aroma.storageSuggestion"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="popularity">Popularity</label>
          <textarea
            id="popularity" name="popularity"
            v-model="aroma.popularity"
            class="short"
          />
        </div>

        <div class="form-element">
          <label class="form-label" for="inventory">Inventory</label>
          <textarea
            id="inventory" name="inventory"
            v-model="aroma.inventory"
            class="short"
          />
        </div>


      </div>

      <div>
        <button :disabled="!isValid" class="action button">
          Submit
        </button>
        <button @click.stop.prevent="onCancel" class="action button">
          Cancel
        </button>
        <span class="preview">{{ aroma.name }}</span>
      </div>
    </fieldset>


  </form>
</template>

<script>
//import { computed } from '@vue/composition-api'
import { useGet } from 'feathers-vuex'

export default {
  name: 'EditAroma',
  props: {
    aromaID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      errors: [],
      elements: [],
      apExpand: false,
      afExpand: false,
      aromaProperties: ['anaesthetic', 'analgesic', 'anti-asthmatic', 'anti-bacterial', 'antibiotic', 'anti-depressant', 'anti-fungal', 'anti-inflammatory', 'anti-microbial', 'anti-oxidant', 'anti-parasitic', 'antiseptic', 'anti-spasmodic', 'anti-viral', 'anxiolytic', 'aphrodisiac', 'astringent', 'calming', 'carminative', 'cephalic', 'cicatrisant', 'decongestant', 'deodorant', 'depurative', 'digestive', 'disinfectant', 'diuretic', 'expectorant', 'hypertensive', 'immunity booster', 'insecticide', 'mucolytic', 'nervine', 'neuroprotective', 'relaxant', 'sedative', 'stimulant', 'stress reliever', 'tonic', 'uplifting', 'vermifuge', 'vulnerary'],
      aromaFamilies: ['animalic','anisic','balsamic','camphor','chamomile-like','citrus','conifer','earthy','floral','fruity','gourmand','green','herbal','lemon-like','medicinal','musky','resinous','rosy','soft','spicy','valerian-like', 'vanilla-like', 'woody']
    };
  },
  setup(props, context) {
    const { Aroma } = context.root.$FeathersVuex.api
    console.log({propsAromaID: props.aromaID})
    const {item:aroma} = useGet({ model: Aroma, id: props.aromaID})
    console.log({aroma})

    function onSubmit() {
      if (this.validForm()) {
        aroma.value.save().then(this.onSave)

      } else {
        return
      }
    }
    return {
      aroma,
      onSubmit,
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
      // rely mostly on html5 required property
      return this.aroma.name.length > 2 
    },
    onSave() {
      this.$emit('saved')
    },
    onCancel() {
      this.$emit('canceled')
    }
  }
}
</script>

<style lang="less" scoped>
.aroma-form {
  margin-top: 3em;
}
.form-element {
  display: flex;
  align-items: baseline;
}
.form-label {
  min-width: 12em;
}
.preview {
  margin-left: 1em;
  opacity: .7;
}
select[multiple] {
  margin-right: .5em;
}
</style>