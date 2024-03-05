import {computed, defineComponent, Ref, ref, onMounted} from "vue";
import Client from "@/types/Client";
import {getRequest, postRequest, patchRequest, deleteRequest} from "@/modules/axiosModule";
import errorComponent from "@/components/error-component/error-component.vue";

export default defineComponent({
    name: "tableComponent",
    components: {
        errorComponent
    },
    setup() {
        onMounted(async () => {
            await getClients()
            if(!clients.value?.length) return
            const elementWidth = document.getElementById('dataTable')!.offsetWidth; //настраиваем статичную ширину таблицы
            document.getElementById('dataTable')!.style.maxWidth = `${elementWidth}px`;
            document.getElementById('dataTable')!.style.minWidth = `${elementWidth}px`;
        })
        const headers: Array<string> = Object.keys(new Client()) //Список заголовков таблицы
        const clients: Ref<Array<Client> | []|undefined> = ref(undefined) //Массив данных о клиентах
        const clientInEdit: Ref<Client | null> = ref(null) //Редактируемые данные клиента
        const newClient: Ref<Client | null> = ref(null) //Данные нового клиента
        const error: Ref<string> = ref("") //Сообщение об ошибке
        const invalidField = computed(() => { //Вычисляемое свойство с именем некорректного поля
            if (!error.value.length) return ""
            for (const key of Object.keys(new Client()))
                if (error.value.includes(key))
                    return key
            return ""
        })
        const setClientInEdit = (client: Client) => //Установка значений для полей ввода при редактировании
            clientInEdit.value = Object.assign({}, client)
        const createNewClient = () =>
            newClient.value = new Client()

        const getClients = async () => { //Запрос на получение списка клиентов
            try {
                error.value = ""
                clients.value = await getRequest()
            } catch (e: any) {
                error.value = e.message
            }
        }
        const updateClient = async () => { //Запрос на обновление данных клиента
            try {
                error.value = ""
                if (clientInEdit.value === null) return
                await patchRequest(clientInEdit.value)
                await getClients()
                clientInEdit.value = null
            } catch (e: any) {
                error.value = e.message
            }
        }
        const addClient = async () => { //Запрос на добавление нового клиента
            try {
                error.value = ""
                if (newClient.value === null) return
                await postRequest(newClient.value)
                await getClients()
                newClient.value = null
            } catch (e: any) {
                error.value = e.message
            }
        }
        const deleteClient = async (id: number) => {  //Запрос на удаление клиента
            try {
                if (!confirm("Вы уверены что хотите удалить строку с id: " + id)) return
                error.value = ""
                await deleteRequest(id)
                await getClients()
            } catch (e: any) {
                error.value = e.message
            }
        }
        const cancelChanges = () => { //Функция отмены изменений
            error.value = ""
            clientInEdit.value = null
            newClient.value = null
        }
        return {
            error,
            clients,
            headers,
            clientInEdit,
            newClient,
            invalidField,
            setClientInEdit,
            createNewClient,
            cancelChanges,
            deleteClient,
            updateClient,
            addClient,
        }
    }

})
