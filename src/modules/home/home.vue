<template>
    <div class="home-part">
        <div class="head">
            <a class="">oxox</a>
        </div>
    </div>
</template>
<script>
    import {fetchItemByType} from '../../common/commonAjax.js';
    import LoadingComponent from '../../components/loading.vue';

    export default{
        data(){
            return {

                loadingFlag: false
            }
        },
        components: {
            'loading-component': LoadingComponent
        },
        methods: {}
    }
</script>
