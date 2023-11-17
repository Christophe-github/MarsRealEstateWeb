<template>
  <form @submit.prevent="search" class="overview-search">
    <label for="search-property-id">Find a property by ID</label>
    <div class="input-wrapper">
      <input
        id="search-property-id"
        type="search"
        v-model="filter"
        placeholder="e.g. 140008, 140152 ..."
        inputmode="numeric"
        pattern="\d*"
        aria-describedby="search-property-id-desc"
        @input="setCustomValidity"
      />
      <button type="submit" title="Search">
        <icon-search aria-hidden="true"></icon-search>
      </button>
    </div>
    <p id="search-property-id-desc">Id can only contain numbers</p>
  </form>
</template>

<script>
import IconSearch from "@/components/icons/IconSearch.vue";
export default {
  components: { IconSearch },
  name: "OverviewSearch",
  emits: ["search"],
  data: function () {
    return {
      filter: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.filter);
    },
    setCustomValidity(event) {
      const input = event.target;

      const errorMessage = input.validity.patternMismatch
        ? "An id can only contain numbers"
        : "";
      input.setCustomValidity(errorMessage);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.input-wrapper {
  position: relative;

  /*************** 
  
    Basic input style

  ****************/

  input {
    width: 100%;
    border-bottom: solid 0.12rem transparent;
    padding-inline-end: 3rem; //end padding to give space to search button
  }

  //Here we are changing the default behavior of input:focus a bit :
  // we put no specific outline but a strong bottom border
  input:focus {
    outline: solid 1.5px var(--color-separator);
    border-bottom: solid 0.12rem var(--color-primary);
  }

  /*************** 
  
    Button with the search icon

  ****************/

  input:focus + button {
    color: var(--color-primary);
  }

  input:invalid:not(:focus):not(:placeholder-shown) + button {
    color: var(--color-error);
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 3rem;
    color: var(--text-color-primary);
  }

  button:active {
    background-color: var(--color-on-background);
  }

  button > svg {
    color: inherit;
    width: 1.2rem;
    height: 1.25rem;
  }
}

  /*************** 
  
    Description of the input

  ****************/

.overview-search > p {
  font-weight: 500;
  font-size: 0.9rem;
  margin-block-start: 0.3rem;
}
</style>
