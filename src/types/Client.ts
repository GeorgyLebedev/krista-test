interface iClient {
    id: string | number,
    name: string,
    surname: string,
    birthDate: string,
    phoneNumber: string,
    email: string,
    createdAt: string
}

export default class Client implements iClient {
    id: string | number = ""
    name = ""
    surname = ""
    birthDate = ""
    phoneNumber = ""
    email = ""
    createdAt = ""

}
