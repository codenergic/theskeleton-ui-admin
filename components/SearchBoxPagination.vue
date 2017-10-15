<template>
  <div class="row">
    <div class="col-xs-2 col-md-6">
      <pagination-limit v-model="value.currentPageSize" :sizes="pageSizes" @refresh="search()"></pagination-limit>
    </div>
    <div class="col-xs-10 col-md-6">
      <search-box v-model="value.query" @search="search()"></search-box>
    </div>
  </div>
</template>

<script>
import PaginationLimit from '~/components/PaginationLimit'
import SearchBox from '~/components/SearchBox'

export default {
  components: {
    PaginationLimit,
    SearchBox
  },
  data () {
    return {
      value: {
        currentPageSize: this.pageSize,
        query: ''
      }
    }
  },
  props: {
    query: [ String ],
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [ 5, 10, 20, 50, 100 ]
      }
    }
  },
  methods: {
    search () {
      const value = this.value
      this.$emit('search', { query: value.query, pageSize: value.currentPageSize })
    }
  },
  watch: {
    pageSize (value) {
      this.value.currentPageSize = value
    },
    query (value) {
      this.value.query = value
    }
  }
}
</script>
