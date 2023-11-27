<template>
  <div class="commentBox">
    <b-row class="m-0">
      <div class="date">
        <p>{{ date }}</p>
      </div>
    </b-row>

    <div class="comment">
      <p v-if="this.showMore || comment.content.length <= 200">
        {{ comment.content }}
      </p>
      <p v-else>{{ comment.content.slice(0, 200) }}...</p>
      <b-button
        :pressed="this.showMore"
        v-if="comment.content.length > 200"
        v-on:click="showComment()"
        class="showMoreBtn"
        text
      >
        {{ this.showMore ? 'Show less' : 'Show more' }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment-item',
  props: ['comment'],
  data() {
    return {
      showMore: false,
      date: ''
    }
  },
  methods: {
    showComment() {
      this.showMore = !this.showMore
    }
  },
  mounted() {
    this.date = this.comment.date.slice(0, 19).replace('T', ' ')
  }
}
</script>

<style scoped>
.commentBox {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  background-color: #f1e2e2;
  word-wrap: break-word;
  margin-top: 50px;
  position: relative;
  text-overflow: ellipsis;
}
.comment {
  font-size: 1em;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  height: auto;
  background-color: #f5f5f5;
  word-wrap: break-word;
}
.showMoreBtn {
  width: 120px;
  height: 30px;
  font-size: 1em;
  padding: 3px;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
}
.date {
  font-size: 1em;
  margin: 10px;
  padding: 10px;
  height: 50px;
}

@media screen and (max-width: 768px) {
  .commentBox {
    margin-top: 0px;
  }
}
</style>
