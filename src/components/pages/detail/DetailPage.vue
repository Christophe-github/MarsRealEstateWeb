<template>
  <div class="detail-page" v-if="property != null">
    <div class="detail-page-image-main">
      <div class="aspect-ratio-wrapper">
        <img :src="property.imgSrcUrl" :title="title" :alt="title" />
      </div>
    </div>

    <detail-summary :property="property" @addToFavorites="addToFavorites()" />

    <div class="detail-page-image-secondary">
      <div class="aspect-ratio-wrapper">
        <div class="image-secondary-grid">
          <img :src="property.imgSrcUrl" />
          <img :src="property.imgSrcUrl" />
          <img :src="property.imgSrcUrl" />
        </div>
      </div>
    </div>

    <detail-more-infos />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { MarsProperty } from "@/assets/js/data/MarsProperty";
import marsRepository from "@/assets/js/services/MarsRepository";

import App from "@/App.vue";
import DetailMoreInfos from "./DetailMoreInfos.vue";
import DetailSummary from "./DetailSummary.vue";

export default defineComponent({
  name: "DetailPage",
  components: {
    DetailSummary,
    DetailMoreInfos,
  },
  props: {
    propertyId: { type: String, default: "" },
  },
  data() {
    return {
      loading: false,
      property: null as MarsProperty | null,
    };
  },
  computed: {
    title() {
      return `Property ${this.propertyId}`;
    },
  },
  methods: {
    async fetchProperty() {
      this.property = await marsRepository.fetchProperty(this.propertyId);
      if (this.property === null) {
        this.$router.replace({ name: "NotFound" });
      }
    },
    addToFavorites() {
      marsRepository.addToFavorites(this.propertyId);
      this.showSnackBar(`Property ${this.propertyId} added to favorites`);
    },
    showSnackBar(message: string) {
      (this.$root as unknown as typeof App).showSnackBar(message);
    },
  },
  created() {
    this.fetchProperty();
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

$width-small: 31rem;
$width-large: 52rem;

.detail-page {
  margin: 0 auto;
  padding-bottom: 1rem;
}

.detail-page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/** Positioning and sizing elements on small screens */
@include mixins.ifSmallerThan($width-large) {
  .detail-page {
    display: grid;
    grid-template-rows: 250px auto 250px auto;
    justify-items: center;
    grid-gap: 2rem;
  }

  .detail-page > :first-child {
    width: 100%;
  }

  .detail-page > :nth-child(n + 2) {
    width: 90%;
  }
}

/** Positioning and sizing the elements on large screens */

@include mixins.ifBiggerThan($width-large) {
  .detail-page {
    margin-inline: 2rem;
    grid-gap: 1rem;
    display: grid;
    grid-template-areas:
      "a a b"
      "c d d";
    // grid-template-rows: repeat(2, 25rem);
    // grid-template-rows: repeat(2, 25rem);
    grid-template-columns: 1fr 1fr 1fr;
  }

  .detail-page > * {
    padding: 1rem;
  }

  .detail-page > :nth-child(1) {
    grid-area: a;
  }

  .detail-page > :nth-child(2) {
    grid-area: b;
  }

  .detail-page > :nth-child(3) {
    grid-area: d;
  }

  .detail-page > :nth-child(4) {
    grid-area: c;
  }
}

/***********  First image box ***********/
.detail-page-image-main {
  display: flex;
  align-items: center;
}



.detail-page-image-main img {
  @include mixins.ifBiggerThan($width-large) {
    border-radius: 5px;
    box-shadow: 0 0 4px #22222288;
  }
}

/********* Second image box *************/

.detail-page-image-secondary {
  display: flex;
  align-items:center;
}


.image-secondary-grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 70% 1fr;
  grid-gap: 5px;
}

.image-secondary-grid img {
  border-radius: 5px;
  box-shadow: 0 0 4px #22222288;
}

.image-secondary-grid :first-child {
  grid-row: 1 / 3;
  grid-column: 1;
}

.image-secondary-grid :nth-child(2) {
  grid-row: 1;
  grid-column: 2;
}
.image-secondary-grid :nth-child(3) {
  grid-row: 2;
  grid-column: 2;
}
</style>
