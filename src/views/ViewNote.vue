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

<script>
import router from "../router";

export default {
  props: {
    id: String,
  },
  methods: {
    goBack() {
      router.go(-1);
    },
  },
  computed: {
    ...mapGetters(["getNote"]),
    fetchNote() {
      return this.getNote(this.id);
    },
  },
};
</script>