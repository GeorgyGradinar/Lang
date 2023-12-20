<template>
  <div></div>
</template>

<script>
export default {
  name: 'SignoutView',

  async mounted() {
    //this.$api.auth.setJWT('')
    //this.$api.cookie.setCookie('jwt', '', 1)
    //this.$store.dispatch('account/signout')
    this.$router.push('/signin')
  },

}
</script>

<style>

</style>