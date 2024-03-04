import {computed, defineComponent, Ref, ref, onMounted} from "vue";
import Client from "@/types/Client";
import {getRequest, postRequest, patchRequest, deleteRequest} from "@/modules/axiosModule";
import errorComponent from "@/components/error-component/error-component.vue";
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
        const headers = computed(() => Object.keys(new Client()))
        const clients: Ref<Array<Client> | []> = ref([])
        const clientInEdit: Ref<Client | null> = ref(null)
        const newClient: Ref<Client | null> = ref(null)
        const error=ref("")

        const invalidField = computed(()=>{
            return error.value.split(':')[0]
        })
        const clearError=()=>error.value=""
        const setClientInEdit = (client: Client) =>
            clientInEdit.value = client
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
                await patchRequest(clientInEdit.value)
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
                console.log(e)
                error.value=e.message
            }
        }
        const deleteClient = async (id: number) => {
            try {
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
            setClientInEdit,
            createNewClient,
            cancelChanges,
            deleteClient,
            updateClient,
            addClient
        }
    }

})
