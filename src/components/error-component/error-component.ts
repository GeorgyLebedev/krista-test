import {computed, defineComponent, ref, watch} from "vue";
export default defineComponent({
    name: "error-component",
    props:{
        message:{
            type:String,
            required: true
        }
    },
    setup(props){
        const showError=ref(false)
        const expectedInput=computed(()=>{
            return props.message.split('|')[1]?? ""
        })
        const messageText=computed(()=>{
            return props.message.split('|')[0]?? props.message
        })
        watch(() => props.message, () => {
            showError.value=true
        });
        return{
            showError,
            expectedInput,
            messageText
        }
    }
})
