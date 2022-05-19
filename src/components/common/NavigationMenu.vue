<template>
  <nav
    class="navigation-rail"
    :class="{ vertical: vertical, horizontal: !vertical }"
    role="navigation"
  >
    <ul>
      <li class="ripple" :class="{ active: currentPage == 'Login' }" >
        <router-link :to="{ name: 'Login' }" aria-label="Login" >
          <icon-login class="icon" aria-hidden="true" role="img" />
          <h5>Login</h5>
        </router-link>
      </li>

      <li class="ripple" :class="{ active: currentPage == 'Overview' }" >
        <router-link :to="{ name: 'Overview' }" aria-label="Browse" >
          <icon-mars class="icon" aria-hidden="true" role="img" />
          <h5>Browse</h5>
        </router-link>
      </li>

      <li class="ripple" :class="{ active: currentPage == 'Favorites' }">
        <router-link :to="{ name: 'Favorites' }" aria-label="Favorites">
          <icon-favorites class="icon" aria-hidden="true" role="img" />
          <h5>Favorites</h5>
        </router-link>
      </li>

      <li class="ripple" :class="{ active: currentPage == 'Sell' }">
        <router-link :to="{ name: 'Sell' }" aria-label="Sell">
          <icon-cart class="icon" aria-hidden="true" role="img" />
          <h5>Sell</h5>
        </router-link>
      </li>
      <li class="ripple" :class="{ active: currentPage == 'Settings' }">
        <router-link :to="{ name: 'Settings' }" aria-label="Settings">
          <icon-settings class="icon" aria-hidden="true" role="img" />
          <h5>Settings</h5>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconCart from "@/components/icons/IconCart.vue";
import IconMars from "@/components/icons/IconMars.vue";
import IconFavorites from "@/components/icons/IconFavorites.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconLogin from '@/components/icons/IconLogin.vue';

export default {
  name: "NavigationMenu",
  components: {
    IconCart,
    IconMars,
    IconFavorites,
    IconSettings,
    IconLogin,
  },
  props: {
    vertical: Boolean,
  },
  data: function () {
    return {
      currentPage: "",
    };
  },

  watch: {
    $route: function (newRoute) {
      this.currentPage = newRoute.name;
    },
  },

 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

/**Style for horizontal alignment */
.navigation-rail.horizontal ul {
  display: flex;
  align-items: center;
  height: 100%;
}

.navigation-rail.horizontal li {
  // width: 100px;
  width:6rem;
  height: 100%;
  
}

.navigation-rail.horizontal a {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/**Style for vertical alignment */
.navigation-rail.vertical ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.navigation-rail.vertical li {
  width: 100%;
}

.navigation-rail.vertical li:last-child {
  border-top:solid 1.5px var(--color-separator);
}

.navigation-rail.vertical a {
  padding: 15px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/** Common styles */
.navigation-rail li {
  position: relative;
}

.navigation-rail.vertical a :first-child {
  margin-right: 1rem;
}

.navigation-rail li.active a {
  color: var(--color-primary);
}

.navigation-rail li:not(.active) a {
  color: var(--color-disabled);
}

.navigation-rail li .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.navigation-rail li h5 {
  margin: 0;
  margin-top: 4px;
  font-size: 1rem;
  font-weight: 500;
}

.navigation-rail li:focus-within,
.navigation-rail li:hover {
  @include mixins.apply-above-background(var(--color-on-background));
}
</style>
