<template>
  <div>
    <h1 class="main-title">My Notes</h1>
    <NoteList />
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";

export default {
  name: "Home",
  components: {
    NoteList,
  },
};
</script>

<style scoped>
</style>