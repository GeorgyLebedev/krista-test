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
    checkResponseErrors(result)
}

export const patchRequest = async (client: Client) => {
    const {id, ...data}=client
    const result=(await axiosModule.put(`/${id}`, data)).data
    checkResponseErrors(result)
}

export const deleteRequest = async (id: number) => {
    const result =(await axiosModule.delete(`/${id}`)).data
    checkResponseErrors(result)
}

const checkResponseErrors=(responseData:any)=>{
    if (responseData?.errors?.length)
        throw new Error(responseData.errors[0].message)
    else if(responseData?.name?.includes("Error"))
        throw new Error(responseData.original.detail)
}
