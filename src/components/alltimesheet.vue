<template>
  <div class="row">
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Custom responsive table </h5>
				</div>
				<div class="ibox-content">
					<div class="table-responsive">
						<v-client-table :data="tableData" :columns="columns" :options="options">
								<span slot="Job_date" slot-scope="props" style="width: 900px">{{props.row.Job_date| moment("D MMM YY")}}</span>
								<button slot="Action" slot-scope="props" class="btn btn-info " type="button"><i class="fa fa-paste"></i> Edit</button>
						</v-client-table>
					</div>              
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import tableData from 'vuetable-2/src/components/Vuetable'

export default {
  name: 'Timesheet',
  props: ['UID'],
	components: {
    tableData
	},

	data () {
    return {
				columns: ['id', 'Job_Header', 'Job_detail','Job_Hours','Job_date','Action'],
        tableData: [],
        options: {
            headings: {
							id:'[iD]',
							Job_Header: 'Name',
							Job_detail: 'Detail',
							Job_Hours:'Hour',
							Job_date:'Deadline'
						},
						perPage:6,
						perPageValues:[6,10,15,100],
						dateColumns: ['Job_date'],
						sortable:['Job_Header','Job_detail','Job_Hours','Job_date'],
						filterable:['Job_Header','Job_detail','Job_date'],
						sortIcon: {
							is:'fa-sort',
							base:'fa',
							up:'fa-sort-up',
							down:'fa-sort-down'
						}
        }
    }
	},
	methods: {
    getTimesheet: function () {
			API = window.API
			var UID = window.localStorage.getItem('UID')
			var API_TIMESHEET_BY_UID = API.TIMESHEET + '?filter[where][UID]='+ UID 
			var API_TIMESHEET_GT_THIS_Y= API_TIMESHEET_BY_UID + '&filter[where][create_date][gt]=2018-01&filter[where][Job_date][gt]=2018-01'
			var API_TIMESHEET = API_TIMESHEET_GT_THIS_Y +'&filter[order]=create_date%20DESC'
			this.$http.get(API_TIMESHEET).then((response) => {
	       //success
				this.tableData = response.body
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
    }
  },
  created: function () {
  	this.getTimesheet();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
