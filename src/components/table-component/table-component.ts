import {defineComponent, Ref, ref, watch} from "vue";
import Client from "@/types/Client";

export default defineComponent({
    name: "tableComponent",
    props: {
        successOperation: Boolean,
        serverUnavailable: Boolean,
        tableData: Array,
        tableHeaders: Array as () => Array<string>,
        invalidField: String
    },
    emits: ['addRow', 'updateRow', 'deleteRow' ,'clearError'],
    setup(props, {emit}) {
        const rowInEditData: Ref<Client | null> = ref(null) //Редактируемые данные клиента
        const newRowData: Ref<Client | null> = ref(null) //Данные нового клиента
        watch(() => props.successOperation, (value) => { //если операция с данными выполнена, очищаем объекты и скрываем инпуты
            if (value)
                clearInputs()
        });
        const setRowInEdit = (client: Client) => //Установка значений для полей ввода при редактировании
            rowInEditData.value = Object.assign({}, client)
        const createNewRow = () =>
            newRowData.value = new Client()
        const setFixedTableWidth = () => { //настраиваем статичную ширину таблицы
            const table = document.getElementById('dataTable')
            if (!table) return
            table.style.maxWidth = `${table.offsetWidth}px`;
            table.style.minWidth = `${table.offsetWidth}px`;
        }
        const updateRow = async () => { //Запрос на обновление данных клиента
            emit('updateRow', rowInEditData.value)
        }

        const addRow = async () => { //Запрос на добавление нового клиента
            emit('addRow', newRowData.value)
        }
        const deleteRow = async (id: number) => {  //Запрос на удаление клиента
            if (!confirm("Вы уверены что хотите удалить строку (id: " + id + ')?')) return
            emit('deleteRow', id)
        }
        const clearInputs = () => { //Функция отмены изменений
            rowInEditData.value = null
            newRowData.value = null
            emit('clearError')
        }
        return {
            rowInEditData,
            newRowData,
            setFixedTableWidth,
            setRowInEdit,
            createNewRow,
            clearInputs,
            deleteRow,
            updateRow,
            addRow,
        }
    }

})
