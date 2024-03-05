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
            const elementWidth = document.getElementById('dataTable')!.offsetWidth;
            document.getElementById('dataTable')!.style.maxWidth = `${elementWidth}px`;
            document.getElementById('dataTable')!.style.minWidth = `${elementWidth}px`;
        })
        const headers: Array<string> = Object.keys(new Client())
        const clients: Ref<Array<Client> | []|undefined> = ref(undefined)
        const clientInEdit: Ref<Client | null> = ref(null)
        const newClient: Ref<Client | null> = ref(null)
        const error: Ref<string> = ref("")
        const invalidField = computed(() => {
            if (!error.value.length) return ""
            for (const key of Object.keys(new Client()))
                if (error.value.includes(key))
                    return key
            return ""
        })
        const setClientInEdit = (client: Client) =>
            clientInEdit.value = Object.assign({}, client)
        const createNewClient = () =>
            newClient.value = new Client()

        const getClients = async () => {
            try {
                error.value = ""
                clients.value = await getRequest()
            } catch (e: any) {
                error.value = e.message
            }
        }
        const updateClient = async () => {
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
        const addClient = async () => {
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
        const deleteClient = async (id: number) => {
            try {
                if (!confirm("Вы уверены что хотите удалить строку с id: " + id)) return
                error.value = ""
                await deleteRequest(id)
                await getClients()
            } catch (e: any) {
                error.value = e.message
            }
        }
        const cancelChanges = () => {
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
