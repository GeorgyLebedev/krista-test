import axios from "axios";
import Client from "@/types/Client";

const axiosModule = axios.create({
    baseURL: "http://localhost:1111/clients",
})
export const getRequest = async () => {
    const result=(await axiosModule.get('/')).data
    checkResponseErrors(result)
    return result
}

export const postRequest = async (client: Client) => {
    const result = (await axiosModule.post('/', client)).data
    console.log(result)
    checkResponseErrors(result)
}

export const patchRequest = async (data: any, id:number) => {
    const result=(await axiosModule.patch(`/${id}`, data)).data
    checkResponseErrors(result)
}

export const deleteRequest = async (id: number) => {
    const result =(await axiosModule.delete('/', {data:{id:id}})).data
    checkResponseErrors(result)
}

const checkResponseErrors=(responseData:any)=>{
    if (responseData?.errors?.length)
        throw new Error(responseData.errors[0].message)
    else if(responseData?.name?.includes("Error"))
        throw new Error(responseData.original.detail)
}
