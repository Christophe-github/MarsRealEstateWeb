<template>
  <div class="global-container">
    <mars-header
      class="mars-header"
      ref="mars-header"
      @navigationClick="toggleNavigationView()"
      @skipLinks="focusMainContent()"
    />

    <main
      class="main"
      ref="main"
      tabindex="0"
      :class="{ scrollable: !navViewIsShown }"
    >
      <router-view v-slot="{ Component }">
        <keep-alive include="OverviewPage">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <transition name="scrim">
      <div
        class="scrim"
        v-show="navViewIsShown"
        @click="toggleNavigationView()"
      />
    </transition>

    <transition name="navigation-view">
      <navigation-view
        v-show="navViewIsShown"
        class="navigation-view"
        ref="navigation-view"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @close="toggleNavigationView()"
      />
    </transition>

    <mars-snackbar ref="snackbar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import UserPreferences from "./assets/js/services/UserPreferences";
import { applyTheme } from "./assets/js/services/ThemeApplyer";

import MarsHeader from "./components/common/MarsHeader.vue";
import NavigationView from "./components/common/NavigationView.vue";
import MarsSnackbar from "@/components/common/widgets/MarsSnackbar.vue";

export default defineComponent({
  name: "App",
  components: { MarsHeader, NavigationView, MarsSnackbar },
  data() {
    return {
      navViewIsShown: false,
    };
  },

  methods: {
    toggleNavigationView() {
      this.navViewIsShown = !this.navViewIsShown;
      if (this.navViewIsShown) this.$nextTick(() => this.focusNavigationView());
      else this.focusNavigationIcon();
    },
    focusNavigationView() {
      (this.$refs["navigation-view"] as HTMLElement).focus();
    },
    focusNavigationIcon() {
      (this.$refs["mars-header"] as typeof MarsHeader).focusNavigationIcon();
    },
    focusMainContent() {
      (this.$refs["main"] as HTMLElement).focus();
    },
    showSnackBar(message: string) {
      (this.$refs["snackbar"] as typeof MarsSnackbar).showSnackBar(message);
    },
  },

  watch: {
    $route: function () {
      this.navViewIsShown = false;
      // this.focusMainContent();
      this.focusNavigationIcon();
    },
  },

  created() {
    if (UserPreferences.getDarkmodePreferred()) applyTheme(true);
  },
});
</script>

<style lang="scss">
.mars-header {
  height: 3.8rem;
}

.main {
  height: calc(100vh - 3.8rem);
  // padding-top:2rem;
  box-sizing: border-box;
}

.main:not(.scrollable) {
  overflow: hidden;
}

.main:focus-visible {
  outline: none;
  // outline: solid 2px var(--color-primary) ;
  // outline-offset: -2px;
}

.scrim {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: black;
  opacity: 0.3;
}

.navigation-view {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 15rem;
  z-index: 0;
}

.navigation-view-enter-active,
.navigation-view-leave-active {
  transition: transform 0.3s ease;
}

.navigation-view-enter-from,
.navigation-view-leave-to {
  transform: translateX(-100%);
}

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 0.3s ease;
}

.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}
</style>
