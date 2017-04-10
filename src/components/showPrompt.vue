<!--<template>-->
  <!--&lt;!&ndash;<div class="notification">&ndash;&gt;-->
  <!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--</template>-->
<style scoped>
  span.notification {
    color: #fff;
    display: block;
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    transform: translate3d(0,-60px,0);
    width: 49px;
    border-bottom: none;
    padding: 2px 2px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    /*transition: 0.5s ease all;*/
  }
</style>
<script>
  export default{
    name: 'notification',
    render(h) {
      return h('span',
        {
          class: [this.type,'notification','text-center']
        }, this.$slots.default)
    },
    props: {
      type: {
        validator: function(typeStr){
          if(typeof typeStr === 'string'){
            switch(typeStr){
              case 'pending':
              case 'cancel':
              case 'success':
              case 'warning':
              case 'danger':
              case 'info': return true;
              default: return false;
            }
          } else return false;
        }
      }
    }
  }
</script>
