<template>
  <ul class="overview-pagination-bar-list">
    <li v-if="currentPage > 3">
      <a
        :href="scrollAnchorOnPageSelected"
        @click="pageSelected(1)"
        :aria-label="'Page 1'"
        >1</a
      >
    </li>
    <li v-if="currentPage > 4">...</li>

    <template v-for="page in pageSuggestionsLinks" :key="page">
      <li  :class="{ 'page-active': page == currentPage }">
        <a
          :href="scrollAnchorOnPageSelected"
          @click="pageSelected(page)"
          :aria-label="'Page ' + page"
          >{{ page }}</a
        >
      </li>
    </template>

    <li v-if="currentPage < totalPageCount">
      <a
        :href="scrollAnchorOnPageSelected"
        @click="pageSelected(currentPage + 1)"
        :aria-label="'Next page'"
        >Next</a
      >
    </li>

    <li v-if="currentPage < totalPageCount">
      <a
        :href="scrollAnchorOnPageSelected"
        @click="pageSelected(totalPageCount)"
        :aria-label="'Last page'"
        >Last</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "OverviewPaginationBar",
  emits: ["pageSelected"],
  props: {
    currentPage: { type: Number, default: 1 },
    totalPageCount: { type: Number },
    scrollAnchorOnPageSelected: { type: String },
  },
  data: function () {
    return {
      pageSuggestionsCount: 7,
    };
  },
  computed: {
    pageSuggestionsLinks() {
      return Array.from(Array(this.pageSuggestionsCount), (_, i) => i + this.currentPage )
        .map((n) => n - 3)
        .filter((n) => n > 0 && n <= this.totalPageCount);
    },
  },
  methods: {
    pageSelected(n) {
      this.$emit("pageSelected", n);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overview-pagination-bar-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.overview-pagination-bar-list li {
  margin-right: 0.7rem;
  /* background-color: var(--color-on-background); */
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: flex-end;
}

.overview-pagination-bar-list li:hover {
  cursor: pointer;
}

.overview-pagination-bar-list a {
  padding: 0.5rem 0.8rem;
  color: currentColor;
  /* font-weight: 500; */
}

.page-active a {
  color: var(--color-primary);
}
</style>
