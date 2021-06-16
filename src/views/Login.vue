<template>
  <form @submit.prevent="login()" class="search-box">
    <input type="text" placeholder="Your Name?" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const login = () => {
      localStorage.setItem("autenticated", true);
      router.push({ name: "Home" });
    };
    return { login };
  },
};
</script>

<style lang="scss">
.search-box {
  display: flex;
  flex: 1;
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
      max-width: 300px;
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
</style>
