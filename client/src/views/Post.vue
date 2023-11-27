<template>
  <div>
    <div class="background m-0"></div>
    <b-row v-if="this.post" class="m-0">
      <b-col id="reviewBox" class="col-12 col-lg-6">
        <div class="sticky-top">
          <!-- Review box -->
          <div id="review" class="card-body">
            <h5 id="title" class="card-title">{{ post.title }}</h5>

            <b-row>
              <p id="date" class="card-text mr-auto">
                {{ post.date }}
              </p>
            </b-row>

            <div v-if="this.post.content" id="text" class="card-text">
              <div class="text">
                <p v-if="this.showMore">
                  {{ post.content }}
                </p>
                <p v-else-if="post.content.length > 100">
                  {{ post.content.slice(0, 100) }}...
                </p>
                <p v-else>{{ post.content.slice(0, 100) }}</p>
                <b-button
                  :pressed="this.showMore"
                  v-if="post.content.length > 100"
                  v-on:click="showText()"
                  variant="link"
                  class="showMoreBtn"
                  text
                >
                  {{ this.showMore ? 'Show less' : 'Show more' }}
                </b-button>
              </div>
            </div>
            <b-row id="post-buttons" class="m-0">
              <!-- button to add comment -->
              <b-button
                v-b-toggle.collapse-1
                id="button"
                class="ml-auto"
                variant="warning"
              >
                <span class="when-open">Hide comment</span
                ><span class="when-closed">Add comment</span>
              </b-button>
            </b-row>
            <b-collapse id="collapse-1" class="mt-2">
              <div id="addComment">
                <div id="commentBody">
                  <b-form-textarea
                    id="commentText"
                    placeholder="Leave a comment..."
                  ></b-form-textarea>
                  <b-row class="m-2">
                    <b-button
                      id="button"
                      class="ml-auto"
                      variant="success"
                      v-on:click="postComment()"
                      >Submit</b-button
                    >
                  </b-row>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-col>

      <!-- Comments -->
      <b-col v-if="this.comments.length == 0">
        <h4 class="card-title mt-5">No comments yet</h4>
      </b-col>
      <b-col class="col-12 col-lg-6" v-else>
        <b-list-group class="comments">
          <comment-item
            v-for="comment in comments"
            :key="comment._id"
            :comment="comment"
          ></comment-item>
        </b-list-group>
      </b-col>
    </b-row>
    <div v-else class="text-center" id="not-found-box">
      <div>
        <h2>Review not found</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

// Components
import CommentItem from '@/components/CommentItem.vue'

export default {
  name: 'Review',
  components: {
    'comment-item': CommentItem
  },
  data() {
    return {
      showMore: false,
      post: '',
      comments: []
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      const response = await Api.getPostById(this.$route.params.id)
      if (response.status === 200) {
        this.post = response.post
        this.post.date = this.post.date.slice(0, 19).replace('T', ' ')
        this.getComments()
      } else if (response.status !== 404) {
        alert(response.message)
      }
    },
    async getComments() {
      const response = await Api.getCommentsByPostId(this.post._id)
      if (response.status === 200) {
        this.comments = response.comments
      } else if (response.status !== 404) {
        alert(response.message)
      }
    },
    showText() {
      this.showMore = !this.showMore
    },
    async postComment() {
      const response = await Api.postCommentByPostId(this.post._id, {
        content: document.getElementById('commentText').value
      })

      if (response.status === 201) {
        this.getComments()
        document.getElementById('commentText').value = ''
        this.$root.$emit('bv::toggle::collapse', 'collapse-1')
      } else {
        alert(response.message)
      }
    }
  }
}
</script>

  <style scoped>
.background {
  position: absolute;
  min-height: 100vh;
  top: 0;
  z-index: -1;
  background-color: #f6f7f8;
}
#addComment {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  display: inline-block;
  width: 100%;
}
#commentText {
  margin: 10px;
  width: 97%;
}
#reviewBox {
  margin: 20px;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
  top: 0px;
}
#review {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-left: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  background: #d9e1e9;
}
#date {
  margin-left: 15px;
}
.text {
  border: 1px solid black;
  border-radius: 10px;
  width: auto;
  background: #fff;
  word-wrap: break-word;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 5px;
}
h4 {
  margin: 15px;
  word-wrap: break-word;
}
h5 {
  word-wrap: break-word;
  font-weight: bold;
}
h1 {
  word-wrap: break-word;
  margin-left: 15px;
}
a {
  color: black;
}
#not-found-box {
  margin-top: 100px;
}
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

@media screen and (max-width: 576px) {
  #reviewBox {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  h1 {
    margin: 0;
    font-size: 1.4em;
  }
  h4 {
    font-size: 1.2em;
  }
  #comments {
    width: 100%;
  }
  #review {
    margin-left: 0;
    margin-right: 0;
  }
  #review-buttons > button {
    font-size: 0.8em;
  }
}
</style>
