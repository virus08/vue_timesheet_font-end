<template>
 <center>
  <div class="hello">
    <h1>{{ UID }}</h1>
    <h2>Welcome to Presales Performance Report.</h2>
   </div>
  </center>
</template>

<script>
// import tableData from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'HelloWorld',
  props: ['UID'],
  components: {},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      getData : function () {
        /*
        API = window.API
        var UID = window.localStorage.getItem('UID')
        this.$http.get(API).then((response) => {
          //success
          this.tableData = response.body
        }, (response) => {
          //error
          alert(response.body.error.message)
        });
         */
      }
  },
  created: function () {
      this.getData();
  },
  mounted: function () {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
