<template>
  <div>
    <button class="back-button" @click="goBack">Go Back</button>
    <section class="note-list">
      <article class="note" @click="handleClick">
        <h1 class="note-title">{{ fetchNote.title }}</h1>
        <small class="date-created"
          >Created on
          {{ new Date(fetchNote.dateCreated).toLocaleString() }}</small
        >
        <p class="note-content">{{ fetchNote.content }}</p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { computed } from 'vue'

const router = useRouter()

const store = useNotesStore()

const props = defineProps({
  id: String
})

function goBack() {
  router.go(-1);
}

const fetchNote = computed(() => {
  return store.getNote(props.id)
})
</script>