<template>
    <div class="row">
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Custom responsive table </h5>
				</div>
				<div class="ibox-content">
					<div class="table-responsive">
						<table-component
				            :data="[
				            { firstName: 'John', lastName: 'Lennon', instrument: 'Guitar', birthday: '04/10/1940', songs: 72 },
				            { firstName: 'Paul', lastName: 'McCartney', instrument: 'Bass', birthday: '18/06/1942', songs: 70 },
				            { firstName: 'George', lastName: 'Harrison', instrument: 'Guitar', birthday: '25/02/1943', songs: 22 },
				            { firstName: 'Ringo', lastName: 'Starr', instrument: 'Drums', birthday: '07/07/1940', songs: 2 },
				            ]"
				            sort-by="songs"
				            sort-order="asc"
				            >
				            <table-column show="firstName" label="First name"></table-column>
				            <table-column show="lastName" label="Last name"></table-column>
				            <table-column show="instrument" label="Instrument"></table-column>
				            <table-column show="songs" label="Songs" data-type="numeric"></table-column>
				            <table-column show="birthday" label="Birthday" data-type="date:DD/MM/YYYY"></table-column>
				            <table-column :sortable="false" :filterable="false">
				                <template slot-scope="artist">
				                    <a :href="'#' + artist.firstName.toLowerCase()">
				                        Edit
				                    </a>
				                </template>
				            </table-column>
				            <template slot="tfoot" slot-scope="{ rows }">
				                <tr>
				                    <th>&nbsp;</th>
				                    <th>&nbsp;</th>
				                    <th>Total Songs:</th>
				                    <th>{{ rows.reduce((sum, value) => { return sum + value.data.songs; }, 0) }}</th>
				                    <th>&nbsp;</th>
				                    <th>&nbsp;</th>
				                </tr>
				            </template>
				        </table-component>
					</div>       
                            
				</div>
			</div>
		</div>
	</div>
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
