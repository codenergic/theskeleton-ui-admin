<template>
  <div>
    <div class="row" v-if="infos">
      <div class="col">
        <b-jumbotron>
          <div slot="header">
            The<strong>Skeleton</strong>
          </div>
          <p>{{ infos.git.build.version }}</p>
        </b-jumbotron>
      </div>
    </div>
    <div class="row" v-if="infos">
      <div class="col">
        <b-card title="Java Version">
          <p class="card-text">
            <dt>Source</dt>
            <dd>{{ infos.app.java.source }}</dd>
            <dt>Target</dt>
            <dd>{{ infos.app.java.target }}</dd>
            <dt>&nbsp;</dt>
            <dd>&nbsp;</dd>
          </p>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Artifact">
          <p class="card-text">
            <dt>GroupId</dt>
            <dd>{{ infos.app.artifact.artifactId }}</dd>
            <dt>ArtifactId</dt>
            <dd>{{ infos.app.artifact.groupId }}</dd>
            <dt>Version</dt>
            <dd>{{ infos.app.artifact.version }}</dd>
          </p>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Build">
          <p class="card-text">
            <dt>Version</dt>
            <dd>{{ infos.git.build.version }}</dd>
            <dt>Time</dt>
            <dd>{{ infos.git.build.time }}</dd>
            <dt>User</dt>
            <dd>{{ infos.git.build.user.email }}</dd>
          </p>
        </b-card>
      </div>
      <div class="col">
        <b-card title="Commit">
          <p class="card-text">
            <dt>ID</dt>
            <dd>
              <a :href="'https://github.com/codenergic/theskeleton/commit/' + infos.git.commit.id" target="_blank" v-text="infos.git.commit['id.abbrev']"></a>
            </dd>
            <dt>Time</dt>
            <dd>{{ infos.git.commit.time }}</dd>
            <dt>User</dt>
            <dd>{{ infos.git.commit.user.email }}</dd>
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [ 'infos' ]
}
</script>
