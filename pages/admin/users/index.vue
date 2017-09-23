<template>
  <div>
    <b-card>
      <template slot="header">
      </template>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <b-button variant="primary">
            <i class="fa fa-plus"></i>
            Add new user
          </b-button>
        </div>
        <div class="col-xs-12 col-md-6">
          <b-input-group>
            <b-form-input></b-form-input>
            <b-input-group-button slot="right">
              <b-btn variant="primary">
                <i class="fa fa-search"></i>
              </b-btn>
            </b-input-group-button>
          </b-input-group>
        </div>
      </div>
      <div>
        <confirm-dialog id="confirm-delete" :title="$t('common.deleteConfirm')" @dialog-confirm="deleteUser(user)">
          <i18n path="common.deleteConfirmation" tag="span">
            <strong v-text="user.username"></strong>
          </i18n>
        </confirm-dialog>
        <search-box-pagination :query="q" :page-size="$store.state.paginationLimit" @search="v => findUsers(v.query, $route.query.page, v.pageSize)"></search-box-pagination>
        <br />
        <b-table hover striped small responsive :items="users.content" :fields="fields" :per-page="$store.state.paginationLimit">
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
          <template slot="unlocked" scope="item">
            <i :class="['fa', item.item.isNonLocked ? 'text-success fa-check' : 'text-danger fa-close']"></i>
          </template>
          <template slot="roles" scope="item">
            <b-badge v-for="r in roles[item.item.username]" :key="r" v-text="r.code"></b-badge>
            <b-button :class="['btn-sm']" :to="{ name: 'user-role-form', params: { id: item.item.username } }">
              <i class="fa fa-plus"></i>
            </b-button>
          </template>
          <template slot="action" scope="item">
            <b-button variant="secondary" size="sm" v-if="item.item.isNonLocked" @click="lockUnlockUser(item.item, false)" :title="$t('common.lock', [ '', item.item.username ])">
              <i class="fa fa-lock"></i>
            </b-button>
            <b-button variant="secondary" size="sm" v-else @click="lockUnlockUser(item.item, true)" :title="$t('common.unlock', [ '', item.item.username ])">
              <i class="fa fa-unlock"></i>
            </b-button>
            <router-link :class="['btn', 'btn-secondary', 'btn-sm']" :to="{ name: 'user-form', params: { id: item.item.username } }" :title="$t('common.modify', [ '', item.item.username ])">
              <i class="fa fa-pencil"></i>
            </router-link>
            <b-button variant="danger" size="sm" v-b-modal.confirm-delete @click="user=item.item" :title="$t('common.delete', [ user.username ])">
              <i class="fa fa-close"></i>
            </b-button>
          </template>
        </b-table>
        <div>
          <b-pagination size="md" :total-rows="users.totalElements" :per-page="$store.state.paginationLimit" v-model.number="users.number" @input="findUsers(q, users.number, $store.state.paginationLimit)" />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {

}
</script>
