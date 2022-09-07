<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'create' }">Create Note</router-link>
  </div>
  <router-view v-slot="{ Component, route }">
    <Transition :name="data.transitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
  <Footer />
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import { ref, onBeforeMount, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRoute } from 'vue-router'

const store = useNotesStore()

const route = useRoute()

const data = ref({
    prevPath: "",
    paths: ["/", "/about", "/create"],
    transitionName: null,
})

onBeforeMount(() => {
  store.initialiseStore()
  console.log(route)
})

store.$subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

watch( route, () => {
    if (!data.value.prevPath) {
      data.value.transitionName = "";
    } else {
      if (
        data.value.paths.findIndex((path) => path == data.value.prevPath) <
        data.value.paths.findIndex((path) => path == route.path)
      ) {
        data.value.transitionName = "left";
      } else {
        data.value.transitionName = "right";
      }
    }
    data.value.prevPath = route.path;
  })
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@300&display=swap");

body {
  background-color: rgb(244, 244, 244);
  margin: 0;
  overflow-x: hidden;
  padding-bottom: 200px;
  position: relative;
}
.back-button {
  outline: none;
  padding: 10px 15px;
  margin: 50px auto;
  border: 0;
  font-size: 1em;
  font-family: Roboto;
  display: block;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(36, 164, 88);
  color: #fff;
}

.back-button:hover {
  background-color: rgb(31, 183, 92);
}
.note {
  background-color: rgb(255, 255, 255);
  padding: 35px 35px 120px 35px;
  position: relative;
}
.main-title {
  color: rgb(255, 255, 255);
  background-color: rgb(36, 164, 88);
  margin: 0;
  padding: 50px 0;
  font-weight: lighter;
}

.note-content {
  white-space: pre-wrap;
  padding: 25px;
  font-size: 1em;
}

.note-title {
  font-size: 1.7em;
  font-family: Roboto;
  color: rgb(56, 56, 56);
}

.note-content {
  color: #5e5e5ed9;
}

.note-title,
.note-content {
  font-weight: lighter;
}

.note-list {
  max-width: 100%;
  width: 1500px;
  box-sizing: border-box;
  padding: 0 25px;
  margin: 50px auto;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Roboto;
}

.date-created {
  font-size: 1em;
  font-family: Roboto;
  opacity: 0.5;
}

#nav {
  padding: 30px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  box-shadow: 3px 2px 4px 0px rgba(0, 0, 0, 0.057);

  a {
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/*

Vue Component Transitions

*/

.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
  transition: all 0.2s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s linear 0.2s;
}

.right-enter-from {
  transform: translateX(-100vw);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.right-leave-to {
  transform: translateX(100vw);
}

.left-enter-from {
  transform: translateX(100vw);
}

.left-leave-to {
  transform: translateX(-100vw);
}
</style>