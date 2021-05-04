<template>
  <div class="aroma">
    <div class="aroma-prop aroma-name">
      <span class="prop-value">{{ aroma.name }}</span>
    </div>
    <div class="aroma-prop aroma-note">
      <span class="prop-name">Note</span>
      <span class="prop-value">{{ aroma.note.join(", ") }}</span>
    </div>
    <div class="aroma-prop aroma-families">
      <span class="prop-name">Aroma families</span>
      <span class="prop-value">{{ aroma.aromaFamilies.join(", ") }}</span>
    </div>
    <div class="aroma-prop aroma-aroma">
      <span class="prop-name">Aroma</span>
      <span class="prop-value">{{ aroma.aroma }}</span>
    </div>
    <div class="aroma-prop">
      <span class="prop-name">Properties</span>
      <span class="prop-value">
        {{ aromaProperties}}
      </span>
    </div>
    <div class="aroma-prop aroma-description">
      <span class="prop-name">Description</span>
      <span class="prop-value">{{ aroma.description }}</span>
    </div>
    <div class="aroma-prop aroma-appearance">
      <span class="prop-name">Appearance</span>
      <span class="prop-value">{{ aroma.appearance }}</span>
    </div>
    <div class="aroma-prop aroma-storage-suggestion">
      <span class="prop-name">Storage Suggestion</span>
      <span class="prop-value">{{ aroma.storageSuggestion }}</span>
    </div>
    <div class="aroma-prop aroma-blends-well-with">
      <span class="prop-name">Blends Well With</span>
      <span class="prop-value">{{ aroma.blendsWellWith.join(", ") }}</span>
    </div>
    <div class="aroma-prop aroma-blending-suggestion">
      <span class="prop-name">Blending Suggestion</span>
      <span class="prop-value">{{ aroma.blendingSuggestion }}</span>
    </div>
    <div class="aroma-prop aroma-safety-considerations">
      <span class="prop-name">Safety Considerations</span>
      <span class="prop-value">{{ aroma.safetyConsiderations }}</span>
    </div>
    <div class="aroma-prop aroma-recommended-amount">
      <span class="prop-name">Recommended Amount</span>
      <span class="prop-value">{{ aroma.recommendedAmount }}</span>
    </div>
    <div class="aroma-prop aroma-recommended-combination">
      <span class="prop-name">Recommended Combination</span>
      <span class="prop-value">{{ aroma.recommendedCombination.join(", ") }}</span>
    </div>
    <div class="aroma-prop aroma-dilution-note">
      <span class="prop-name">Dilution Note</span>
      <span class="prop-value">{{ aroma.dilutionNote }}</span>
    </div>
    <div class="aroma-prop aroma-popularity">
      <span class="prop-name">popularity</span>
      <span class="prop-value">{{ aroma.popularity }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aroma: {
      type: Object,
      required: true
    }
  },
  computed: {
    aromaProperties() {
      const props = []
      if (this.aroma.fixative) props.push("fixative")
      if (this.aroma.tenacious) props.push("tenacious")
      if (this.aroma.diffusive) props.push("diffusive")
      return props.join(", ")
    }
  }
}
</script>

<style scoped>
.aroma {
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