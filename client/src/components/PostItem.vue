<template>
  <div class="col-md-6 col-lg-4 col-xl-4 mb-3">
    <div class="content">
      <p id="title">
        {{ post.title }}
      </p>
      <p class="mt-3 ml-4" id="topic">
        {{ post.topic }}
      </p>
      <div class="ml-4" id="text">
        <p v-if="post.content.length > 300">
          {{ post.content.slice(0, 300) }}...
        </p>
        <p v-else>
          {{ post.content }}
        </p>
      </div>
      <b-row class="m-0 ml-3">
        <div id="date" v-b-tooltip.hover :title="this.post.date">
          <p>{{ this.date }}</p>
        </div>
        <b-button
          class="moreButton mb-1 mr-1"
          variant="info"
          v-on:click="goToPost()"
          >More...</b-button
        >
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-item',
  props: ['post'],
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    this.date = this.post.date.slice(0, 10)
  },
  methods: {
    goToPost() {
      this.$router.push({
        name: 'post',
        params: { id: this.post._id }
      })
    }
  }
}
</script>

<style scoped>
.content {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  min-height: 40vh;
}

#topic {
  display: inline-block;
  border: black solid 1px;
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(134, 226, 238);
  font-weight: bold;
}

#date {
  bottom: 0;
  position: absolute;
}

#title {
  font-size: 17px;
  word-wrap: break-word;
  margin: 20px 0 0 20px;
}

#text {
  word-wrap: break-word;
  padding-bottom: 30px;
}

.moreButton {
  bottom: 0;
  right: 0;
  position: absolute;
}

@media (max-width: 768px) {
  #date {
    display: none;
    height: 0px;
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 576px) {
  .content {
    min-height: 25vh;
  }
}
</style>
