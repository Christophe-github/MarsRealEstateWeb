<template>
  <div class="mars-checkbox">
    <input
      type="checkbox"
      @change="$emit('update:checked', $event.target.checked)"
      :checked="checked"
    />

    
    <div class="checkbox-border" />
    <div class="checkbox-background" />
    <div class="checkbox-marker" />
  </div>
</template>


<script>
export default {
  name: "MarsCheckbox",
  emits: ["update:checked"],
  props: {
    checked: Boolean,
  },
};
</script>

<style scoped>
.mars-checkbox {
  position: relative;
  width: 1.1rem;
  height: 1.1rem; 
  border-radius: 2px;
  overflow: hidden;
}

.mars-checkbox > input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkbox-border {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: solid 0.125rem var(--color-disabled);
}

.checkbox-background {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  transition: transform 0.1s ease, opacity 0.1s ease;
  transform: scale(0.8);

  opacity: 0;
}

.checkbox-marker {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 0.7rem;
  height: 0.4rem;
  border: solid var(--color-on-primary);
  border-width: 0 0 0.125rem 0.125rem;
  transition: all 0.1s;
  transform: rotate(-45deg) scale(0.8);

  opacity: 0;
}

.mars-checkbox > input:checked ~ .checkbox-border {
   border: solid 0.125rem var(--color-primary);
}

.mars-checkbox > input:checked ~ .checkbox-background {
  opacity: 1;
  transform: scale(1);
}

.mars-checkbox > input:checked ~ .checkbox-marker {
  opacity: 1;
  transform: rotate(-45deg) scale(1);
}
</style>
