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
								<div slot="id" slot-scope="props" style="width: 10px">
									{{props.row.id}}
								</div>
								<button slot="Job_Header"
									type="button" 
									slot-scope="props"
									class="btn btn-primary" 
									data-container="body" 
									data-toggle="popover" 
									data-placement="top" 
									data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." 
									data-original-title="" 
									title="" 
									aria-describedby="popover432029">
									{{props.row.Job_Header | truncate(30)}} 
								</button>
								<div slot="Job_detail" slot-scope="props" style="width: 100%">
									<div class="alert alert-success"> {{props.row.Job_detail}} </div> 
									<table>
										<tr>
										<td> [{{props.row.Job_Type}}] &nbsp; </td> 
										<td> 
										<td> [{{props.row.Job_SOW}}] </td> 
									 	</tr>
									</table>
								</div>
								<div slot="SOW" slot-scope="props" class="badge badge-primary">
									{{props.row.Job_Hours}}
								</div>
								<div slot="Job_date" slot-scope="props" style="width: 80px" class="label label-primary">{{props.row.Job_date| moment("D MMM YY")}}</div>
								<a slot="Action" slot-scope="props" class="btn btn-info " type="button" href="#edit-model" data-toggle="modal" @click="editModel(props.row)">
									<i class="fa fa-paste"></i>
									Edit 
								</a>
								<!--
									<edit_timesheet slot="Action" slot-scope="props" :TASK="props.row"></edit_timesheet>
									<button slot="Action" slot-scope="props" class="btn btn-info " type="button"><i class="fa fa-paste"></i> Edit</button>
								-->
						</v-client-table>
					</div>              
				</div>
			</div>
		</div>
		<div id="edit-model" class="modal fade" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<div class="row">
						<p> <center> <h1>Edit {{edTimesheet.id}} </h1> </center>
						<hr>
					<div class="col-sm-6">
						<div class="form-group">
							<p><label>Job Name</label> {{edTimesheet.Job_Header}} </p>
							<p><label>Job Type</label> {{edTimesheet.Job_Type}} </p>
							<p><label>SoW</label> {{edTimesheet.Job_SOW}}</p>
							<p><label>Job Hours</label> {{edTimesheet.Job_Hours}}</p>
							<p><label>Deadline</label> {{edTimesheet.Job_date | moment("D MMM YY")}} </p>
							<label>Brands</label>
							<ul>
								<li v-for="tech in edTimesheet.Brands" :key="tech">{{tech}}</li>
							</ul>
							<label>Base On Technology</label>
							<ul>
								<li v-for="tech in edTimesheet.Base_Technology" :key="tech" >{{tech}}</li>
							</ul>
							<label>Contact</label>
								<ul>
									<li v-for="contact in edTimesheet.contract" :key="contact">{{contact}}</li>
								</ul>
							</div>		
						</div>
						<div class="col-sm-6">
							<div class="form-group">
                  				<label>Job Name</label> 
                  				<input type="text" v-model="edTimesheet.Job_Header" placeholder="ชื่องาน" class="form-control">
                  				<label>Scope Of Works</label> 
				 				<select class="form-control m-b" v-model="edTimesheet.Job_SOW" @change="changeSOW()">
                     				<option v-for="option in edSOW" :value="option.Name" :key="option"> {{option.Name}}&nbsp;[{{option.Hours}}]</option>
				 				</select>
					 			<label>Job Detail</label> 
                  				<textarea type="text" v-model="edTimesheet.Job_detail" placeholder="รายละเอียด" class="form-control" rows="5"></textarea>
                 				<label>Project-Track</label> 
						 		<select class="form-control m-b" >
						 		</select>
				 			</div>
						</div>
					</div>
					<div >
					<hr>
						<a class="btn btn-info pull-left" type="button"  data-toggle="modal" >
							<i class="fa fa-paste"></i>
							Delete  
						</a>
						<a class="btn btn-info pull-right" type="button"  data-toggle="modal" >
							<i class="fa fa-paste"></i>
							Update 
						</a>
						<br>
					</div>         
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// require('@/assets/js/plugins/pace/pace.min.js'
import tableData from 'vuetable-2/src/components/Vuetable'
// import edit_timesheet from './componants/edit_timesheet'

export default {
  name: 'Timesheet',
  props: ['UID'],
  components: {
	tableData,
	// edit_timesheet
	},

	data () {
    return {
		thisTimesheet:{},
		edTimesheet:{},
		edSOW:{},
		GroupName:{},
		columns: ['id', 'Job_Header', 'Job_detail','SOW','Job_date','Action'],
        tableData: [],
        options: {
            headings: {
							id:'[iD]',
							Job_Header: 'Name',
							Job_detail: 'Detail',
							SOW:'Hour',
							Job_date:'Deadline'
						},
						perPage:6,
						perPageValues:[6,10,15,30],
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
	changeSOW : function(){
		this.edTimesheet.Job_Hours = this.edSOW.filter(list => list.Name == this.edTimesheet.Job_SOW )[0].Hours
	},
	editModel: function(xTimesheet){
		this.edTimesheet= xTimesheet
		this.getSOW()
	},
	getSOW : function () {
        var API = window.API
        var API_SOW_By_GroupName = API.SOW+ '?filter[where][GroupName]='+this.edTimesheet.Job_Type
        var UID = window.localStorage.getItem('UID')
        if (this.GroupName!=this.edTimesheet.Job_Type){
          this.$http.get(API_SOW_By_GroupName).then((response) => {
          //success
          this.edSOW = response.body
          // this.GroupName = this.Sow_lists[0].GroupName
          //alert(this.edSOW)
        }, (response) => {
          //error
          alert(response.body.error.message)
        });
        }
      },
    getTimesheet: function () {
			API = window.API
			var UID = window.localStorage.getItem('UID')
			var API_TIMESHEET_BY_UID = API.TIMESHEET + '?filter[where][UID]='+ UID 
			var API_TIMESHEET_GT_THIS_Y= API_TIMESHEET_BY_UID + '&filter[where][create_date][gt]=2018-01&filter[where][Job_date][gt]=2018-01'
			var API_TIMESHEET = API_TIMESHEET_GT_THIS_Y +'&filter[order]=create_date%20DESC&filter[limit]=30'
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
