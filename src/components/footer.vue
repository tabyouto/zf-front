<template>
    <div class="footer">
        <p class="copyright"> &copy;   {{myDate}} 技术支持 <a :href="website" target="_blank">noxxxx</a></p>
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
                website: 'https://www.noxxxx.com',
                myDate: (new Date()).getFullYear(),

            }
        },
        components:{
        }

    }
</script>
