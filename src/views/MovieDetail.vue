<template>
  <div v-if="loading">Loading ...</div>
  <div v-else>
    <div class="movie-detail">
      <h2>{{ movie.Title }}</h2>
      <p>{{ movie.Year }}</p>
      <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
      <p>{{ movie.Plot }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "../env.js";

export default {
  setup() {
    const movie = ref({});
    const loading = ref(true);
    const route = useRoute();

    onBeforeMount(() => {
      fetch(`${env.url}/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
          loading.value = false;
        });
    });

    return {
      movie,
      loading,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}
</style>
