<template>
  <div class="create-note">
    <h1 class="main-title">Create a New Note</h1>

    <form class="create-note-form" @submit.prevent="submitForm">
      <div class="input-group">
        <label for="title">Note Title</label>
        <input
          v-model="state.titleInput"
          type="text"
          placeholder="Shopping List"
          required
        />
      </div>

      <div class="input-group">
        <label for="content">Note Content</label>
        <textarea
          v-model="state.contentInput"
          placeholder="Eggs, Chicken, Bacon"
          required
        ></textarea>
      </div>

      <div class="input-group">
        <button class="create-note-button" type="submit">Create Note</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { ref } from 'vue'

const store = useNotesStore()

const router = useRouter()

const state = ref({
      titleInput: "",
      contentInput: "",
})

function submitForm() {
  const note = {
    id: Math.floor(Math.random() * 100000),
    title: state.value.titleInput,
    dateCreated: Date.now(),
    content: state.value.contentInput,
  }

    store.createNote(note)
    router.push({ name: "Home" })

}
    
</script>

<style lang="scss" scoped>
.input-group {
  margin: 50px auto;
}

.input-group label {
  margin: 15px;
  display: inline-block;
}

input[type="text"],
textarea {
  background-color: transparent;
  border: none;
  padding: 20px;
  display: block;
  width: 100%;
  background-color: #fcfcfc;
  margin: 0 auto;
  outline: none;
  font-weight: lighter;
  font-family: Roboto, sans-serif;
  font-size: 1.1em;
  box-sizing: border-box;
}

input[type="text"]::placeholder,
textarea::placeholder {
  opacity: 0.5;
}

.create-note-form {
  background-color: white;
  display: inline-block;
  width: 650px;
  padding: 25px 75px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 50px 0;
}

textarea {
  resize: none;
  height: 200px;
}

.create-note-button {
  outline: none;
  padding: 10px 15px;
  margin: 20px 10px 0 10px;
  border: 0;
  font-size: 1em;
  font-family: Roboto;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(239, 239, 239);
}

.create-note-button:hover {
  background-color: rgb(208, 208, 208);
}

@media (max-width: 650px) {
  .create-note-form {
    padding: 25px 25px;
  }
}
</style>