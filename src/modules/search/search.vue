<template>
  <div class="form-part">
    <div class="form-wrap">
      <h1>Just Search</h1>
      <form class="form">
        <div class="form-group">
          <label for="class-number">学号</label>
          <input class="form-control" id="class-number" type="tel"  v-model="classNumber">
        </div>
        <div class="form-group">
          <label for="class-passwd">密码</label>
          <input class="form-control" id="class-passwd" type="password" v-model="classPasswd">
        </div>
        <div class="form-group">
          <button class="btn btn-default btn-primary col-md-12 pull-right" type="button" v-on:click="test" v-bind:disabled="!classNumber || !classPasswd">查询</button>
        </div>
      </form>
    </div>
  <loading-component v-if="editFlag"></loading-component>
  </div>
</template>
<script>
  import {fetchItemByType} from '../../common/commonAjax.js';
  import LoadingComponent from '../../components/loading.vue';

  export default{
    data(){
      return {
        classNumber: '',
        classPasswd: '',
        editFlag: false
      }
    },
    components: {
      'loading-component': LoadingComponent
    },
    methods: {
      test: function() {
        this.editFlag = true;
        var that = this;
        fetchItemByType({
          class_number: this.classNumber,
          class_passwd: this.classPasswd
        }).then(function(res) {
          that.editFlag = false;
        });
      }
    }
  }
</script>
