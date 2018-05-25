<template>
  <div :id="'faq'+Project.id" class="panel-collapse collapse faq-answer">
    <div class="row" v-for="task in tasklists">
      <div class="col-md-4">
        {{task.Job_Header}}
      </div>
      <div class="col-md-5">
        {{task.Job_detail}}
      </div>
      <div class="col-md-2">
       <span class="tag-item"> {{task.Name_Surname}} </span>
      </div>
      <div class="col-md-1">
        <a type="button" @click="removetaskfromproj(task)">
							<i class="fa fa-times-circle-o"></i> 
				</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2 text-right">
        <hr>
        <a href="#" class="btn btn-white btn-sm" v-if="tasklists.length==0" @click="removeproj(Project.id)"><i class="fa fa-times"></i> Delete </a>
      </div>
    </div>
    
  </div>
</template>

<script>
// import tableData from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'task',
  props: ['Project'],
  components: {},
  data () {
    return {
      tasklists: {}
    }
  },
  methods: {
      removeproj:function(projid){
      var API = window.API
              var API_Remove_By_Proj_Id = API.PROJECT + '/' + projid
              //Proj.modify_date = Date.now()
              this.$http.delete(API_Remove_By_Proj_Id).then((response) => {
                      //success
                //alert('Update:'+ response.body.Job_Header+'On'+response.body.modify_date)
                location.reload()
                }, (response) => {
                //error
                alert(response.body.error.message)
                });
          },
      removetaskfromproj:function(mytask){
      var API = window.API
          var API_Update_By_Task_Id = API.TIMESHEET + '/' + mytask.id
          mytask.modify_date = Date.now()
          mytask.project=''
          mytask.Projid=''
          this.$http.put(API_Update_By_Task_Id,mytask).then((response) => {
                  //success
            //alert('Update:'+ response.body.Job_Header+'On'+response.body.modify_date)
            this.getTimesheet();
            //this.edTimesheet= {}
            }, (response) => {
            //error
            alert(response.body.error.message)
            });
        },
      getTimesheet: function () {
        var API = window.API
        var API_Timesheet_By_project_ID = API.TIMESHEET + '?filter[where][Projid]='+ this.Project.id 
        this.$http.get(API_Timesheet_By_project_ID).then((response) => {
          //success
          this.tasklists = response.body
        }, (response) => {

          //error
          alert(response.body.error.message)
        });
      }
  },
  created: function () {
      this.getTimesheet();
  },
  mounted: function () {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
