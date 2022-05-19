<template>
  <div class="login-background">
    <img
      src="@/assets/img/mars.svg"
      class="mars-img"
      aria-hidden="true"
      alt=""
    />
    <img
      src="@/assets/img/satellite.svg"
      class="mars-img2"
      aria-hidden="true"
      alt=""
    />
    <icon-star class="star star-one" aria-hidden="true" alt="" />
    <icon-star class="star star-two" aria-hidden="true" alt="" />
    <icon-star class="star star-three" aria-hidden="true" alt="" />

    <svg
      width="100"
      height="12.2"
      version="1.1"
      viewBox="0 0 100 12.2"
      preserveAspectRatio="none"
      class="login-background-curve"
      role="img"
      aria-hidden="true"
      alt=""
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#df2813" />
          <stop offset="35%" stop-color="#b72507" />
          <stop offset="65%" stop-color="#c13010" />
          <stop offset="100%" stop-color="#df2813" />
        </linearGradient>
      </defs>
      <path
        d="m0 0s24.21 12.2 48.95 12.2c24.74 0 51.05-12.2 51.05-12.2z"
        fill="url(#gradient)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconStar from "@/components/icons/IconStar.vue";

export default defineComponent({
  name: "LoginBackground",
  components: { IconStar },
});
</script>

<style lang="scss">
@use "@/assets/css/mixins.scss";

.login-background {
  position: absolute;
  width: 100%;
  //Useful in order to avoid clipping the background images since they 
  //are all positioned with absolute
  min-height: 36rem; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.login-background-curve {
  position: absolute;
  color: var(--color-primary);
  align-self: center;
  width: 160%;
  height: 7rem;

  @include mixins.ifSmallerThan(900px) {
    width: 190%;
    height: 6.5rem;
  }
}

.mars-img {
  position: absolute;
  width: 14rem;
  height: 14rem;
  top: 18rem;
  left: 45%;
  transform: translateX(-130%);
  @media screen and (max-width: 500px) {
    top: 22rem;
    transform: translateX(-90%);
  }
}
.mars-img2 {
  position: absolute;
  width: 8rem;
  height: 8rem;
  top: 8rem;
  left: 55%;
  transform: translateX(160%) rotate(45deg);
}

.star {
  position: absolute;
  color: #fcfad6;
  width: 2rem;
  height: 2rem;
}

.star-one {
  top: 11rem;
  left: 10%;
  transform: translateX(-30%) rotate(5deg);
}
.star-two {
  top: 27rem;
  right: 16%;
  transform: rotate(20deg) scale(0.8);
}
.star-three {
  top: 7rem;
  right: 0.5rem;
  transform: rotate(45deg) scale(0.6);
}

.star {
  display: none;

  @media (prefers-color-scheme: dark) {
    display: block;
  }
}

:root.dark .star {
  display: block;
}
</style>