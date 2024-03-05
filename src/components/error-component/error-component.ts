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
        const showError=ref(false) //флаг скрытия/отображения ошибок
        const expectedInput=computed(()=>{ //примерное ожидаемое значение поля
            return props.message.split('|')[1]?? ""
        })
        const messageText=computed(()=>{ //основной текст ошибки
            return props.message.split('|')[0]?? props.message
        })
        watch(() => props.message, () => {
            showError.value=true //если текст ошибки обновляется, выводим уведомление на экран
        });
        return{
            showError,
            expectedInput,
            messageText
        }
    }
})
