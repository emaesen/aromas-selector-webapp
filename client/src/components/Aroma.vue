<template>
  <div class="aroma">
    <div class="aroma-name">
      <span class="name">Name</span>
      <span class="value">{{ aroma.name }}</span>
    </div>
    <div class="aroma-note">
      <span class="name">Note</span>
      <span class="value">{{ aroma.note.join(", ") }}</span>
    </div>
    <div class="aroma-families">
      <span class="name">Aroma families</span>
      <span class="value">{{ aroma.aromaFamilies.join(", ") }}</span>
    </div>
    <div class="aroma-aroma">
      <span class="name">Aroma</span>
      <span class="value">{{ aroma.aroma }}</span>
    </div>
    <div class="aroma-fixative">
      <span class="name">Fixative</span>
      <span class="value">{{ aroma.fixative }}</span>
    </div>
    <div class="aroma-tenacious">
      <span class="name">Tenacious</span>
      <span class="value">{{ aroma.tenacious }}</span>
    </div>
    <div class="aroma-diffusive">
      <span class="name">Diffusive</span>
      <span class="value">{{ aroma.diffusive }}</span>
    </div>
    <div class="aroma-description">
      <span class="name">Description</span>
      <span class="value">{{ aroma.description }}</span>
    </div>
    <div class="aroma-appearance">
      <span class="name">Appearance</span>
      <span class="value">{{ aroma.appearance }}</span>
    </div>
    <div class="aroma-storage-suggestion">
      <span class="name">Storage Suggestion</span>
      <span class="value">{{ aroma.storageSuggestion }}</span>
    </div>
    <div class="aroma-blends-well-with">
      <span class="name">Blends Well With</span>
      <span class="value">{{ aroma.blendsWellWith.join(", ") }}</span>
    </div>
    <div class="aroma-blending-suggestion">
      <span class="name">Blending Suggestion</span>
      <span class="value">{{ aroma.blendingSuggestion }}</span>
    </div>
    <div class="aroma-safety-considerations">
      <span class="name">Safety Considerations</span>
      <span class="value">{{ aroma.safetyConsiderations }}</span>
    </div>
    <div class="aroma-recommended-amount">
      <span class="name">Recommended Amount</span>
      <span class="value">{{ aroma.recommendedAmount }}</span>
    </div>
    <div class="aroma-recommended-combination">
      <span class="name">Recommended Combination</span>
      <span class="value">{{ aroma.recommendedCombination.join(", ") }}</span>
    </div>
    <div class="aroma-dilution-note">
      <span class="name">Dilution Note</span>
      <span class="value">{{ aroma.dilutionNote }}</span>
    </div>
    <div class="aroma-popularity">
      <span class="name">popularity</span>
      <span class="value">{{ aroma.popularity }}</span>
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
  }
}
</script>

<style scoped>
  .aroma {
    margin-bottom: 2em;
  }
  .name {
    margin-right: 1em;
    font-weight: 700;
  }
</style>