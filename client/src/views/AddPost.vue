<template>
  <div>
    <div class="background" />
    <div class="content">
      <header>
        <h4>Create a new post!</h4>
      </header>
      <label for="title" class="sr-only">Title</label>
      <input
        v-model="post.title"
        type="text"
        id="title"
        name="title"
        class="col-12 mt-1"
        placeholder="Title"
        autofocus
      />

      <div>
        <p class="m-1 mt-3">Select a topic:</p>
        <b-form-select
          v-model="selected"
          :options="options"
          size="sm"
          class="mt-0 mb-3"
        ></b-form-select>
      </div>

      <label for="text" class="sr-only">Text</label>
      <b-form-textarea
        id="textarea-auto-height"
        v-model="post.content"
        placeholder="Enter text..."
        rows="8"
        name="text"
        max-rows="16"
      ></b-form-textarea>
      <b-button
        class="m-0 mt-1"
        id="add-post-button"
        variant="primary"
        v-on:click="postPost()"
      >
        Create post!
      </b-button>
      <b-button
        class="m-0 mt-1"
        id="cancel-button"
        variant="danger"
        v-on:click="goToHome()"
      >
        Cancel
      </b-button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'add-post',
  data() {
    return {
      post: {
        title: '',
        content: '',
        topic: ''
      },
      selected: 'Others',
      options: [
        { text: 'Life', value: 'Life' },
        { text: 'Gaming', value: 'Gaming' },
        { text: 'Health', value: 'Health' },
        { text: 'Food', value: 'Food' },
        { text: 'Business', value: 'Business' },
        { text: 'Politics', value: 'Politics' },
        { text: 'Sports', value: 'Sports' },
        { text: 'News', value: 'News' },
        { text: 'Others', value: 'Others' }
      ]
    }
  },
  methods: {
    async postPost() {
      this.post.topic = this.selected
      const response = await Api.postPost(this.post)
      // go to home page
      if (response.status === 201) {
        this.$router.push('/')
      }
    },
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 20px;
  word-wrap: break-word;
  text-align: center;
}
.background {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -1;
  position: absolute;
}

.content {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #ffffff;
  width: 40%;
  margin: auto;
  margin-top: 50px;
}

#title {
  height: 5vh;
}

#cancel-button {
  margin-left: auto;
  width: 100%;
}

#add-post-button {
  width: 100%;
  background-color: #698f69 !important;
}

@media screen and (max-width: 1200px) {
  .content {
    width: 50%;
  }
}

@media screen and (max-width: 992px) {
  .content {
    width: 60%;
  }
}

@media screen and (max-width: 768px) {
  .content {
    width: 90%;
  }
}
</style>
