<template>
    <div class="ranking col-md-6">
        <h2 class="ranking-title text-center">绩点榜单</h2>
        <ul>
            <li v-for="item in lists">
                <div class="avatar"><img
                        src="https://sfault-avatar.b0.upaiyun.com/222/314/2223148120-57c501e3c6b00_big64"></div>
                <div class="item-wrap">
                    <p>1. {{item.academy}} <span class="score">{{item.score}}</span></p>
                    <div class="progress">
                        <transition v-bind:css="false" v-on:appear="progressing">

                            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                                 aria-valuemax="100" style="width: 0%;" v-bind:data-progress="item.score">
                            </div>
                        </transition>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                lists: []
            }
        },
        components:{
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchScoreList();

          },
        methods: {
            progressing: function(el) {
                var random = Math.random();
                console.log(el.getAttribute('data-progress'));
                setTimeout(function() {
                    el.style.setProperty('width',el.getAttribute('data-progress') * 20 + '%');

                },100);
            },
            fetchScoreList: function() {
                var that = this;
                setTimeout(function() {
                    that.lists = [{'academy': '信息科学与工程学院','score': '0.3'},
                                    {'academy': '环化学院','score': '4.4'},
                                    {'academy': '材料学院','score': '4.6'},
                                    {'academy': '经管学院','score': '3.4'},
                                    {'academy': '装备学院','score': '1.8'}]
                },1000);





            }
        }
    }

</script>
