import {computed, defineComponent, Ref, ref, onMounted} from "vue";
import Client from "@/types/Client";
import {getRequest, postRequest, patchRequest, deleteRequest} from "@/modules/axiosModule";
import errorComponent from "@/components/error-component/error-component.vue";
import compareObjects from "@/helpers/compareObjects";
export default defineComponent({
    name: "tableComponent",
    components:{
        errorComponent
    },
    setup() {
        onMounted(async () => {
            const elementWidth = document.getElementById('dataTable')!.offsetWidth;
            document.getElementById('dataTable')!.style.maxWidth = `${elementWidth}px`;
            document.getElementById('dataTable')!.style.minWidth = `${elementWidth}px`;
            await getClients()
        })
        const headers:Array<string> = Object.keys(new Client())
        const clients: Ref<Array<Client> | []> = ref([])
        const clientInEdit: Ref<Client | null> = ref(null)
        const newClient: Ref<Client | null> = ref(null)
        const updatedData:Ref<any>=ref({})
        const error:Ref<string>=ref("")

        const invalidField = computed(()=>{
            if(!error.value.length) return ""
            for(const key of Object.keys(new Client()))
                if(error.value.includes(key))
                   return key
            return ""
        })
        const clearError=()=>error.value=""
        const setClientInEdit = (client: Client) =>
            clientInEdit.value = Object.assign({}, client)
        const createNewClient = () =>
            newClient.value = new Client()

        const getClients = async () => {
            try {
                clearError()
                clients.value = await getRequest()
            } catch (e: any) {
                error.value=e.message
            }
        }
        const updateClient = async () => {
            try {
                clearError()
                if (clientInEdit.value === null) return
                await patchRequest(updatedData.value, Number(clientInEdit.value.id))
                await getClients()
                clientInEdit.value=null
            } catch (e: any) {
                error.value=e.message
            }
        }
        const addClient = async () => {
            try {
                clearError()
                if (newClient.value === null) return
                await postRequest(newClient.value)
                await getClients()
                newClient.value=null
            } catch (e: any) {
                error.value=e.message
            }
        }
        const deleteClient = async (id: number) => {
            try {
                if(!confirm("Вы уверены что хотите удалить строку с id: "+id)) return
                clearError()
                await deleteRequest(id)
                await getClients()
            } catch (e: any) {
                error.value=e.message
            }
        }
        const cancelChanges = () => {
            clearError()
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
            updatedData,
            setClientInEdit,
            createNewClient,
            cancelChanges,
            deleteClient,
            updateClient,
            addClient,
            compareObjects,
        }
    }

})
