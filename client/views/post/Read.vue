<template>
  <div class="panel">
    <div class="row post-container" v-for="post in posts.content">
      <div class="col-xs-12">
        <h2>{{ post.title }}</h2>
        <div v-html="post.content"></div>
        <p class="lead"><button class="btn btn-default">Read More</button></p>
        <p class="pull-right"><span class="label label-default">keyword</span> <span class="label label-default">tag</span> <span class="label label-default">post</span></p>
        <ul class="list-inline"><li><a href="#">2 Days Ago</a></li><li><a href="#"><i class="glyphicon glyphicon-comment"></i> 2 Comments</a></li><li><a href="#"><i class="glyphicon glyphicon-share"></i> 14 Shares</a></li></ul>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
  import post from "../../store/module/post";

  export default {
    data() {
      return {
        post: {},
        title: '',
      }
    },
    computed: {
      posts() {
        return this.$store.state.post.posts;
      }
    },
    methods: {
      findPost(title = '', page = 1, size = 20) {
        this.title = title;
        this.$router.push({query: {title, page, size}});
        this.$store.dispatch('findPost', {title, page, size});
        this.$store.commit('setPaginationLimit', size);
      }
    },
    mounted() {
        this.findPost(this.$route.query.title, this.$route.query.page, this.$route.query.size);
    }
  }
</script>
<style>
  .label-default {
    background-color: #999;
  }
  .label {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
  }
  .list-inline {
    padding-left: 0;
    list-style: none;
    margin-left: -5px;
  }
  .list-inline > li {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
  ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
  }
  a {
    color: #428bca;
    text-decoration: none;
  }
  .post-container:first-child {
    padding-top: 30px;
  }
  .post-container {
    padding-top: 10px;
  }
</style>
