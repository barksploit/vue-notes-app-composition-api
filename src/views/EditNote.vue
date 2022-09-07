<template>
    <div class="edit-note">
      <h1 class="main-title">Edit Note</h1>

      <button class="back-button" @click="goBack">Go Back</button>
  
      <form class="edit-note-form" @submit.prevent="submitForm">
        
        <div class="input-group">
          <label for="title">Note Title</label>
          <input
            v-model="titleInput"
            type="text"
            placeholder="Shopping List"
            required
          />
        </div>
  
        <div class="input-group">
          <label for="content">Note Content</label>
          <textarea
            v-model="contentInput"
            placeholder="Eggs, Chicken, Bacon"
            required
          ></textarea>
        </div>
  
        <div class="input-group">
          <button class="edit-note-button" type="submit">Save Note</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import router from "../router";

  export default {
    name: "EditNote",
    data() {
        return {
            titleInput: "",
            contentInput: "",
        }
    },
    props: {
        id: String
    },
    methods: {
        goBack() {
        router.go(-1);
        },
        submitForm: function () {
            const note = {
            id: this.id,
            title: this.titleInput,
            dateCreated: Date.now(),
            content: this.contentInput,
            };
    
            this.$store.commit("editNote", note);
            router.push({ name: "Home" });
        },
    },
    mounted() {
        this.titleInput = this.fetchNoteTitle
        this.contentInput = this.fetchNoteContent
    },
    computed: {
        ...mapGetters(["getNote"]),
        fetchNoteTitle() {
            return this.getNote(this.id).title
        },
        fetchNoteContent() {
            return this.getNote(this.id).content
        }
    }
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
  
  .edit-note-form {
    background-color: white;
    display: inline-block;
    width: 650px;
    padding: 25px 75px;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 50px;
  }
  
  textarea {
    resize: none;
    height: 200px;
  }
  
  .edit-note-button {
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
  
  .edit-note-button:hover {
    background-color: rgb(208, 208, 208);
  }

  @media (max-width: 650px) {
    .edit-note-form{
    padding: 25px 25px;
    }
  }
  </style>