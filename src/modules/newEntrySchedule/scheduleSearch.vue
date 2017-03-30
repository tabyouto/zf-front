<template>
  <div class="schedule-wrap">
    <form class="form-horizontal" role="form">
      <div class="form-group">
        <label for="year" class="control-label col-md-1">学年</label>
        <div class="col-md-2">
          <select v-model="yearSelected" id="year" class="form-control">
            <option v-for="option in yearOptions" v-bind:value="option.value" >
              {{ option.text }}
            </option>
          </select>
        </div>
        <label for="term" class="control-label col-md-1">学期</label>
        <div class="col-md-2">
          <select v-model="termSelected" id="term" class="form-control">
            <option v-for="option in termOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="control-label col-md-1">姓名:</label>
          <span class="form-control-static">{{name}}</span>
          <button class="btn btn-default btn-primary pull-right" type="button" v-on:click="fetchSpecificSchedule">查询</button>
        </div>
      </div>
    </form>
    <div class="clearfix"></div>
    <div class="schedule-wrap">
      <table v-html="scheduleHtml"></table>
    </div>
    <loading-component v-if="editFlag"></loading-component>
  </div>
</template>
<script>
  import {fetchSpecificSchedule} from '../../common/commonAjax.js';
  import LoadingComponent from '../../components/loading.vue';
  export default{
    data(){
      return {
        yearSelected: '', //学年
        yearOptions: '',
        termSelected: '1', //学期
        termOptions: [{'text':1,'value':1},{'text':2,'value':2}],
        scheduleHtml: '',
        name: '',
        editFlag: false
      }
    },
    components: {
      'loading-component': LoadingComponent
    },
    computed: {

    },
    created () {
      this.setInitData();
    },
    methods: {
      setInitData: function() {
        var _temp =JSON.parse(localStorage.getItem('scheduleInfo'));
        this.yearSelected = localStorage.getItem('year') ||_temp.yearOptions[0]['value'];
        this.yearOptions = _temp.yearOptions;
        this.termSelected = localStorage.getItem('termSelected') || 1;
        this.scheduleHtml = localStorage.getItem('tableInfo') ? JSON.parse(localStorage.getItem('tableInfo')).tableHtml :  _temp.tableHtml;
        this.name = _temp.name;
      },
      fetchSpecificSchedule: function() {
        var _self = this;
        this.editFlag = true;
        fetchSpecificSchedule({
          year: this.yearSelected,
          termSelected: this.termSelected,
          class_number: localStorage.getItem('userNumber'),
          class_passwd: localStorage.getItem('classPasswd'),
        }).then(function(res) {
          if(res) {
            localStorage.setItem('year',_self.yearSelected);
            localStorage.setItem('termSelected',_self.termSelected);
            localStorage.setItem('tableInfo',JSON.stringify(res));
            _self.scheduleHtml = res.tableHtml;
            _self.editFlag = false;
          }
        }).then(function() {
          _self.editFlag = false;
        });
      },
    }
  }

</script>
