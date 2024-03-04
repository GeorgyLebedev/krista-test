import {computed, defineComponent, ref, watch} from "vue";
export default defineComponent({
    name: "error-component",
    props:{
        message:{
            type:String,
            required: true
        }
    },
    emits:['clearError'],
    setup(props){
        const expectedInput=computed(()=>{
            return props.message.split('|')[1]?? ""
        })
        const messageText=computed(()=>{
            return props.message.split('|')[0]?? props.message
        })
        return{
            expectedInput,
            messageText
        }
    }
})
