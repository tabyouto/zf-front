<template>
    <div class="home-part">
        <div class="head-wrap">
            <div class="head">
                <h1>
                    <a class="logo" href="javascript:;">oxox</a>
                </h1>

                <div class="nav pull-right">
                    <ul>
                        <li><router-link v-bind:to="{ name: 'scoreSearch'}">查询绩点</router-link></li>
                        <li><router-link v-bind:to="{ name: 'scheduleSearch'}">查询课表</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="notification">
            <i class="iconFont">&#xe7ef;</i> <span class="notification-content">如有bug请提交</span>
        </div>
        <router-view></router-view>

    </div>
</template>
<script>
    import {fetchItemByType} from '../../common/commonAjax.js';
    import LoadingComponent from '../../components/loading.vue';
    import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                loadingFlag: false
            }
        },
        computed: {
            ...mapGetters({
                isLogin: 'getLogin'
            }),
        },
        components: {
            LoadingComponent
        },
        methods: {
        },
        created() {
          if(this.$route.path == '/') {
            this.$router.push({path:'/home/ranking'})
          }
        }
    }
</script>
