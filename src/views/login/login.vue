<template>
  <div>
    {{msg}}{{sharedState}}
  </div>
</template>

<script>
myStorage = window.localStorage; 

myStorage.set('Token', 'Token')
myStorage.set('isAuthenticated', true)

export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
