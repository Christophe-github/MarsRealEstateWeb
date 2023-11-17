<template>
  <div class="overview-list" aria-live="polite">
    <ul class="list-property" aria-label="Search result" aria-live="polite">
      <li
        class="list-property-item"
        v-for="(property, index) in properties"
        :key="property.id"
        :style="{ '--index': index }"
        @click="
          $router.push({
            name: 'Detail',
            params: { propertyId: property.id },
          })
        "
      >
        <div class="background-image-container">
          <img
            :src="property.imgSrcUrl"
            alt="A landscape of the property"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div class="shadow" aria-hidden="true" />
          <router-link
            :to="{ name: 'Detail', params: { propertyId: property.id } }"
          >
            <h3>Property {{ property.id }}</h3>
          </router-link>

          <mars-overflow-menu class="mars-overflow-menu" orientation="top-left">
            <ul>
              <li>
                <button
                  @click="addToFavorites(property.id)"
                  class="list-tile ripple"
                >
                  <icon-favorites /><span>Add to favorites</span>
                </button>
              </li>
            </ul>
          </mars-overflow-menu>

          <transition name="remove-favorite">
            <div class="shadow-up" v-if="favoritesOnly" aria-hidden="true" />
          </transition>

          <transition name="remove-favorite">
            <button
              class="icon-close"
              v-if="favoritesOnly"
              @click.stop="removeFromFavorites(property.id)"
              title="Remove property from favorites"
            >
              <icon-close />
            </button>
          </transition>
        </div>

        <footer class="list-property-item-bottom">
          <span class="caption" title="Available since"
            >Available since {{(new Date()).toLocaleDateString()}}</span
          >

          <div class="bottom">
            <p>{{ property.description }}</p>
            <mars-chip class="type">{{
              property.type == "rent" ? "To rent" : "To buy"
            }}</mars-chip>
          </div>
        </footer>
      </li>
    </ul>

    <span v-show="properties.length == 0" class="no-property-found"
      >No property found
    </span>

    <transition name="transition-overlay-loading">
      <div v-show="loading" class="overlay-loading">
        <div
          class="spinner-colored loading"
          role="progressbar"
          aria-label="Searching"
        />
      </div>
    </transition>

    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import App from "@/App.vue"
import marsRepository from "@/assets/js/services/MarsRepository";
import { MarsProperty } from "@/assets/js/data/MarsProperty";
import { MarsAPIQuery } from "@/assets/js/data/MarsAPIQuery";

import MarsChip from "@/components/common/widgets/MarsChip.vue";
import MarsOverflowMenu from "../../common/widgets/MarsOverflowMenu.vue";
import IconFavorites from "../../icons/IconFavorites.vue";
import IconClose from "../../icons/IconClose.vue";

export default defineComponent({
  components: { MarsChip, MarsOverflowMenu, IconFavorites, IconClose },
  name: "OverviewList",
  emits: ["totalPageCount"],
  data: function () {
    return {
      loading: false,
      properties: [] as MarsProperty[],
    };
  },
  props: {
    query: {
      type: MarsAPIQuery,
      default: new MarsAPIQuery(),
    },
    favoritesOnly: Boolean,
  },
  watch: {
    query: function (newQuery) {
      this.fetchProperties(newQuery);
    },
    favoritesOnly: function () {
      this.fetchProperties(this.query);
    },
  },
  methods: {
    async fetchProperties(query: MarsAPIQuery) {
      this.loading = true;

      try {
        const result = this.favoritesOnly
          ? await marsRepository.fetchFavorites(query)
          : await marsRepository.fetchProperties(query);
        this.properties = result.data;
        this.$emit("totalPageCount", result.totalPageCount);
      } catch (e) {
        console.log(e);
      }

      this.loading = false;
    },
    addToFavorites(propertyId: string) {
      marsRepository.addToFavorites(propertyId);
      (this.$root as unknown as typeof App).showSnackBar(`Property ${propertyId} added to favorites`);
    },
    removeFromFavorites(propertyId: string) {
      marsRepository.removeFromFavorites(propertyId);
      this.fetchProperties(this.query);
    },
  },
});
</script>


<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

.overview-list {
  position: relative;
  padding: 20px;
}

$smaller-width: 22rem;


.list-property {
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));

  //For very narrow screens we have to lower the minimum size
  @include mixins.ifSmallerThan($smaller-width) {
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }

  justify-items: center;
  min-height: 300px;
}

/******************

  Body of cards,
  Image section with title

*******************/

.list-property-item {
  max-width: 28rem;
  position: relative;
  border-radius: 6px;
  background-color: var(--color-surface);
  overflow: hidden;
  padding-bottom: 0.7rem;
  box-shadow: 0 0 10px #22222288;
  transition: none;
  cursor: pointer;
}

.list-property-item:hover {
  transition: box-shadow 0.3s ease;
  box-shadow: 0 0 10px #22222288, 0 0 0 2px var(--color-primary);
}

.background-image-container {
  position: relative;
  width: 100%;
  height: 13.75rem;
  @include mixins.ifSmallerThan($smaller-width) {
    height: 11rem;
  }
}

.background-image-container > .shadow {
  position: absolute;
  width: 100%;
  height: 5rem;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0) 83%
  );
}

.background-image-container h3 {
  position: absolute;
  bottom: 1rem;
  left: 20px;
  color: #fafafa;
}

.background-image-container > a:focus > h3 {
  outline: solid 1.5px #fafafa;
}

/******************

  Body of cards, 
  overflow menu with three dots

*******************/

.mars-overflow-menu {
  position: absolute;
  right: 6px;
  bottom: 0.5rem;
  color: #fafafa;
  --color-highlight: #fafafa;
}

.mars-overflow-menu li > button {
  padding: 8px 12px;
  white-space: nowrap;
  --color-highlight: var(--text-color-primary);
}

.mars-overflow-menu li > button :first-child {
  width: 1.2rem;
  height: 1.2rem;
}

/******************

  Body of cards,
  Top bar for card to display a button for removal
  This part is only shown when FAVORITES are shown

*******************/

.list-property-item .shadow-up {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 83%
  );
  transform: rotate(180deg);
}

.list-property-item .icon-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem;
  color: #fafafa;
}

/******************

  Body of cards,
  Card footer

*******************/

.list-property-item > footer {
  padding: 0.8rem 1rem;
}

.list-property-item > footer > .caption {
  display: block;
  margin-bottom: 1rem;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 600;
}

.list-property-item > footer > .bottom {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.list-property-item > footer > .bottom p {
  color: var(--text-color-secondary);
  flex: 1;
}

/******************

  Transitions

*******************/
.transition-overlay-loading-enter-active,
.transition-overlay-loading-leave-active {
  transition: opacity 0.05s linear;
}

.transition-overlay-loading-enter-from,
.transition-overlay-loading-leave-to {
  opacity: 0;
}
.remove-favorite-enter-active,
.remove-favorite-leave-active {
  transition: opacity 0.3s linear;
}

.remove-favorite-enter-from,
.remove-favorite-leave-to {
  opacity: 0;
}

/******************

  General loading overlay

*******************/

.overlay-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background-color);
  
}

.loading {
  margin: auto;
  margin-top: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem; /* Set the width of the arc spinning */
}


/*********** 

  Message when no properties are found

**************/
.no-property-found {
  position: absolute;
  top: 2.4rem;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;

  font-size: 1.5rem;
}
</style>
