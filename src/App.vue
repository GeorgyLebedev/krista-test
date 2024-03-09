<template>
    <error-component :message="error">
    </error-component>
    <table-component
	    :invalidField="invalidField"
	    :serverUnavailable="serverUnavailable"
	    :successOperation="successOperation"
	    :tableData="tableData"
	    :tableHeaders="tableHeaders"
	    @addRow="insertTableData"
	    @clearError="clearError"
	    @deleteRow="deleteTableData"
	    @updateRow="updateTableData"
    >
    </table-component>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import tableComponent from "@/components/table-component/table-component.vue";
import errorComponent from "@/components/error-component/error-component.vue";
import {getRequest, postRequest, patchRequest, deleteRequest} from "@/modules/axiosModule";
import Client from "@/types/Client";

export default defineComponent({
    name: 'App',
    components: {
        tableComponent,
        errorComponent
    },
    setup() {
        const operationResult = ref(undefined as any)
        const error = ref("")
        const tableData = ref(undefined as undefined | Array<Client>)
        onMounted(async () => {
            await selectTableData()
        })
        const clearError = () => error.value = ""
				const successOperation=computed(()=>Boolean(operationResult.value))
        const serverUnavailable = computed(() => error.value === 'Network Error')
        const tableHeaders = computed(() => {
            return tableData.value?.length ? Object.keys(tableData.value[0]) : Object.keys(new Client())
        })
        const invalidField = computed(() => { //Вычисляемое свойство с именем некорректного поля
            if (!error.value.length) return ""
            for (const key of Object.keys(new Client()))
                if (error.value.includes(key))
                    return key
            return ""
        })
        const selectTableData = async () => {
            try {
                tableData.value = await getRequest()
            } catch (e: any) {
                error.value = e.message
            }
        }
        const updateTableData = async (updatedData: any) => {
            try {
                operationResult.value = undefined
                operationResult.value = await patchRequest(updatedData)
								if (operationResult.value){
									const index = tableData.value?.findIndex(obj => obj.id === updatedData.id) as number
									(tableData.value as Array<Client>)[index]=updatedData
								}
            } catch (e: any) {
                error.value = e.message
            }
        }
        const insertTableData = async (newData: any) => {
            try {
                operationResult.value = undefined
                operationResult.value = await postRequest(newData)
                if (operationResult.value) {
									tableData.value?.push(operationResult.value)
									tableData.value?.sort((a, b) => {
										return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
									});
								}
            } catch (e: any) {
                error.value = e.message
            }
        }
        const deleteTableData = async (id: number) => {
            try {
                operationResult.value = undefined
                operationResult.value = await deleteRequest(id)
                if (operationResult.value) {
                    const index = tableData.value?.findIndex(obj => obj.id === id);
                    tableData.value?.splice(index as number, 1);
                }
            } catch (e: any) {
                error.value = e.message
            }
        }
        return {
            error,
            tableData,
            tableHeaders,
            invalidField,
						successOperation,
            serverUnavailable,
            selectTableData,
            insertTableData,
            updateTableData,
            deleteTableData,
            clearError
        }
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
