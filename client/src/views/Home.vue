<template>
  <div class="mt-3">
    <b-row class="m-0 justify-content-center" v-if="this.posts.length == 0">
      <h4 class="card-title mt-5">No posts yet</h4>
    </b-row>
    <div v-else>
      <b-form inline id="filter-form">
        <label class="sr-only" for="inline-form-input-topic"> Topic </label>
        <b-form-input
          class="ml-3 mb-3"
          placeholder="Filter by topic"
          v-model="filter.topic"
        ></b-form-input>
        <b-button
          class="ml-3 mb-3"
          variant="dark"
          v-on:click="sortByDescendingTitle()"
        >
          Sort by descending title
        </b-button>
        <b-button
          class="ml-3 mb-3"
          variant="dark"
          v-on:click="sortByAscendingTitle()"
        >
          Sort by ascending title
        </b-button>
      </b-form>

      <b-row class="m-0">
        <b-list-group horizontal class="posts">
          <post-item
            v-for="post in this.displayedPosts"
            :key="post._id"
            :post="post"
          ></post-item>
        </b-list-group>
      </b-row>
      <h2
        v-if="this.posts.length > 0 && this.displayedPosts.length < 1"
        class="text-center"
      >
        No posts match your search criteria
      </h2>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import PostItem from '@/components/PostItem.vue'

export default {
  name: 'home',
  data() {
    return {
      posts: [],
      post: {
        title: '',
        content: ''
      },
      filter: {
        topic: ''
      }
    }
  },
  computed: {
    displayedPosts() {
      return this.filterPosts()
    }
  },

  components: {
    'post-item': PostItem
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      const response = await Api.getPosts()
      this.posts = response.post
    },
    addPost() {
      Api.postPost(this.post)
    },
    filterPosts() {
      return this.posts.filter((post) => {
        return post.topic
          .toLowerCase()
          .includes(this.filter.topic.toLowerCase())
      })
    },
    sortByAscendingTitle() {
      this.posts.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        return 0
      })
    },
    sortByDescendingTitle() {
      this.posts.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<style>
.list-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
