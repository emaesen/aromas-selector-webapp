<template>
  <div class="aroma" :id="referenceID">
    <div v-if="isEdit">
      <EditAroma
        :aromaID="aroma._id"
        @saved="onSaved"
        @canceled="onCanceled"
      />
    </div>

    <div v-else>
      <button
        class="action button edit no-print"
        @click="isEdit=true"
      >
        Edit
      </button>
      <div class="aroma-prop aroma-name">
        <router-link :to="'#' + referenceID">
          <span class="prop-value">{{ aroma.name }}</span>
        </router-link>
      </div>
      <div class="aroma-prop aroma-note">
        <span class="prop-name">Perfumery Note</span>
        <span class="prop-value">{{ aroma.note.join(", ") || missingMsg }}</span>
      </div>
      <div class="aroma-prop aroma-families">
        <span class="prop-name">Aroma families</span>
        <span class="prop-value">{{ aroma.aromaFamilies.join(", ") || missingMsg }}</span>
      </div>
      <div class="aroma-prop aroma-aroma">
        <span class="prop-name">Aroma</span>
        <span class="prop-value">{{ aroma.aroma || missingMsg }}</span>
      </div>
      <div v-if="aromaProperties" class="aroma-prop">
        <span class="prop-name">Properties</span>
        <span class="prop-value">
          {{ aromaProperties }}
        </span>
      </div>
      <div class="aroma-prop aroma-description">
        <span class="prop-name">Description</span>
        <span class="prop-value">{{ aroma.description || missingMsg }}</span>
      </div>
      <div v-if="aroma.aromaProperties.length > 0" class="aroma-prop aroma-properties">
        <span class="prop-name">Aroma properties</span>
        <span class="prop-value">{{ aroma.aromaProperties.join(", ") }}</span>
      </div>
      <div v-if="aroma.appearance" class="aroma-prop aroma-appearance">
        <span class="prop-name">Appearance</span>
        <span class="prop-value">{{ aroma.appearance }}</span>
      </div>
      <div v-if="aroma.storageSuggestion" class="aroma-prop aroma-storage-suggestion">
        <span class="prop-name">Storage suggestion</span>
        <span class="prop-value">{{ aroma.storageSuggestion }}</span>
      </div>
      <div class="aroma-prop aroma-blends-well-with">
        <span class="prop-name">Blends well with</span>
        <span class="prop-value">{{ aroma.blendsWellWith.join(", ") || missingMsg }}</span>
      </div>
      <div v-if="aroma.blendingSuggestion" class="aroma-prop aroma-blending-suggestion">
        <span class="prop-name">Blending suggestion</span>
        <span class="prop-value">{{ aroma.blendingSuggestion }}</span>
      </div>
      <div v-if="aroma.safetyConsiderations" class="aroma-prop aroma-safety-considerations">
        <span class="prop-name">Safety considerations</span>
        <span class="prop-value">{{ aroma.safetyConsiderations }}</span>
      </div>
      <div v-if="aroma.recommendedAmount" class="aroma-prop aroma-recommended-amount">
        <span class="prop-name">Recommended amount</span>
        <span class="prop-value">{{ aroma.recommendedAmount }}</span>
      </div>
      <div v-if="aroma.recommendedCombination.join(', ') !== ''" class="aroma-prop aroma-recommended-combination">
        <span class="prop-name">Recommended combination</span>
        <span class="prop-value">{{ aroma.recommendedCombination.join(", ") }}</span>
      </div>
      <div v-if="aroma.dilutionNote" class="aroma-prop aroma-dilution-note">
        <span class="prop-name">Dilution note</span>
        <span class="prop-value">{{ aroma.dilutionNote }}</span>
      </div>
      <div v-if="aroma.popularity" class="aroma-prop aroma-popularity">
        <span class="prop-name">Popularity</span>
        <span class="prop-value">{{ aroma.popularity }}</span>
      </div>
      <div class="aroma-prop aroma-inventory">
        <span class="prop-name">Inventory</span>
        <span class="prop-value">{{ aroma.inventory || "---" }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import EditAroma from '../components/EditAroma'

export default {
  name: 'Aroma',
  components: {
    EditAroma
  },
  props: {
    aroma: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    aromaProperties() {
      const props = []
      if (this.aroma.fixative) props.push("fixative")
      if (this.aroma.tenacious) props.push("tenacious")
      if (this.aroma.diffusive) props.push("diffusive")
      return props.join(", ")
    },
    missingMsg() {
      return "---!!-----MISSING-----!!---"
    },
    referenceID() {
      return this.aroma.name.replace(/,/g, '').replace(/ /g,'-').toLowerCase()
    }
  },
  methods: {
    exitEdit() {
      this.isEdit = false
      this.$router.push("#top")
      this.$router.push("#" + this.referenceID)
    },
    onSaved() {
      this.exitEdit()
    },
    onCanceled() {
      this.exitEdit()
    }
  }
}
</script>

<style scoped>
.button.edit {
  float: right;
}
.aroma {
  padding-top: 3em;
  margin-bottom: 3em;
}
.aroma-prop {
  margin-bottom: .5em;
  display: flex;
}
.prop-name {
  margin-right: 1em;
  font-style: italic;
  min-width: 10em;
}
.prop-name:after {
  content: ":"
}
.aroma-name .prop-value {
  font-size: 150%;
  font-style: italic;
}
</style>