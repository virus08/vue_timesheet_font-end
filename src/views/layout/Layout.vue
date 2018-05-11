<template>
  <div id="wrapper">
  	<navigation/>
  	<pageweapper/>
  </div>
</template>

<script>
// import VueResource from 'vue-resource'
import { navigation , pageweapper, } from './components'
export default {
  name: 'layout',
  components: {
  	navigation,
  	pageweapper
  }
}
require('@/assets/js/jquery-2.1.1.js')
require('@/assets/js/bootstrap.min.js')
require('@/assets/js/plugins/metisMenu/jquery.metisMenu.js')
require('@/assets/js/plugins/slimscroll/jquery.slimscroll.min.js')

require('@/assets/js/plugins/flot/jquery.flot.js')
require('@/assets/js/plugins/flot/jquery.flot.tooltip.min.js')
require('@/assets/js/plugins/flot/jquery.flot.spline.js')
require('@/assets/js/plugins/flot/jquery.flot.resize.js')
require('@/assets/js/plugins/flot/jquery.flot.pie.js')

require('@/assets/js/plugins/peity/jquery.peity.min.js')
require('@/assets/js/demo/peity-demo.js')

require('@/assets/js/inspinia.js')
require('@/assets/js/plugins/pace/pace.min.js')

require('@/assets/js/plugins/jquery-ui/jquery-ui.min.js')

require('@/assets/js/plugins/gritter/jquery.gritter.min.js')

require('@/assets/js/plugins/sparkline/jquery.sparkline.min.js')

require('@/assets/js/demo/sparkline-demo.js')

require('@/assets/js/plugins/chartJs/Chart.min.js')

// require('@/assets/js/plugins/toastr/toastr.min.js')
</script>
 
<style>

</style>
