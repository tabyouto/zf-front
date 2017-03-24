<template>
    <div class="home-part">
      <div class="nav pull-right">
        <!--<ul>-->
          <!--<li><router-link v-bind:to="{ name: 'scoreSearch', activeClass:'active'}">查询绩点</router-link></li>-->
          <!--<li><router-link v-bind:to="{ name: 'scheduleSearch', activeClass:'active'}">查询课表</router-link></li>-->
        <!--</ul>-->

      </div>

      <!--<div class="nav newEntry">-->
        <!--<button class="btn btn-default">查绩点</button>-->
      <!--</div>-->
      <div class="col-md-6 left-score">
        <a v-on:click="checkIsLogin(1)">查绩点</a>
      </div>
      <div class="col-md-6 right-schedule">
        <a v-on:click="checkIsLogin(2)">查课表</a>
      </div>

      <!--<div class="form-wrap">-->
        <!--<h1>登录</h1>-->
        <!--<form class="form">-->
          <!--<div class="form-group">-->
            <!--<label for="class-number">学号</label>-->
            <!--<input class="form-control" id="class-number" type="tel" v-model="classNumber">-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<label for="class-passwd">密码</label>-->
            <!--<input class="form-control" id="class-passwd" type="password" v-model="classPasswd">-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<button class="btn btn-default btn-primary col-md-12 pull-right" type="button" v-on:click="sub"-->
                    <!--v-bind:disabled="!classNumber || !classPasswd">查询-->
            <!--</button>-->
          <!--</div>-->
        <!--</form>-->
      <!--</div>-->

    </div>
</template>
<script>
//    import {fetchItemByType} from '../../common/commonAjax.js';
    import LoadingComponent from '../../components/loading.vue';
//    import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
              classNumber: '',
              classPasswd: '',
                loadingFlag: false
            }
        },
        computed: {
//            ...mapGetters({
//                isLogin: 'getLogin'
//            }),
        },
        components: {
            LoadingComponent
        },
        methods: {
          sub: function() {

          },
          //跳转到登录页
          checkIsLogin: function(type) {
            localStorage.setItem('type',type);
            if(localStorage.getItem('isLogin')==true) {

            }else {
              this.$router.push({path:'/login'})
            }
          }
        },
        created() {
//          if(this.$route.path == '/') {
//            this.$router.push({path:'/home/ranking'})
//          }
        }
    }
</script>
