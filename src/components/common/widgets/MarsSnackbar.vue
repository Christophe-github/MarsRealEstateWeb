<template>
  <transition name="snackbar">
    <div class="snackbar" v-if="snackbarVisible">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "MarsSnackbar",
  data() {
    return {
      snackDurationMillis: 3000,
      message: "",
      snackbarVisible: false,
      timeout: 0,
    };
  },
  methods: {
    showSnackBar(message: string) {
      if (this.snackbarVisible) {
        this.hideSnackbar();
        clearTimeout(this.timeout);
        this.$nextTick(() => {
          this.showSnackBar(message);
        });
      } else {
        this.message = message;
        this.snackbarVisible = true;
        this.timeout = setTimeout(() => {
          this.hideSnackbar();
        }, this.snackDurationMillis);
      }
    },
    hideSnackbar() {
      this.snackbarVisible = false;
    },
  },
});
</script>

<style lang="scss" >
// Global select style is in assets/css/main.scss, for example outline
/**************

  Snackbar

**************/

.snackbar {
  position: fixed;
  width: 80%;
  max-width: 30rem;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-snackbar);
  color: var(--color-on-snackbar);
  padding: 0.8rem;
  border-radius: 5px;
}

.snackbar-enter-active,
.snackbar-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s;
}

.snackbar-enter-from,
.snackbar-leave-to {
  @media (prefers-reduced-motion: reduce) {
    opacity: 0;
  }
  @media (prefers-reduced-motion: no-preference) {
    transform: translateX(-50%) translateY(200px);
  }
}
</style>
