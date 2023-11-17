<template>
  <div class="detail-page" v-if="property != null">
    <div class="detail-page-image-main">
      <div class="aspect-ratio-wrapper">
        <img :src="property.imgSrcUrl" :title="title" :alt="title" />
      </div>
    </div>

    <detail-summary
      :property="property"
      @addToFavorites="addToFavorites()"
      @share="share()"
    />

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
    share() {
      try {
        navigator.share({ url: location.href });
      } catch (e) {
        this.showSnackBar(`Your navigator does not support sharing`);
        console.log(e);
      }
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
  padding-bottom: 2rem;
}

@mixin image-shadow {
  border-radius: 5px;
  box-shadow: 0 0 4px #22222288;
}

/*********************

  SMALL SCREENS
  Positioning and sizing elements 

********************/
@include mixins.ifSmallerThan($width-large) {
  .detail-page {
    display: grid;
    grid-template-rows: 250px auto auto auto;
    justify-items: center;
    grid-gap: 2rem;
  }

  /**
  
  On small screens, we do not want the first image to have a 16:9 aspect ratio,
  but instead we want to put it as a hero image / banner

  */
  .detail-page-image-main .aspect-ratio-wrapper {
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .detail-page > .detail-page-image-main {
    width: 100%;
  }

  .detail-page > :not(.detail-page-image-main) {
    width: 90%;
  }
}

/*********************

  LARGE SCREENS
  Positioning and sizing elements 

********************/
@include mixins.ifBiggerThan($width-large) {
  .detail-page {
    display: grid;
    grid-template-areas:
      "a a b"
      "c d d";
    // grid-template-rows: repeat(2, 25rem);
    grid-template-columns: 1fr 1fr 1fr;
    margin-inline: 2rem;
    grid-gap: 1rem;
  }

  .detail-page > * {
    padding: 1rem;
  }

  .detail-page > .detail-page-image-main {
    grid-area: a;
  }

  .detail-page > .detail-summary {
    grid-area: b;
  }

  .detail-page > .detail-page-image-secondary {
    grid-area: d;
  }

  .detail-page > .detail-more-infos {
    grid-area: c;
  }
}

/***********  

First image box 

***********/
.detail-page-image-main {
  display: flex;
  align-items: center;
}

/** We dont't want to put a shadow and border radius when the image is displayed as
a hero / banner */
.detail-page-image-main img {
  @include mixins.ifBiggerThan($width-large) {
    @include image-shadow();
  }
}

/********* 

Second image box 

*************/
.detail-page-image-secondary {
  display: flex;
  align-items: center;
}

.image-secondary-grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 70% 1fr;
  grid-gap: 5px;
}

.image-secondary-grid img {
  @include image-shadow();
}

.image-secondary-grid :first-child {
  grid-row: 1 / 3;
  grid-column: 1;
}

.image-secondary-grid :nth-child(2) {
  grid-row: 1;
  grid-column: 2;
  transform: rotateY(180deg);
}
.image-secondary-grid :nth-child(3) {
  grid-row: 2;
  grid-column: 2;
}
</style>
