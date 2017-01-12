<template>
  <div class="form-part">
    <div class="form-wrap">
      <h1>Just Search</h1>
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
        isLogin: 'getLogin'
      }),
    },
    methods: {
      sub: function () {
        this.editFlag = true;
        var that = this;
        var _type = '';
        var currentItem = sessionStorage.getItem('currentFrom');
        if (currentItem) {
          currentItem == '/home/score' ? _type = 'score' : _type = 'schedule';
        }
        login({
          type: _type || undefined,
          class_number: this.classNumber,
          class_passwd: this.classPasswd
        }).then(function (res) {
          console.log(res);
          if (res) {
            that.changeLogin(true);
            sessionStorage.setItem('isLogin', true);
            sessionStorage.setItem('scheduleInfo', JSON.stringify(res));
            sessionStorage.setItem('userInfo', JSON.stringify({'class_number':that.classNumber,'class_passwd':that.classPasswd}));
            sessionStorage.removeItem('currentFrom');
            that.$router.replace({path: '/home/schedule'})
          } else {
  //          alert('出错了，请重试');
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
