<template>
  <div class="mars-select">
    <select
      :id="id"
      :value="selected"
      @change="$emit('update:selected', $event.target.value)"
    >
      <slot></slot>
    </select>
    <icon-arrow-down
      class="icon-arrow-down"
      aria-hidden="true"
    ></icon-arrow-down>
  </div>
</template>

<script>
import IconArrowDown from "../../icons/IconArrowDown.vue";

export default {
  name: "MarsSelect",
  emits: ["update:selected"],
  props: {
    selected: String,
    id: String,
  },
  components: { IconArrowDown },
};
</script>

<style lang="scss" scoped>
// Global select style is in assets/css/main.scss, for example outline

.mars-select {
  position: relative;

  & > .icon-arrow-down {
    position: absolute;
    right: 0.5rem;
    top: 30%;
    width: 1rem;
    height: 1rem;

    color: var(--text-color-primary);

    pointer-events: none;
  }
}
</style>
