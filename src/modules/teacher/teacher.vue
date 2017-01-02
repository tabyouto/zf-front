<template>
    <div class="col-md-6 coming">
       <div class="content text-center"><p>coming soon</p></div>

    </div>
</template>
<style scoped>
    .coming {

    }
    div.content {
     display: flex;
        align-items: center;

        height: 400px;
        justify-content: center;
        width: 100%;
        border: 3px dashed #ddd;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
        }

    }
</script>
