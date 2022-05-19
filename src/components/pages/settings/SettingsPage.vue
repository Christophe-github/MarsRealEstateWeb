<template>
  <div class="settings-page">
    <div class="settings-card">
      <h2>Settings</h2>
      <label>
        <icon-darkmode aria-hidden="true" />
        <span>Toggle dark mode</span>
        <mars-checkbox v-model:checked="darkModePreferred" />
      </label>
      <label>
        <icon-people aria-hidden="true" />
        <span>
          Change font size
          <small>A better alternative is to use the browser's zoom </small>
        </span>

        <input type="number" min="10" max="40" v-model="fontSizePreferred" />
      </label>
    </div>
  </div>
</template>


<script>
/* eslint-disable  vue/no-unused-components*/
/* eslint-disable  no-unused-vars */
import UserPreferences from "@/assets/js/services/UserPreferences";
import { applyTheme, applyFontSize } from "@/assets/js/services/ThemeApplyer";

import IconDarkmode from "@/components/icons/IconDarkmode.vue";
import MarsCheckbox from "../../common/widgets/MarsCheckbox.vue";
import IconPeople from "../../icons/IconPeople.vue";

export default {
  name: "SettingsPage",
  components: { IconDarkmode, MarsCheckbox, IconPeople },
  data() {
    return {
      darkModePreferred: false,
      fontSizePreferred: 16,
    };
  },
  watch: {
    darkModePreferred: function (value) {
      UserPreferences.setDarkmodePreferred(value);
      applyTheme(value);
    },
    fontSizePreferred: function (value) {
      applyFontSize(value);
    },
  },

  created() {
    this.darkModePreferred = UserPreferences.getDarkmodePreferred();
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixins.scss";

/****** Settings card ******/

.settings-card {
  background-color: var(--color-surface);
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;

  @include mixins.ifSmallerThan(22rem) {
    width: 100%;
    margin: 0.5rem auto;
  }

  @include mixins.ifBiggerThan(22rem) {
    width: clamp(22rem, 80%, 30rem);
    min-height: 400px;
    margin: 2rem auto;
    border-radius: 5px;
    box-shadow: 0 0 8px #88747488;
  }
}

.settings-card > h2 {
  padding: 1.5rem;
  border-bottom: solid 1px var(--color-separator);

}

/******* 

  Style for each line of parameter

*******/

.settings-card > label {
  position: relative;
  padding: 1.3rem;
  width: 100%;
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.settings-card > label:focus-within,
.settings-card > label:hover {
  @include mixins.apply-above-background(var(--color-on-surface));
}

.settings-card > label > :first-child {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 2rem;
  color: var(--color-primary);
}

.settings-card > label > :nth-child(2) {
  flex: 1;
  font-weight: 500;
}

.settings-card > label > :nth-child(3) {
  max-width: 5rem;
}

.settings-card small {
  display: block;
  margin-block-start: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  color: var(--text-color-secondary);
}
</style>