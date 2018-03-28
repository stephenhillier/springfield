<template>
  <div id="app">
    <SpringfieldNav/>
    <SpringfieldBody/>
  </div>
</template>

<script>
import SpringfieldBody from './components/SpringfieldBody.vue'
import SpringfieldNav from './components/SpringfieldNav.vue'

export default {
  name: 'app',
  components: {
    SpringfieldBody,
    SpringfieldNav
  }
}
</script>

<style lang="scss">
@import url('https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/lumen/bootstrap.min.css');
@import url('https://fonts.googleapis.com/css?family=Rock+Salt');
</style>
