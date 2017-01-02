<template>
    <div class="footer">
        <p class="copyright"> &copy;   {{myDate}} 技术支持 <a :href="website" target="__blank">Chiem的屋顶</a></p>
    </div>
</template>
<style lang='less'>
    .footer {
        position: absolute;
        width: 100%;
        height: 32px;
        bottom: 0;
        p {
            text-align: center;
            margin: 0;
            font-size: 12px;
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                website: 'http://baidu.com',
                myDate: (new Date()).getFullYear(),

            }
        },
        components:{
        }

    }
</script>