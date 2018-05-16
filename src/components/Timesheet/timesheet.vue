<template>
  <div class="row">
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Presales Timesheet Table( 100 Last Record @ This Year ) </h5>
					<div class="ibox-tools">
						<a type="button" href="#Add-Model" data-toggle="modal" @click="clickNewTask()">
							<i data-v-e58ffb70="" class="fa fa-paste"></i>
							New Task 
						</a>
						<a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        	<i class="fa fa-wrench"></i> Option
						</a>
                        <ul class="dropdown-menu dropdown-user">
                        	<li><a href="#">ยังไม่ได้ทำรอก่อนนะ</a></li>
                        </ul>
                    </div>
				</div>
				<div class="ibox-content">
					<div><!-- ---------------------------------Table-------------------------------------------- -->
						<v-client-table :data="tableData" :columns="columns" :options="options" class="table-responsive">
								<div slot="id" slot-scope="props" style="width: 10px">
									{{props.row.id}}
								</div>
								<div slot="Job_Header"									 
									slot-scope="props"									 
									style="width: 200px"
									data-container="body" 
									data-toggle="popover" 
									data-placement="top" 
									data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." 
									data-original-title="" 
									title="" 
									aria-describedby="popover432029">
									{{props.row.Job_Header | truncate(30)}} 
								</div>
								<div slot="Job_detail" slot-scope="props" >
									<div> {{props.row.Job_detail}} </div> 
									<table><tr><td> [{{props.row.Job_Type}}] &nbsp; </td><td> [{{props.row.Job_SOW}}] </td></tr></table>
								</div>
								<div slot="SOW" slot-scope="props" >
									{{props.row.Job_Hours}}
								</div>
								<div slot="Job_date" slot-scope="props" style="width: 70px">{{props.row.Job_date| moment("D MMM YY")}}</div>
								<a slot="Action" slot-scope="props" class="btn btn-info " type="button" href="#edit-model" data-toggle="modal" @click="editModel(props.row)">
									<i class="fa fa-pencil-square-o"></i>
									Edit 
								</a>
						</v-client-table>
					</div>              
				</div>
			</div>
		</div>
		<!-- ---------------------------------Edit Model-------------------------------------------- -->
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
								<li v-for="tech in edTimesheet.Brands">{{tech}}</li>
							</ul>
							<label>Base On Technology</label>
							<ul>
								<li v-for="tech in edTimesheet.Base_Technology">{{tech}}</li>
							</ul>
							<label>Contact</label>
								<ul>
									<li v-for="contact in edTimesheet.contract">{{contact}}</li>
								</ul>
							</div>		
						</div>
						<div class="col-sm-6">
							<div class="form-group">
                  				<label>Job Name</label> 
                  				<input type="text" v-model="edTimesheet.Job_Header" placeholder="ชื่องาน" class="form-control">
                  				<label>Scope Of Works</label> 
				 				<select class="form-control m-b" v-model="edTimesheet.Job_SOW" @change="changeSOW()">
                     				<option v-for="option in edSOW" :value="option.Name"> {{option.Name}}&nbsp;[{{option.Hours}}]</option>
				 				</select>
					 			<label>Job Detail</label> 
                  				<textarea type="text" v-model="edTimesheet.Job_detail" placeholder="รายละเอียด" class="form-control" rows="5"></textarea>
                 				<label>Project-Track</label> 
						 		<select class="form-control m-b" v-model="edTimesheet.Projid" >
									<option v-for="option in edProj" :value="option.id"> {{option.Name}}&nbsp;[{{option.id}}]</option>
						 		</select>
				 			</div>
						</div>
					</div>
					<div >
					<hr>
						<a class="btn btn-info pull-left" type="button"  data-toggle="modal" href="#edit-model" @click="taskDelete(edTimesheet.id)">
							<i class="fa fa-ban"></i>
							Delete  
						</a>
						<a class="btn btn-info pull-right" type="button"  data-toggle="modal" href="#edit-model" @click="taskUpdate(edTimesheet)">
							<i class="fa fa-save"></i>
							Update 
						</a>
						<br>
					</div>         
				</div>
			</div>
		</div>
	</div>
	<!-- ---------------------------------Add Model-------------------------------------------- -->
	<div id="Add-Model" class="modal fade" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<div class="row">
							<center> 
								<p>Add New Task </p>
							</center>
							<hr>
							<div class="col-sm-6">
								<div class="form-group">
									<label>Job Name</label> 
									<input type="text" v-model="newTask.Job_Header" placeholder="ชื่องาน" class="form-control">
									<label>Job Detail</label> 
									<textarea type="text" v-model="newTask.Job_detail" placeholder="รายละเอียด" class="form-control" rows="4"></textarea>
									<label>Job Group</label>
									<select class="form-control m-b" v-model="newTask.Job_Type" @change="changeType()">
											<option v-for="option in adJobType" :value="option.Name"> {{option.Name}}</option>
									</select>
									<label>Job SOW</label>
									<select class="form-control m-b" v-model="newTask.Job_SOW">
											<option v-for="option in edSOW" :value="option.Name"> {{option.Name}}&nbsp;[{{option.Hours}}]</option>
									</select>
									<label>Project-Track</label> 	
									<select class="form-control m-b" v-model="edTimesheet.Projid" >
										<option v-for="option in edProj" :value="option.id"> {{option.Name}}&nbsp;[{{option.id}}]</option>
						 			</select>
								</div>		
							</div>
							<div class="col-sm-6">
								<div class="form-group">
									
									<label>Deadline</label>
									<input type="date" placeholder="วันส่งงาน" class="form-control" v-model="newTask.Job_date">
									<label>Base On Technology</label>
									<select multiple="multiple" size="8" class="form-control" v-model="newTask.Base_Technology">
										<option v-for= "option in adTech" :value="option.Name"> {{option.Name}} </option>
									</select>
									<label>Base On Technology</label>
									<select multiple="multiple" size="6" class="form-control" v-model="newTask.Brands">
										<option v-for= "option in adBrand" :value="option.Name"> {{option.Name}} </option>
									</select>
								</div>
							</div>
						</div>
					<div>
					<hr>
						<a class="btn btn-info pull-right" type="button"  data-toggle="modal" href="#Add-Model" @click="AddNewTask()">
							<i class="fa fa-save"></i>
							Add Task 
						</a>
						<br>
					</div>         
				</div>
			</div>
		</div>
	</div>
	<!-- ----------------------------------End Add Model----------------------------------- -->
</div>
</template>

<script>
// require('@/assets/js/plugins/pace/pace.min.js'
import tableData from 'vuetable-2/src/components/Vuetable'
// import edit_timesheet from './componants/edit_timesheet'

export default {
  name: 'Timesheet',
  props: ['RO'],
  components: {
	tableData,
	// edit_timesheet
	},

	data () {
		return {
			thisTimesheet:{},
			edTimesheet:{},
			adJobType:{},
			adTech:{},
			adBrand:{},
			edSOW:{},
			edProj:{},
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
			},
			newTask:{
				"UID": 0,
				"Name_Surname": "",
				"Job_Type": "",
				"Job_SOW": "",
				"Job_Hours": 0,
				"Base_Technology": [],
				"contract": [],				
				"remark": [],
				"Brands": [],
				"Projid": "",
				"Job_Header": "",
				"Job_detail": "",
				"create_date": Date.now(),
				"Job_date": Date.now(),
				"modify_date": Date.now(),
				"Job_progress": 100,
				"Job_status": "Completed",
				"Completed_date": Date.now()
			}
    	}
	},
	methods: {
	AddNewTask : function (myTimesheet){
		var API = window.API
		var API_AddNewTask = API.TIMESHEET 
		//myTimesheet.modify_date = Date.now()
		this.newTask.Job_Hours = this.edSOW.filter(list => list.Name == this.newTask.Job_SOW )[0].Hours
		this.$http.post(API_AddNewTask,this.newTask).then((response) => {
          	//success
			// alert('Add:'+ response.body.Job_Header+'On'+response.body.modify_date)
			this.getTimesheet();
			this.edTimesheet= {}
			}, (response) => {
			//error
			alert(response.body.error.message)
			});
	},
	clickNewTask: function(){
		const moment = require('moment')
		this.getprofile()
		this.edSOW=''
		var UID = window.localStorage.getItem('UID')
		this.newTask = {
			"UID": UID,
			"Name_Surname": "",
			"Job_Type": "",
			"Job_SOW": "",
			"Job_Hours": 0,
			"Base_Technology": [],
			"contract": [],				
			"remark": [],
			"Brands": [],
			"Projid": "",
			"Job_Header": "",
			"Job_detail": "",
			"create_date": Date.now(),
			"Job_date": moment().format("YYYY-MM-DD"),
			"modify_date": Date.now(),
			"Job_progress": 100,
			"Job_status": "Completed",
			"Completed_date": Date.now()
		}
	},
	changeType : function(){
		this.getSOW(this.newTask.Job_Type)
	},
	taskDelete : function (ID_Timesheet){
		//alert('delete'+ID_Timesheet)
		var API = window.API
		var API_Delete_By_Task_Id = API.TIMESHEET+'/'+ID_Timesheet
		this.$http.delete(API_Delete_By_Task_Id).then((response) => {
          	//success
			 //alert('Delete'+ID_Timesheet+' '+response.body.count)
			 this.getTimesheet();
			}, (response) => {
			//error
			alert(response.body.error.message)
			});
		
	},
	taskUpdate : function (myTimesheet){
		var API = window.API
		var API_Update_By_Task_Id = API.TIMESHEET + '/' + myTimesheet.id
		myTimesheet.modify_date = Date.now()
		this.$http.put(API_Update_By_Task_Id,myTimesheet).then((response) => {
          	//success
			 //alert('Update:'+ response.body.Job_Header+'On'+response.body.modify_date)
			this.getTimesheet();
			this.edTimesheet= {}
			}, (response) => {
			//error
			alert(response.body.error.message)
			});
	},
	changeSOW : function(){
		this.edTimesheet.Job_Hours = this.edSOW.filter(list => list.Name == this.edTimesheet.Job_SOW )[0].Hours
	},
	editModel: function(xTimesheet){
		this.edTimesheet= xTimesheet
		this.getSOW(this.edTimesheet.Job_Type)
	},
	getSOW : function (xGroup) {
        var API = window.API
        var API_SOW_By_GroupName = API.SOW+ '?filter[where][GroupName]='+xGroup
        // var UID = window.localStorage.getItem('UID')
        this.$http.get(API_SOW_By_GroupName).then((response) => {
          //success
        this.edSOW = response.body
          // this.GroupName = this.Sow_lists[0].GroupName
          //alert(this.edSOW)
		}, (response) => {
			//error
		alert(response.body.error.message)
		});
	  },
	getProject : function () {
        var API = window.API
		var UID = window.localStorage.getItem('UID')
		var API_PROJECT_By_UID = API.PROJECT + '?filter[where][UID]='+UID
        this.$http.get(API_PROJECT_By_UID).then((response) => {
          //success
          this.edProj = response.body
          // this.GroupName = this.Sow_lists[0].GroupName
          //alert(this.edSOW)
		}, (response) => {
			//error
			alert(response.body.error.message)
		});
      },
    getTimesheet: function () {
			API = window.API
			var UID = window.localStorage.getItem('UID')
			var API_TIMESHEET_BY_UID = API.TIMESHEET + '?filter[where][UID]='+ UID 
			var API_TIMESHEET_GT_THIS_Y= API_TIMESHEET_BY_UID + '&filter[where][create_date][gt]=2018-01&filter[where][Job_date][gt]=2018-01'
			var API_TIMESHEET = API_TIMESHEET_GT_THIS_Y +'&filter[order]=id%20DESC&filter[limit]=100'
			this.$http.get(API_TIMESHEET).then((response) => {
	       //success
				this.tableData = response.body
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
	},
	getprofile : function (){
  		var myStorage = window.localStorage 
  		var API = window.API
  		this.$http.get( API.PROFILE+myStorage.getItem('UID')).then((response) => {
	       //success
			this.newTask.Name_Surname = response.body.Name+' '+response.body.Sname
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
	  },
	  getJobType : function (){
  		//var myStorage = window.localStorage 
  		var API = window.API
  		this.$http.get(API.TASKGROP).then((response) => {
	       //success
			this.adJobType = response.body
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
	  },
	  getTech : function (){
  		//var myStorage = window.localStorage 
  		var API = window.API
  		this.$http.get(API.TECH).then((response) => {
	       //success
			this.adTech = response.body
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
	  },
	  getBrand : function (){
  		//var myStorage = window.localStorage 
  		var API = window.API
  		this.$http.get(API.BRANDS).then((response) => {
	       //success
			this.adBrand = response.body
	    }, (response) => {
	      //error
	      alert(response.body.error.message)
	    });
	  },
  },
  created: function () {
	this.getTimesheet()
	this.getJobType()
	this.getTech()
	this.getBrand()
	this.getProject()	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
