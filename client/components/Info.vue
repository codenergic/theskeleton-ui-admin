<template>
  <div>
    <div class="row" v-if="infos.app">
      <div class="col">
        <b-jumbotron header="The<strong>Skeleton</strong>" >
          <p>{{ infos.git.build.version }}</p>
        </b-jumbotron>
      </div>
    </div>
    <div class="row" v-if="infos.app">
      <div class="col">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">Java Version</h4>
            <p class="card-text">
              <dt>Source</dt>
              <dd>{{ infos.app.java.source }}</dd>
              <dt>Target</dt>
              <dd>{{ infos.app.java.target }}</dd>
              <dt>&nbsp;</dt>
              <dd>&nbsp;</dd>
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">Artifact</h4>
            <p class="card-text">
              <dt>GroupId</dt>
              <dd>{{ infos.app.artifact.artifactId }}</dd>
              <dt>ArtifactId</dt>
              <dd>{{ infos.app.artifact.groupId }}</dd>
              <dt>Version</dt>
              <dd>{{ infos.app.artifact.version }}</dd>
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">Build</h4>
            <p class="card-text">
              <dt>Version</dt>
              <dd>{{ infos.git.build.version }}</dd>
              <dt>Time</dt>
              <dd>{{ infos.git.build.time }}</dd>
              <dt>User</dt>
              <dd>{{ infos.git.build.user.email }}</dd>
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">Commit</h4>
            <p class="card-text">
              <dt>ID</dt>
              <dd>{{ infos.git.commit['id.abbrev'] }}</dd>
              <dt>Time</dt>
              <dd>{{ infos.git.commit.time }}</dd>
              <dt>User</dt>
              <dd>{{ infos.git.commit.user.email }}</dd>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [ 'infos' ]
}
</script>
