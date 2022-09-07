<template>
  <article class="note">
    <h1 class="note-title">{{ note.title }}</h1>
    <small class="date-created"
      >{{ new Date(note.dateCreated).toLocaleString() }}</small
    >
    <p class="note-content">{{ note.content }}</p>
<div class="note-action-buttons-container">
    <router-link class="note-action-button note-action-buttons__blue" :to="{ name: 'ViewNote', params: { id: note.id } }"
      >
        View</router-link
    >
    <router-link class="note-action-button note-action-buttons__green" :to="{ name: 'EditNote', params: { id: note.id } }"
      >
        Edit
      </router-link
    >
    <button
      class="note-action-button note-action-buttons__red"
      @click="deleteNote()"
    >
      Delete
    </button>
    </div>
  </article>
</template>

<script setup>

  import { defineProps } from 'vue'
  import { useNotesStore } from '@/stores/notes'

  const props = defineProps({
    note: Object
  })

  const store = useNotesStore()

  function deleteNote() {
    if (confirm("Are you sure you want to delete " + props.note.title)) {
      store.deleteNote(props.note);
    }
  }

</script>

<style lang="scss" scoped>
.note-action-button {
  outline: none;
  padding: 10px 15px;
  border: 0;
  font-size: 1em;
  font-family: Roboto;
  cursor: pointer;
  text-decoration: none;
}
// .note:nth-child(odd) .note-title,
// .note:nth-child(odd) .note-content,
// .note:nth-child(odd) .date-created {
//   color: gainsboro; 
// }
.note-action-button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.note-action-button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.note-action-buttons-container {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  margin-bottom:50px;
}

.note-action-buttons__blue {
  background-color: rgb(45, 123, 188);
  color: #fff;
}

.note-action-buttons__blue:hover {
  background-color: rgb(23, 129, 215);
}

.note-action-buttons__red {
  background-color: rgb(198, 51, 51);
  color: #fff;
  margin: 0; // Safari gap fix
}

.note-action-buttons__red:hover {
  background-color: rgb(215, 33, 33)
}

.note-action-buttons__green {
  background-color: rgb(67, 165, 34);
  color: #fff;
}

.note-action-buttons__green:hover {
  background-color: rgb(85, 184, 53);
}
</style>