<template>
  <section class="detail-summary">
    <h2>{{ title }}</h2>
    <ul class="property-actions">
      <li>
        <mars-chip
          type="button"
          :alternativeStyle="true"
          title="Add to favorites"
          @click="$emit('addToFavorites')"
        >
          <icon-favorites aria-hidden="true" />
          Add to favorites
        </mars-chip>
      </li>
      <li>
        <mars-chip type="button" :alternativeStyle="true" title="Share">
          <icon-share aria-hidden="true" />
          Share
        </mars-chip>
      </li>
    </ul>
    <ul class="property-data">
      <li title="Price">
        <icon-payment class="icon" aria-hidden="true" />
        <div class="caption">{{ property?.price }} $</div>
      </li>
      <li title="Total surface">
        <icon-surface-area class="icon" aria-hidden="true" />
        <div class="caption">750 ha</div>
      </li>
      <li title="Geographical position">
        <icon-position class="icon" aria-hidden="true" />
        <div class="caption">58°W, 12°N</div>
      </li>
    </ul>

    <p>{{ property?.description }}</p>

    <button class="purchase mars-button">
      {{ property?.type === "rent" ? "rent" : "buy" }}
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconPayment from "../../icons/IconPayment.vue";
import IconSurfaceArea from "../../icons/IconSurfaceArea.vue";
import IconPosition from "../../icons/IconPosition.vue";
import MarsChip from "../../common/widgets/MarsChip.vue";
import IconFavorites from "../../icons/IconFavorites.vue";
import IconShare from "../../icons/IconShare.vue";
import { MarsProperty } from "@/assets/js/data/MarsProperty";

export default defineComponent({
  name: "DetailSummary",
  emits: ["addToFavorites"],
  components: {
    IconPayment,
    IconSurfaceArea,
    IconPosition,
    MarsChip,
    IconFavorites,
    IconShare,
  },
  props: {
    property: {
      type: MarsProperty,
    },
  },
  computed: {
    title() {
      return `Property ${this.property?.id}`;
    },
  },
});
</script>

<style>
/********* 

  Summary section 

*************/
.detail-summary {
  display: flex;
  flex-direction: column;
}

/************

  Buttons for AddToFavorites and share 

*************/

.detail-summary .property-actions {
  display: flex;
  padding-bottom: 0.4rem;
  border-bottom: solid 1px var(--color-separator);
  margin: 1rem 0 1.5rem 0;
}

.detail-summary .property-actions li {
  margin-right: 10px;
}

/************

  Data for the property : price, area and location

*************/
.property-data {
  display: flex;
  justify-content: space-around;
}

.detail-summary .property-data li {
  flex: 1;
  text-align: center; /* Used to align text on captions with two lines */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-summary ul .icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-primary);
}

.detail-summary .property-data .caption {
  margin-top: 6px;
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: bold;
}

/************

  Bottom of the summary 

*************/

.detail-summary p {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  flex: 1;
  color: var(--text-color-secondary);
  text-align: justify;
  line-height: 1.5;
  overflow-y: auto;
  font-weight: 400;
}

.detail-summary .purchase {
  margin-top: 30px;
  align-self: center;
  cursor: not-allowed;
}
</style>