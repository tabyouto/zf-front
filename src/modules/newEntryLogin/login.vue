<template>
  <div class="form-part">
    <div class="form-wrap">
      <h1>登录</h1>
      <form class="form">
        <div class="form-group">
          <label for="class-number">学号</label>
          <input class="form-control" id="class-number" type="tel" v-model="classNumber">
        </div>
        <div class="form-group">
          <label for="class-passwd">密码</label>
          <input class="form-control" id="class-passwd" type="password" v-model="classPasswd">
        </div>
        <div class="form-group">
          <button class="btn btn-default btn-primary col-md-12 pull-right" type="button" v-on:click="sub"
                  v-bind:disabled="!classNumber || !classPasswd">查询
          </button>
        </div>
      </form>
    </div>
    <loading-component v-if="editFlag"></loading-component>
  </div>
</template>
<script>
  import {login} from '../../common/commonAjax.js';
  import LoadingComponent from '../../components/loading.vue';
  import {mapActions,mapGetters} from 'vuex';
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
    computed: {
    },
    methods: {
      sub: function () {
        this.editFlag = true;
        var that = this;
        var _type = localStorage.getItem('type');
        var _token = sessionStorage.getItem('token');
        localStorage.setItem('userNumber',this.classNumber);
        localStorage.setItem('classPasswd',this.classPasswd);
        if(_type) {
          login({
            type: _type || 2,
            class_number: this.classNumber,
            class_passwd: this.classPasswd,
            token: _token,
          }).then(function (res) {
            if (res && _type == 2) {
              localStorage.setItem('scheduleInfo',JSON.stringify(res));
              that.$router.replace({path: '/schedule'})
            }
            if(res && _type == 1) {
              sessionStorage.setItem('allScore',JSON.stringify(res));
              that.$router.replace({path: '/score'});
            }
            that.editFlag = false;
          });
        }else{
          that.$router.replace({name: 'index'});
        }
      },
    },
    created(){
      if(!localStorage.getItem('type') || !sessionStorage.getItem('token')) {
          this.$router.replace({name: 'index'});
      }
    }
  }
</script>
