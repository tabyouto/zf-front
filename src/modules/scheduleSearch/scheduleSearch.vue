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
        <label for="term" class="control-label col-md-1">学年</label>
        <div class="col-md-2">
          <select v-model="termSelected" id="term" class="form-control">
            <option v-for="option in termOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <label class="control-label col-md-1">姓名:</label>
        <div class="col-md-2">
          <p class="form-control-static">{{name}}</p>
          <button class="btn btn-default btn-primary pull-right" type="button" v-on:click="fetchSpecificSchedule">查询</button>
        </div>
      </div>
    </form>
    <div class="clearfix"></div>
    <div class="schedule-wrap">
      <table v-html="scheduleHtml"></table>
    </div>
  </div>
</template>
<script>
  import {fetchSpecificSchedule} from '../../common/commonAjax.js';
  export default{
    data(){
      return {
        yearSelected: '', //学年
        yearOptions: '',
        termSelected: '1', //学期
        termOptions: [{'text':1,'value':1},{'text':2,'value':2}],
        scheduleHtml: '',
        name: ''
      }
    },
    components: {},
    computed: {

    },
    created () {
      this.setInitData();
    },
    methods: {
      setInitData: function() {
        var _temp =JSON.parse(sessionStorage.getItem('scheduleInfo'));
        this.yearSelected = _temp.yearOptions[0]['value'];
        this.yearOptions = _temp.yearOptions;
        this.scheduleHtml = _temp.tableHtml;
        this.name = _temp.name;
      },
      fetchSpecificSchedule: function() {
        var _self = this;
        fetchSpecificSchedule({
          year: this.yearSelected,
          termSelected: this.termSelected
        }).then(function(res) {
            _self.scheduleHtml = res.tableHtml;
        });
      },
    }
  }

</script>
