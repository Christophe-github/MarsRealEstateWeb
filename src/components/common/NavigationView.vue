<template>
  <div class="navigation-view" >
    <h3>Mars real estate</h3>
    <navigation-menu class="navigation-menu" :vertical="true" aria-label="Main menu, secondary" />
    <button class="footer" @click="$emit('close')" >
      <span>Close</span>
      <icon-close class="icon" />
    </button>
  </div>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';
import IconClose from "@/components/icons/IconClose.vue";

export default {
  name: "NavigationView",
  emits: ["close"],
  components: {
    NavigationMenu,
    IconClose,
  },

  watch: {
    $route: function (newRoute) {
      this.currentPage = newRoute.name;
    },
  },

  methods: {
    focus() {
      this.$el.focus();
    },
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@use "@/assets/css/mixins.scss";

.navigation-view {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  box-shadow: 5px 0 8px -5px #22222288;
  overflow-y:auto;
}


.navigation-view > h3 {
  margin: 0.8rem;
  padding-bottom: 0.5rem;
  color: var(--color-primary);
}

.navigation-menu {
  flex: 1;
}

.footer {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: transparent;
  border: none;
  background-color: var(--color-on-background);
}

.footer :first-child {
  flex: 1;
  text-align: start;
  font-size: 1rem;
}

.footer {
  position: relative;
  color: var(--text-color-primary);
}

.footer:hover {
  @include mixins.apply-above-background(var(--color-on-background));
}
</style>
