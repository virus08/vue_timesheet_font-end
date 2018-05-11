<template>
 <center>
  <div class="hello">
    <h1>{{ UID }}</h1>
    <h2>Welcome to Presales Performance Report.</h2>
   </div>
  </center>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['UID'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
