<template>
<div>
	test
</div>
</template>

<script>

export default {
  name: 'Logout',
  methods : {
  	logout(){
  		location.reload()
  		window.localStorage.clear();
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
