<template>
    <div class="home-part">
        <div class="head-wrap">
            <div class="head">
                <h1>
                    <router-link v-bind:to="{name: 'ranking'}"></router-link>
                </h1>

                <div class="nav pull-right">
                    <ul>
                        <li><router-link v-bind:to="{ name: 'scoreSearch', activeClass:'active',exact: true }">种子搜索</router-link></li>
                        <li><router-link v-bind:to="{ name: 'scoreSearch', activeClass:'active'}">查询绩点</router-link></li>
                        <li><router-link v-bind:to="{ name: 'scheduleSearch', activeClass:'active'}">查询课表</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content-container">
            <router-view></router-view>
        </div>

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
