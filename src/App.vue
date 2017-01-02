<template>
    <div>
        <router-view></router-view>
        <footer-component></footer-component>
    </div>
</template>

<script>
import FooterComponent from 'components/footer.vue';

export default {
    components: {
        FooterComponent
    },
}

</script>