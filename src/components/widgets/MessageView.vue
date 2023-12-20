<template>
  <div class="meaage bg-base-dark-purple">
    <div class="wrap div-center">
      <img src="img/icon/bxs-bell1.png">&nbsp;{{ messageText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  props: ['messageText']
}
</script>

<style>

</style>