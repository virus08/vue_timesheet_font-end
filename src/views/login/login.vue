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
          <input class="form-control" placeholder="Email@vstecs.co.th" v-model="credentials.email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
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
      credentials: {
        "email": "",
        "password":""
      }
    }
  },
  methods: {
    login: function () {
      //alert('test')
      API = window.API
      this.$http.post( API.LOGIN , this.credentials).then((response) => {
	       //success
	       myStorage.setItem('Token', response.body.id)
	       myStorage.setItem('UID', response.body.userId)
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
