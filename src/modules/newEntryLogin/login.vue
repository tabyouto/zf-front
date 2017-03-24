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
      ...mapGetters({
        isLogin: 'getLogin',
        socketInfo: 'getSocketInfo'
      }),
    },
    methods: {
      sub: function () {
        this.editFlag = true;
        var that = this;
        localStorage.setItem('userNumber',classNumber);
        localStorage.setItem('classPasswd',classPasswd);
//        if(!that.socketInfo.sid) {
//          alert('网络异常，请刷新页面');
//          return;
//        }
        console.log(that.socketInfo.clientCreateId);
        login({
          type: _type || undefined,
          class_number: this.classNumber,
          class_passwd: this.classPasswd,
          sid: that.socketInfo.sid,
          clientId: that.socketInfo.clientCreateId
        }).then(function (res) {
          if (res && _type == 'schedule') {
            that.$router.replace({path: '/home/schedule'})
          }
          if(res && _type == 'score') {
            alert('查成绩');
            that.changeLogin(true);
            that.$router.replace({path: '/home/schedule'})
          }
          that.editFlag = false;
        });
      },
      ...
        mapActions([
          'changeLogin'
        ]),
      },
    created(){
  //    console.log('login warp'+this.isLogin);
  //      this.isLogin==true && this.$router.replace({path: '/home/schedule'});
    }
  }
</script>
