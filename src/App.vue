<template>
    <div>
        <router-view></router-view>
        <footer-component></footer-component>
    </div>
</template>

<script>
import FooterComponent from 'components/footer.vue';
import {fetchToken} from './common/commonAjax';

export default {
    components: {
        FooterComponent
    },
    created() {
      if(!sessionStorage.getItem('token')) {
        fetchToken({}).then(function (res) {
          if(res) {
            sessionStorage.setItem('token',res.token);
          }
        });
      }
    }
}

</script>
