<template>
  <div class="not-found">
    <img src="@/assets/img/mars.svg" />
    <h3>Not found :(</h3>
    <h5>The page you are looking for does not exist</h5>
    <router-link to="/" class="link">Go back to Overview</router-link>
  </div>
</template>

<script>

export default {
  name: "NotFound",
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.not-found img {
  width: 10rem;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}

.not-found h3 {
  font-size: 1.5rem;
  *color: var(--color-primary);
  margin: 0.5rem;
}

.not-found h5 {
  font-size: 1rem;
  color: var(--text-color-secondary);
  font-weight:normal;
  margin: 0.5rem;
  margin-bottom: 3rem;
}

.not-found .link {
  margin-bottom: 3rem;
  color: var(--color-primary);
  font-weight: bold;
}

</style>
