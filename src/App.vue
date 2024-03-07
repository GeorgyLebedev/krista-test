<template>
    <error-component :message="error">
    </error-component>
    <table-component
        :tableData="tableData"
        :tableHeaders="tableHeaders"
        :invalidField="invalidField"
        :successOperation="successOperation"
        :serverUnavailable="serverUnavailable"
        @addRow="insertTableData"
        @updateRow="updateTableData"
        @deleteRow="deleteTableData"
        @clearError="clearError"
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
    setup(){
        const successOperation=ref(undefined as undefined|boolean)
        const error=ref("")
        const tableData=ref(undefined as undefined|Array<Client>)
        onMounted(async () => {
            await selectTableData()
        })
        const clearError=()=>error.value=""
        const serverUnavailable=computed(()=>error.value==='Network Error')
        const tableHeaders=computed(() =>{
            return tableData.value?.length? Object.keys(tableData.value[0]) :Object.keys(new Client())
        })
        const invalidField = computed(() => { //Вычисляемое свойство с именем некорректного поля
            if (!error.value.length) return ""
            for (const key of Object.keys(new Client()))
                if (error.value.includes(key))
                    return key
            return ""
        })
        const selectTableData=async ()=>{
            try {
                tableData.value = await getRequest()
            }
            catch (e:any){
                error.value=e.message
            }
        }
        const updateTableData=async (updatedData: any)=>{
            try{
                successOperation.value=undefined
                successOperation.value=await patchRequest(updatedData)??false
                await selectTableData()
            }
            catch (e:any){
                error.value=e.message
            }
        }
        const insertTableData=async (newData:any)=>{
            try{
                successOperation.value=undefined
                successOperation.value=await postRequest(newData)??false
                await selectTableData()
            }
            catch (e:any){
                error.value=e.message
            }
        }
        const deleteTableData=async (id:number)=> {
        try{
            successOperation.value=undefined
            successOperation.value=await deleteRequest(id)??false
            await selectTableData()
        }
        catch (e:any) {
            error.value=e.message
        }
        }
        return{
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
