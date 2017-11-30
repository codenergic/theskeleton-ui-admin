<template>
  <span>{{ $t('common.redirecting') }}</span>
</template>

<script>
export default {
  mounted () {
    this.$router.replace({ name: 'admin-users' })
  }
}
</script>
