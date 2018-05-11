<template>
</template>

<script>

export default {
  name: 'Logout',
  methods : {
  	logout(){
  		window.localStorage.clear();
		location.reload()
  	}
  },
  created: function () {
  		this.logout()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
