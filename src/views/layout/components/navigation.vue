<template>
	<nav class="navbar-default navbar-static-side" role="navigation">
		<div class="sidebar-collapse">
			<ul class="nav" id="side-menu">
				<profile/>
                <umenu/>
			</ul>
		</div>
	</nav>
</template>

<script>
import { profile, umenu } from '@/components'
export default {
  name: 'navigation',
  components: {
  	profile,
  	umenu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
