<template>
  <template v-if="type === 'radio'">
    <!-- The label with input is shown only when the type 'radio' is chosen -->
    <label class="mars-chip ripple" :class="{ alternative: alternativeStyle }">
      <input
        type="radio"
        @click="$emit('click')"
        :checked="checked"
        :name="group"
      />
      <span class="checkmark" aria-hidden="true"></span>
      <slot></slot>
    </label>
  </template>

  <template v-else-if="type === 'button'">
    <!-- The button is shown only when the type 'button' is chosen -->
    <button
      class="mars-chip ripple"
      @click="$emit('click')"
      :class="{ alternative: alternativeStyle }"
    >
      <slot></slot>
    </button>
  </template>

  <template v-else>
    <!-- The basic div is shown when the type 'none' is chosen or no type is given-->
    <div class="mars-chip ripple" :class="{ alternative: alternativeStyle }">
      <slot></slot>
    </div>
  </template>
</template>


<script>
export default {
  name: "MarsChip",
  emits: ["click"],
  props: {
    group: String,
    checked: Boolean,
    alternativeStyle: { type: Boolean, default: false },
    type: {
      validator(value) {
        return ["none", "radio", "button"].includes(value);
      },
      default() {
        return "none";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

.mars-chip {
  position: relative;
  cursor: pointer;
  border-radius: 1.25rem;
  font-size: 0.8rem;
  white-space: nowrap;
  color: var(--text-color-primary);
}

/***********

We can't use display : flex to center elements in a label chip because
the screen readers would not recognize the association between the radio
input and the text label

*************/
label.mars-chip {
  padding-block: 0.5rem;
  padding-inline-start: 0;
  padding-inline-end: 0.75rem;
}


.mars-chip:not(label) {
  padding-block: 0.5rem;
  padding-inline: 0.75rem;
  display: flex;
}


.mars-chip:not(.alternative) {
  /* background-color: var(--color-on-background); */
  background-color: transparent;
  border: solid 1.5px var(--color-separator);
  border-top-left-radius: 0;
}

.mars-chip.alternative {
  background-color: transparent;
  border: solid 1.5px var(--color-separator);
}

.mars-chip:hover,
.mars-chip:focus-within {
  @include mixins.apply-above-background(var(--color-on-background));
}

/**************

We can't just use display:none because the
screen readers would not see the input in that case.

Also, we can't use position:absolute because this will also
cause problems with screen readers

**************/
.mars-chip > input {
  opacity: 0;
  height: 0;
  width: 0;
}

.mars-chip > input:hover {
  cursor: pointer;
}

.mars-chip input:checked ~ .checkmark {
  display: inline-block;
}

.mars-chip .checkmark {
  display: none;
  width: 0.9rem;
  height: 0.4rem;
  background-color: transparent;
  border: solid var(--color-primary);
  border-width: 0 0 0.14rem 0.14rem;
  transform: rotate(-45deg);
  margin-right: 0.5rem;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
}

button.mars-chip :first-child {
  align-self: center;
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
  color: var(--color-primary);
}
</style>
