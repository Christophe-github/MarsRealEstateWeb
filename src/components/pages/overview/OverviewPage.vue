<template>
  <div class="overview-page">
    <section class="search-container" role="search">
      <div class="header-favorites">
        <h2 v-if="!favoritesOnly">All properties</h2>
        <h2 v-if="favoritesOnly">Favorites</h2>
        <button
          class="mars-button-text button-clear-favorites"
          v-if="favoritesOnly"
          @click="clearFavorites()"
        >
          Remove all favorites
        </button>
      </div>
      <overview-search @search="filter = $event" class="overview-search" />

      <form class="search-bar-second-line">
        <fieldset class="filter-type-group" role="radiogroup">
          <legend>Filter properties</legend>
          <mars-chip
            @click="type = 'all'"
            :checked="type === 'all'"
            type="radio"
            group="type"
           
          >
            All
          </mars-chip>
          <mars-chip
            @click="type = 'rent'"
            :checked="type === 'rent'"
            type="radio"
            group="type"
            
          >
            To rent
          </mars-chip>
          <mars-chip
            @click="type = 'buy'"
            :checked="type === 'buy'"
            type="radio"
            group="type"
           
          >
            To buy
          </mars-chip>
        </fieldset>

        <div class="sorting-container">
          <label for="sort-property-by">Sort by</label>
          <mars-select v-model:selected="sortBy" id="sort-property-by">
            <option value="default">Default</option>
            <option value="priceAsc">Price ascending</option>
            <option value="priceDesc">Price descending</option>
          </mars-select>
        </div>
      </form>
    </section>

    <overview-list
      class="overview-list"
      :query="query"
      :favoritesOnly="favoritesOnly"
      id="anchor-top-overview"
      role="region"
      @totalPageCount="totalPageCount = $event"
    />

    <overview-pagination-bar
      class="pagination-bar"
      :currentPage="currentPage"
      :totalPageCount="totalPageCount"
      scrollAnchorOnPageSelected="#anchor-top-overview"
      @pageSelected="updatePage($event)"
    />
  </div>
  
</template>

<script lang="ts">
import { MarsAPIQuery } from "@/assets/js/data/MarsAPIQuery";
// import { MarsProperty } from "@/assets/js/data/MarsProperty";
import marsRepository from "@/assets/js/services/MarsRepository";
import { delay } from "@/assets/js/utils";

import App from "@/App.vue"

import MarsChip from "@/components/common/widgets/MarsChip.vue";
import MarsSelect from "@/components/common/widgets/MarsSelect.vue";
import OverviewList from "@/components/pages/overview/OverviewList.vue";
import OverviewSearch from "@/components/pages/overview/OverviewSearch.vue";
import { defineComponent } from "@vue/runtime-core";
import OverviewPaginationBar from "./OverviewPaginationBar.vue";

export default defineComponent({
  name: "OverviewPage",
  components: {
    MarsChip,
    MarsSelect,
    OverviewList,
    OverviewSearch,
    OverviewPaginationBar,
  },
  props: {
    favoritesOnly: { type: Boolean, default: false },
  },
  data: function () {
    return {
      filter: "",
      type: "all",
      sortBy: "default",
      currentPage: 1,
      totalPageCount: 0,
      query: new MarsAPIQuery(),
    };
  },
  watch: {
    filter: function () {
      this.newQuery();
    },
    type: function () {
      this.newQuery();
    },
    sortBy: function () {
      this.newQuery();
    },
  },
  methods: {
    async updatePage(pageNumber: number) {
      await delay(400);
      this.newQuery(pageNumber);
    },
    newQuery(pageNumber = 1) {
      this.currentPage = pageNumber;
      this.query = new MarsAPIQuery(
        this.filter,
        this.type,
        this.sortBy,
        this.currentPage
      );
    },
    clearFavorites() {
      marsRepository.clearFavorites();
      this.newQuery(); //To reload the list
      (this.$root as unknown as typeof App).showSnackBar(`All favorites removed`);
   
    },
  },
  mounted() {
    this.newQuery(this.currentPage);
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

/****** Search and filter form *****/
.overview-page > .search-container {
  width: clamp(10rem, 70%, 70ch);
  margin: 2rem auto 0.5rem auto;
}

.header-favorites {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-block-end: 1.8rem;
  align-items: baseline;
  column-gap:2rem;
}
.search-container  h2 {
  margin-block-end: 1rem;
  
}


.search-bar-second-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-block-start: 1.2rem;

  /***** Filter group *****/
  .filter-type-group {
    margin-right: 1rem;
    display: flex;
  }

  .filter-type-group > * {
    margin-right: 0.6rem;
  }

  /***** Sorting control *****/
  .sorting-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 1;
    justify-content: end;
    margin: 0.5rem 0;
  }

  .sorting-container > select {
    margin-left: 0.7rem;
  }
}

.pagination-bar {
  margin: 3rem;
}
</style>
