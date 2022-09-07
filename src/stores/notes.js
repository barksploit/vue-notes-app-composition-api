import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  /* State */

  const notes = ref([
    {
      id: 3,
      dateCreated: 1661868720000,
      title: 'Code Snippet',
      content: '<p class="red">This is some red text</p>'
    },
    {
      id: 1,
      dateCreated: 1659190320000,
      title: 'Shopping List',
      content: 'Eggs\nBacon\nCheese\nLettuce\nCucumber\nButter'
    },
    {
      id: 2,
      dateCreated: 1648649520000,
      title: 'Dogs',
      content: 'Remember to take the dogs out for a walk'
    }
  ])

  /* Getters */

  const getNote = computed((state) => (id) => {
    return notes.find(note => note.id == id)
  })

  const getNotes = computed(() => {
    return notes
  })

  /* Actions/Mutations */

  deleteNote: (state) => (noteToDelete) => {
    state.notes.splice(state.notes.findIndex((note) => note.id == noteToDelete.id), 1)
  }

  createNote: (state) => (note) => {
    state.notes.push(note)
  }

  editNote: (state) => (newNote) => {
    let index = state.notes.findIndex(note => note.id == newNote.id)
    state.notes[index] = newNote

  }

  function initialiseStore() {
    if (localStorage.getItem('store')) {
      this.replaceState(JSON.parse(localStorage.getItem('store')))
    }
  }

  return { notes, deleteNote, createNote, editNote, initialiseStore, getNotes, getNote }
})
