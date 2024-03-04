import axios from "axios";
import Client from "@/types/Client";

const axiosModule = axios.create({
    baseURL: "http://localhost:1111/clients",
})
export const getRequest = async () => {
    const result=(await axiosModule.get('/')).data
    if (result.errors)
        throw new Error(result.errors[0].message)
    else return result
}

export const postRequest = async (client: Client) => {
    const result = (await axiosModule.post('/', client)).data
    if (result.errors)
        throw new Error(result.errors[0].message)
}

export const patchRequest = async (client: Client) => {
    return await axiosModule.patch('/', client)
}

export const deleteRequest = async (id: number) => {
    const result =(await axiosModule.delete('/', {data: id})).data
    if (result.errors)
        throw new Error(result.errors[0].message)
}
