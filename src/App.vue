<template>
  <table-component></table-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import tableComponent from "@/components/table-component/table-component.vue";
export default defineComponent({
  name: 'App',
    components:{
      tableComponent
    }
});
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
  width: calc(100vw - 20px)
  height: 100vh
#app
  font-family: Roboto
  width: 100%
  height: 100%
  margin: 0
  padding: 0
*
  box-sizing: border-box

</style>
