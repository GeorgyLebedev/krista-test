import {defineComponent, ref, watch} from "vue";
export default defineComponent({
    name: "error-component",
    props:{
        message:{
            type:String,
            required: true
        }
    },
    emits:['clearError']
})
