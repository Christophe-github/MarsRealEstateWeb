<template>
  <div class="mars-overflow-menu" aria-label="Menu">
    <button
      :title="contentVisible ? 'Close menu' : 'Open menu'"
      @click.stop="contentVisible = !contentVisible"
      class="ripple"
    >
      <icon-more />
    </button>
    <transition name="transition-content">
      <div
        v-show="contentVisible"
        class="mars-overflow-menu-content"
        :class="orientationClass"
        @click.stop="contentVisible = false"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>


<script>
import IconMore from "../../icons/IconMore.vue";
export default {
  components: { IconMore },
  name: "MarsOverflowMenu",

  props: { orientation: String },
  data: function () {
    return {
      contentVisible: false,
    };
  },
  computed: {
    orientationClass() {
      switch (this.orientation) {          
        case "bottom-left":
          return { "bottom-left": true };
        case "top-right":
          return { "top-right": true };
        case "top-left":
          return { "top-left": true };
        case "bottom-right":
        default:
          return { "bottom-right": true };
      }
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.mars-overflow-menu {
  display: inline-block;
  position: relative;
}

.mars-overflow-menu > button {
  color: currentColor;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;
}

/* The size of the menu icon */
.mars-overflow-menu > button :first-child {
  width: 1.5rem;
  height: 1.5rem;
}


/***** Positionning the menu that appears after click */

.mars-overflow-menu-content {
  position: absolute;
  background-color: #fafafa;
  color: black;
  border-radius: 5px;
}

/* bottom-right needs no additional rules */
/* .bottom-right {} */

.bottom-left {
  right: 0;
}

.top-right {
  bottom: 0;
  transform: translateY(-2.5rem);
}

.top-left {
  right: 0;
  bottom: 0;
  transform: translateY(-2.5rem);
}



/***** Transitions ******/
.transition-content-enter-active,
.transition-content-leave-active {
  transition: opacity 0.05s ease;
}

.transition-content-enter-from,
.transition-content-leave-to {
  opacity: 0;
}
</style>
