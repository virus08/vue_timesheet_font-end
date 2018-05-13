<template>
                <li class="active">
					<a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">Main Application</span> <span class="fa arrow"></span></a>
					<ul class="nav nav-second-level">
						<li :class="{ active: location==='/home' }"><a href="/home">Home</a></li>
						<li :class="{ active: location==='/home/Dashboard' }"><a href="/home/Dashboard">Dashboard</a></li>
						<li :class="{ active: location==='/home/Timesheet' }"><a href="/home/Timesheet">Timesheet</a></li>
						<li :class="{ active: location==='/home/Certificate' }"><a href="/home/Certificate">Certificate</a></li>
						<li :class="{ active: location==='/home/Project' }"><a href="/home/Project">Project</a></li>
						<li :class="{ active: location==='/home/KPI' }"><a href="/home/KPI">KPI</a></li>
					</ul>
				</li>
</template>

<script>
export default {
  name: 'umenu',
  data () {
    return {
      location: location.pathname,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
