<template>
  <div>skadfhskdhfjk</div>
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
