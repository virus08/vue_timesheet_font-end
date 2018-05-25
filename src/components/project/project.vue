<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="ibox-content m-b-sm border-bottom">
          <div class="text-center p-lg">
            <h2> All projects assigned to this account</h2>
            <div class="text-center p-lg">
                                <span>add your Project </span>
                                <a href="#addproject" data-toggle="modal" title="Create new project" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> <span class="bold">Add Project </span></a> button
                            </div>
          </div>
        </div>  
        <!-- -->
        <div class="faq-item" v-for="project in ProjectList">
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <a data-toggle="collapse" :href="'#faq'+ project.id " class="faq-question"> {{project.Name}} </a>
              </div>
              <div class="row">
                 <p>{{project.Desc}}</p> 
              </div>
            </div>
            <div class="col-md-2">
              <span class="small font-bold">Tag</span>
              <div class="tag-list">
                <p>
                  <span class="tag-item">Project ID: ({{project.id}})</span>
                  <span class="tag-item">{{project.Status}}</span>
                </p>
                <p>
                  <span class="tag-item">Last Update: {{project.Modify_date | moment("D MMM YY") }}</span>
                </p>
              </div>
            </div>
            <div class="col-md-1">
              <a href="#editproject" data-toggle="modal" class="btn btn-white btn-sm" @click="ProjEdit(project)"><i class="fa fa-pencil"></i> Edit </a>
            </div>
          </div>
          <div class="row">
            <task :Project="project"></task>
            
          </div>
      </div>
      <!-- -->
    </div>
  </div>
  <div id="editproject" class="modal fade" >
      <div class="modal-dialog">
        <div class="modal-content">
		 				<div class="modal-body">
		 					<div class="row">
		 						<div class="form-group">
		 							<label>Project Name</label> <input type="string" v-model="edProj.Name" placeholder="ชื่อโครงการ"  class="form-control">
		 							<label>Project Description</label> <textarea type="string" rows="5" v-model="edProj.Desc" placeholder="รายละเอียดโครงการ"  class="form-control" />
		 							<label>Type</label>
		 							<select class="form-control m-b" v-model="edProj.Type" placeholder="ประเภท" @change="Projtypechange()">
		 								<option>Internal</option> 
		 								<option>External</option>                                         
		 							</select>
		 							<label>Status</label>
			 						<select class="form-control m-b" v-model="edProj.Status" placeholder="สถานะ" >
			 							<option v-for="option in pstatus[ty]">{{option}}</option> 
			 						</select>
			 					</div>
		 					</div>
							<hr>
							<div class="row">
								<div class="col-sm-6" />
								<div class="col-sm-3" />
								<div class="col-sm-3">
									<a href="#editproject" data-toggle="modal" class="btn btn-sm btn-primary pull-right m-t-n-xs" @click="Updateproj(edProj)">
										<strong>Update</strong>
									</a>  
								</div>											
							</div>
						</div>
					</div>
      </div>
  </div>
  <div id="addproject" class="modal fade" >
      <div class="modal-dialog">
        <div class="modal-content">
		 				<div class="modal-body">
		 					<div class="row">
		 						<div class="form-group">
		 							<label>Project Name</label> <input type="string" v-model="addProj.Name" placeholder="ชื่อโครงการ"  class="form-control">
		 							<label>Project Description</label> <textarea type="string" rows="5" v-model="addProj.Desc" placeholder="รายละเอียดโครงการ"  class="form-control" />
		 							<label>Type</label>
		 							<select class="form-control m-b" v-model="addProj.Type" placeholder="ประเภท" @change="Projtypechange()">
		 								<option>Internal</option> 
		 								<option>External</option>                                         
		 							</select>
		 							<label>Status</label>
			 						<select class="form-control m-b" v-model="addProj.Status" placeholder="สถานะ" >
			 							<option v-for="option in pstatus[ty]">{{option}}</option> 
			 						</select>
			 					</div>
		 					</div>
							<hr>
							<div class="row">
								<div class="col-sm-6" />
								<div class="col-sm-3" />
								<div class="col-sm-3">
									<a href="#addproject" data-toggle="modal" class="btn btn-sm btn-primary pull-right m-t-n-xs" @click="Addproj(addProj)">
										<strong>add Project</strong>
									</a>  
								</div>											
							</div>
						</div>
					</div>
      </div>
  </div>
</div>
</template>

<script>
import task from './componants/task'

export default {
  name: 'project',
  props: ['PageName'],
  components: {
    task
  },
  data () {
    return {
      ProjectList:[],
      addProj:{Type:'External'},
      edProj:{Type:'External'},
      ty:0,
      pstatus:[
        ['Open','Progress','Win','Lost','Cancel'],
        ['Open','Progress','Cancel'] 
      ]
    }
  },
  methods: {
      Addproj:function(Proj){
        var API = window.API
        var API_Add_proj = API.PROJECT 
        var UID = window.localStorage.getItem('UID')
        Proj.modify_date = Date.now()
        Proj.Create_date = Date.now()
        Proj.UID = UID
        if(this.edProj.Type=="External"){
          this.ty=0
        }else {this.ty=1}
        this.$http.post(API_Add_proj,Proj).then((response) => {
       location.reload()
          this.addProj= {}
        }, (response) => {
          //error
          alert(response.body.error.message)
        });
      },
      Updateproj:function(Proj){
        var API = window.API
        var API_Update_By_Proj_Id = API.PROJECT + '/' + Proj.id
        Proj.modify_date = Date.now()
        this.$http.put(API_Update_By_Proj_Id,Proj).then((response) => {
                //success
          //alert('Update:'+ response.body.Job_Header+'On'+response.body.modify_date)
          this.getProject();
          this.edProj= {}
          }, (response) => {
          //error
          alert(response.body.error.message)
          });
  	},
      ProjEdit:function(thisProject){
        this.edProj=thisProject
        if(this.edProj.Type=="External"){
          this.ty=0
        }else {this.ty=1}
      },
      Projtypechange: function(){
        if(this.edProj.Type=="External"){
          this.ty=0
        }else {this.ty=1}
      },
      getProject : function () {        
        var API = window.API
        var UID = window.localStorage.getItem('UID')
        var API_Project_by_UID = API.PROJECT + '?filter[where][UID]='+UID+'&filter[order]=id%20DESC'
        this.$http.get(API_Project_by_UID).then((response) => {
          //success
          this.ProjectList = response.body
        }, (response) => {
          //error
          alert(response.body.error.message)
        });
         
      }
  },
  created: function () {
      this.getProject();
  },
  mounted: function () {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
