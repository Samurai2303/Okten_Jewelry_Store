export interface IUserToCreate{
    "email": string,
    "password": string,
    "profile": {
        "name": string,
        "surname": string,
        "age": string,
        "phone": string;
        "photo": FileList;
    };
}