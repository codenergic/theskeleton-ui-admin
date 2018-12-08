<template>
  <div>
    <div v-if="infos" class="row mt-3">
      <div class="col">
        <b-card>
          <h1 class="display-1">
            The<strong>Skeleton</strong>
          </h1>
          <div>{{ git.build.version }}</div>
        </b-card>
      </div>
    </div>
    <div v-if="infos" class="row">
      <div class="col">
        <b-card title="Java Version">
          <div class="card-text">
            <dt>Source</dt>
            <dd>{{ app.java.source }}</dd>
            <dt>Target</dt>
            <dd>{{ app.java.target }}</dd>
            <dt>&nbsp;</dt>
            <dd>&nbsp;</dd>
          </div>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Artifact">
          <div class="card-text">
            <dt>GroupId</dt>
            <dd>{{ app.artifact.artifactId }}</dd>
            <dt>ArtifactId</dt>
            <dd>{{ app.artifact.groupId }}</dd>
            <dt>Version</dt>
            <dd>{{ app.artifact.version }}</dd>
          </div>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Build">
          <div class="card-text">
            <dt>Version</dt>
            <dd>{{ git.build.version }}</dd>
            <dt>Time</dt>
            <dd>{{ git.build.time }}</dd>
            <dt>User</dt>
            <dd>{{ git.build.user.email }}</dd>
          </div>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Commit">
          <div class="card-text">
            <dt>ID</dt>
            <dd>
              <a :href="'https://github.com/codenergic/theskeleton/commit/' + git.commit.id" target="_blank" v-text="infos.git.commit['id.abbrev']"></a>
            </dd>
            <dt>Time</dt>
            <dd>{{ git.commit.time }}</dd>
            <dt>User</dt>
            <dd>{{ git.commit.user.email }}</dd>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'infos' ],
  computed: {
    app () {
      return this.infos.app
    },
    git () {
      return this.infos.git
    }
  }
}
</script>
