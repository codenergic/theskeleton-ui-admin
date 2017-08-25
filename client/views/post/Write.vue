<template>
  <form method="post" @submit.prevent @submit="save(post)">
    <div class="row">
      <div id="scrolling-container" class="col">
        <div class="form-group">
          <b-form-input id="title" name="code" v-model="post.title" placeholder="Title"></b-form-input>
        </div>
        <quill-editor id="quill-container"
                      ref="contentEditor"
                      v-model="post.content"
                      :options="editorOption">
        </quill-editor>
      </div>
    </div>
    <div>
      <div class="form-group">
        <b-button variant="primary">
          <i class="fa fa-floppy-o"></i> {{ post.id ? $t('common.update', []) : $t('common.save') }}
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        editorOption: {
          theme: 'bubble',
          placeholder: "Tell your story...",
          scrollingContainer: "#scrolling-container",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'header': [1, 2, false] }],
              ['link', 'image'],
              ['clean']
            ]
          }
        }
      }
    },
    methods: {
      save(post) {
        this.$store.dispatch('savePost', post);
      }
    },
    computed: {
      post() {
        return this.$store.state.post.post;
      }
    },
    mounted() {
      this.$store.commit('setPost', {});
    }
  }
</script>
<style>
  #quill-container {
    height: auto;
    min-height: 100%;
  }

  #quill-container .ql-editor {
    font-size: 18px;
    overflow-y: visible;
    padding: 30px 10px 30px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    margin-bottom: 20px;
  }

  #scrolling-container {
    height: 100%;
    min-height: 100%;
    padding-top: 30px;
  }
</style>
