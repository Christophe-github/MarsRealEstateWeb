<template>
  <section class="detail-more-infos">
    <h4>More infos</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <div class="available-since list-tile">
      <icon-date class="icon"></icon-date>
      <p>This property has been put to sale recently</p>
    </div>
    <div class="have-seen list-tile">
      <icon-people class="icon"></icon-people>
      <p><strong>3 people </strong> have already seen this property</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconDate from "../../icons/IconDate.vue";
import IconPeople from "../../icons/IconPeople.vue";

export default defineComponent({
  name: "DetailMoreInfos",
  components: {
    IconDate,
    IconPeople,
  },
});
</script>

<style>
.detail-more-infos {
  display: flex;
  flex-direction: column;
}

.detail-more-infos > p {
  margin-top: 1rem;
  flex: 1;
  color: var(--text-color-primary);
  text-align: justify;
  line-height: 1.5;
  overflow-y: auto;
}

/****** 

  Area below the description

********/

.available-since {
  padding-bottom: 1rem;
  border-bottom: solid 1px var(--color-on-background);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.detail-more-infos .icon {
  color: var(--color-primary);
}
</style>