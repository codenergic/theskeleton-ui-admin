<template>
  <div class="row">
    <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="deleteUser(user)">
      <i18n path="common.deleteConfirmation" tag="span">
        <strong v-text="user.username"></strong>
      </i18n>
    </confirm-dialog>
    <div class="col-xs-12 col-md-3">
      <module-title :title="$t('admin.user.title')" :subtitle="$t('common.addOrModify', [$t('admin.user.label')])">
        <b-button variant="primary" :to="{ name: 'user-form', params: { id: '+' } }">
          <i class="fa fa-plus"></i> {{ $t('common.addNew', [$t('admin.user.label')]) }}
        </b-button>
      </module-title>
    </div>
    <div class="col-xs-12 col-md-9">
      <div class="row">
        <div class="col-xs-2 col-md-6">
          <select class="custom-select" v-model.number="users.size" @change="findUsers($route.query.q, 1, users.size)">
            <option v-for="rs in userSizeOptions" v-text="rs"></option>
          </select>
          <b-button @click="findUsers($route.query.q, $route.query.page, $route.query.size)">
            <i class="fa fa-refresh"></i>
          </b-button>
        </div>
        <div class="col-xs-10 col-md-6">
          <form @submit.prevent @submit="findUsers(q, $route.query.page, $route.query.size)">
            <b-input-group class="">
              <b-form-input placeholder="Keywords" v-model="q"></b-form-input>
              <b-input-group-button slot="right">
                <b-button variant="primary">
                  <i class="fa fa-search"></i>
                </b-button>
              </b-input-group-button>
            </b-input-group>
          </form>
        </div>
      </div>
      <br />
      <b-table hover responsive striped :items="users.content" :fields="fields" :per-page="users.size">
        <template slot="itemNumber" scope="item">
          {{ item.index + (users.size * users.number) - users.size + 1 }}
        </template>
        <template slot="username" scope="item">
          <router-link :to="{ name: 'user-form', params: { id: item.value } }" v-text="item.value"></router-link>
        </template>
        <template slot="email" scope="item">
          <a :href="'mailto:' + item.value">
            <i class="fa fa-envelope"></i>
          </a>
          {{ item.value }}
        </template>
        <template slot="action" scope="item">
          <router-link :class="['btn', 'btn-secondary', 'btn-sm']" :to="{ name: 'user-form', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
            <i class="fa fa-pencil"></i>
          </router-link>
          <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="user=item.item" :title="$t('common.delete', [ user.username ])">
            <i class="fa fa-close"></i>
          </b-button>
        </template>
      </b-table>
      <div>
        <b-pagination size="md" :total-rows="users.totalElements" :per-page="users.size" v-model.number="users.number" @input="findUsers(q, users.number, users.size)" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog';
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    ConfirmDialog,
    ModuleTitle
  },
  data() {
    return {
      user: {},
      q: '',
      userSizeOptions: [5, 10, 20, 50, 100],
      fields: {
        itemNumber: { label: '#' },
        username: { label: this.$t('admin.user.labelUsername') },
        email: { label: this.$t('admin.user.labelEmail') },
        action: { label: this.$t('common.action') }
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.user.users;
    }
  },
  methods: {
    findUsers(q = '', page = 1, size = 20) {
      this.q = q;
      this.$router.push({ query: { q, page, size } });
      this.$store.dispatch('findUsers', { q, page, size });
    },
    deleteUser(user) {
      const self = this;
      this.$store.dispatch('deleteUser', user.id).then(() => {
        self.$store.commit('showNotification', { text: self.$t('common.deleteSuccess', [ user.username ]) });
        self.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size);
        self.user = {};
      });
    }
  },
  mounted() {
    if (!this.users.content) {
      this.findUsers(this.$route.query.q, this.$route.query.page, this.$route.query.size);
    }
  }
}
</script>
