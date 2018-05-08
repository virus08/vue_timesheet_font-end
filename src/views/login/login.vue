<template>
  <div class="middle-box text-center loginscreen  animated fadeInDown ">
    <div>
      <div>
        <h1 class="logo-name">ES</h1>
      </div>
      <h3></h3>
      <p>
        Enterprise System @ VSTECS (Thailand) Performance Reoprt System
      </p>
      <p>Login in. To see it in action.</p>
      <div class="m-t" role="form">
        <div class="form-group">
          <input class="form-control" placeholder="Username" >
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password">
        </div>
          <button type="submit" class="btn btn-primary block full-width m-b" @click="login">Login</button>
        </div>
        <p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
      </div>
    </div>
</template>

<script>
var myStorage = window.localStorage
// myStorage.setItem('Token', 'Token')
// myStorage.setItem('isAuthenticated', true)

export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    login: function () {
      //alert('test')
      this.$http.post('http://localhost:8080/api/users/login', {"email":"wanchai@vstecs.co.th","password":"test"}).then((response) => {
	       //success
	       myStorage.setItem('Token', 'Token')
	       myStorage.setItem('isAuthenticated', true)
	       location.reload()
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
    }
  }
}
</script>

<style>
body {
    background-color: #f3f3f4;
}
</style>
