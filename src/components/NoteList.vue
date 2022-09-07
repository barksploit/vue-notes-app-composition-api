<template>
  <section class="note-list">
    <div class="search-controls">
      <div class="search-bar-container">
        <input
          v-if="notes.length > 0"
          type="search"
          id="search-bar"
          placeholder="Search.."
          v-model="searchInput"
        />
      </div>
      <div class="sort-type-dropdown-container">
        <select
          v-if="notes.length > 1"
          v-model="sortOrder"
          class="sort-type-dropdown"
        >
          <option value="nto">Newest to Oldest</option>
          <option value="otn">Oldest to Newest</option>
        </select>
      </div>
    </div>
    <div class="notes" v-if="sortedNotes.length > 0">
      <Note v-for="note in sortedNotes" :key="note.id" :note="note" />
    </div>
    <h2 class="not-found" v-else-if="notes.length > 0">No Notes Found</h2>
    <h2 class="not-found" v-else>You've made no notes yet</h2>
  </section>
</template>

<script setup>
import Note from "@/components/Note.vue";
import { ref, onMounted, computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

  const store = useNotesStore() 

  const data = ref({
      notes: [],
      sortOrder: "nto",
      timeout: null,
      debouncedInput: "",
  })

  onMounted(() => {
    data.value.notes = store.getNotes
  })

  const sortedNotes = computed(() => {
      if (data.value.sortOrder === "nto") {
        return data.value.notes
          .slice()
          .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
          .filter(
            (note) =>
              note.content.toLowerCase().includes(data.value.debouncedInput) ||
              note.title.toLowerCase().includes(data.value.debouncedInput)
          )
      }
      else {
        return data.value.notes
          .slice()
          .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
          .filter(
            (note) =>
              note.content.toLowerCase().includes(data.value.debouncedInput) ||
              note.title.toLowerCase().includes(data.value.debouncedInput)
          );
      }
    })

    const searchInput = computed({
      get() {
        return data.value.debouncedInput;
      },

      set(val) {
        if (data.value.timeout) clearTimeout(data.value.timeout);
        data.value.timeout = setTimeout(() => {
          data.value.debouncedInput = val.toLowerCase();
        }, 300);
      }
    })

</script>

<style scoped>
.search-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.search-bar-container {
  text-align: left;
}
.not-found {
  margin: 100px 0;
}

.sort-type-dropdown-container {
  text-align: right;
}
.notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  grid-auto-rows: 1fr;
  margin: 25px 0;
}
#search-bar {
  padding: 15px 10px;
  border: none;
  font-size: .9em;
  width: 250px;
}
.sort-type-dropdown {
  padding: 15px 10px;
  font-size: .9em;
  border: none;
}

@media (max-width: 1084px) {
  .search-controls {
    display: none;
  }
  .notes {
  grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .notes {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
}
</style>