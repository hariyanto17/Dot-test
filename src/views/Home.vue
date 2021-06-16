<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt5433138">
        <img
          src="https://m.ayocirebon.com/images-cirebon/post/articles/2021/04/16/10310/fast_and_furious.jpg"
          alt="fast and furious 9 Poster"
          class="featured-img"
        />
        <div class="detail">
          <h3>Fast and Furious 9</h3>
          <p>
            Cipher enlists the help of Jakob, Dom's younger brother to take
            revenge on Dom and his team.
          </p>
        </div>
      </router-link>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        type="text"
        placeholder="What are you looking for?"
        v-model="search"
      />
      <button type="submit" value="Search">Search</button>
    </form>

    <div class="movies-list" v-if="initial">
      <card-movie
        v-for="naruto in narutos"
        :key="naruto.imdbID"
        :movie="naruto"
      ></card-movie>
    </div>
    <div class="movies-list" v-else>
      <card-movie
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
      ></card-movie>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import env from "../env.js";
import CardMovie from "../components/CardMovie.vue";

export default {
  setup() {
    const search = ref("");
    const movies = ref([]);
    const narutos = ref([]);
    const initial = ref(true);

    onBeforeMount(() => {
      fetch(`${env.url}/?apikey=${env.apikey}&s=naruto`)
        .then((response) => response.json())
        .then((data) => {
          narutos.value = data.Search;
          console.log(`data`, data);
        });
    });
    const SearchMovies = () => {
      if (search.value != "") {
        fetch(`${env.url}/?apikey=${env.apikey}&s=${search.value}`)
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.Search;
            search.value = "";
            initial.value = false;
          });
      }
    };

    return {
      search,
      movies,
      SearchMovies,
      initial,
      narutos,
    };
  },
  components: { CardMovie },
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 480px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }
    }
    button {
      width: 100%;
      max-width: 300px;
      background-color: #42b883;
      padding: 9px;
      border-radius: 8px;
      color: #fff;
      font-size: 20px;
      text-transform: uppercase;
      transition: 0.4s;
      border: none;
    }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;
  }
}
</style>
