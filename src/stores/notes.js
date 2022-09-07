import { ref, computed } from 'vue'
import { defineStore, PiniaVuePlugin } from 'pinia'
import { watch } from 'vue'

export const useNotesStore = defineStore('notes', () => {

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

  watch(
    notes,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem('store', JSON.stringify(state))
    },
    { deep: true }
  )

  /* Getters */

  const getNote = computed((state) => (id) => {
    return notes.value.find(note => note.id == id)
  })

  /* Actions/Mutations */

  const deleteNote = (noteToDelete) => {
    notes.value.splice(notes.value.findIndex((note) => note.id == noteToDelete.id), 1)
  }

  const createNote = (note) => {
    notes.value.push(note)
  }

  const editNote = (newNote) => {
    let index = notes.value.findIndex(note => note.id == newNote.id)
    notes.value[index] = newNote

  }

  function initialiseStore() {
    if (localStorage.getItem('store')) {
      this.$patch(JSON.parse(localStorage.getItem('store')))
    }
  }

  return { notes, deleteNote, createNote, editNote, initialiseStore, getNote }
})
