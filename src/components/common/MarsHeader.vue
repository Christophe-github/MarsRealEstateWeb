<template>
  <header class="mars-header">
    <button
      @click="$emit('navigationClick')"
      aria-label="Open menu"
      class="button-menu"
      ref="button-menu"
    >
      <icon-menu />
    </button>

    <button
      @click="$emit('navigationClick')"
      aria-label="Open menu"
      class="button-mars"
      ref="button-mars"
    >
      <img src="@/assets/img/mars.svg" decoding="async"/>
    </button>
    <button class="skip-links" @click="$emit('skipLinks')">Skip links</button>

    <h3>Mars real estate</h3>
    <navigation-menu class="navigation-menu" aria-label="Main menu" />
  </header>
</template>

<script>
import IconMenu from "@/components/icons/IconMenu.vue";
import NavigationMenu from "./NavigationMenu.vue";

export default {
  name: "MarsHeader",
  emits: ["navigationClick", "skipLinks"],
  components: { NavigationMenu, IconMenu },
  methods: {
    focusNavigationIcon() {
      if (
        window
          .getComputedStyle(this.$refs["button-mars"])
          .getPropertyValue("display") === "none"
      )
        this.$refs["button-menu"].focus();
      else this.$refs["button-mars"].focus();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@use "@/assets/css/mixins.scss" as *;

// $widthMinForMenu: 850px;
$widthMinForMenu: 50rem;

.mars-header {
  border-bottom: solid 1px var(--color-separator);
  background-color: var(--color-surface);
  transition: background-color 0.3s;
  padding-inline-start: 16px;
  display: flex;
  align-items: center;

  overflow-x: auto;
  scrollbar-width: thin;

  h3 {
    margin-left: 1rem;
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-primary);
  }

  /*********

    Hamburger icon, only displayed on small screens
  
  **********/

  .button-menu {
    @include ifBiggerThan($widthMinForMenu) {
      display: none;
    }
  }

  .button-menu > svg {
    color: var(--color-primary);
    height: 2rem;
    width: 2rem;
  }

  /*********

    Mars icon, only showed on big screens
  
  **********/
  .button-mars {
    @include ifSmallerThan($widthMinForMenu) {
      display: none;
    }

    &:focus,
    &:focus-visible {
      outline: 1px dotted;
    }
  }

  .button-mars > img {
    width: 2.3rem;
  }

  /********** 
  
    Navigation menu, only showed in horizontal mode if there is enough space
  
  **********/

  .navigation-menu {
    height: 100%;

    @include ifSmallerThan($widthMinForMenu) {
      display: none;
    }
  }

  /*********** 
  
    Skip links button for accessibility 
  
  ************/

  .skip-links {
    position: absolute;
    left: 5rem;
    font-size: 1.2rem;
    background-color: var(--background-color);
    color: var(--text-color-primary);

    height: 0;
    width: 0;
    padding: 0;
    overflow: hidden;
  }

  .skip-links:focus {
    padding: 0.5rem;
    height: auto;
    width: auto;
  }
}
</style>
