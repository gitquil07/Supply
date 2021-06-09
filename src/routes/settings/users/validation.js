import { object, string, number, array} from "yup";

export const userSchema = object({
    firstName: string().typeError("Поле должно быть строкой").required("Поле 'Имя' обязательно к заполнению"),
    lastName: string().typeError("Поле должно быть строкой").required("Поле 'Фамилия' обязательно к заполнению"),
    username: string().typeError("Поле должно быть строкой").required("Поле 'Username' обязательно к заполнению"),
    password: string().typeError("Поле должно быть строкой").required("Поле 'Пароль' обязательно к заполнению"),
    role: string().typeError("Поле должно быть строкой").required("Поле 'Роль' обязательно к заполнению"),
    email: string().email("Некорректный email адрес").required("Поле 'Email' обязательно к заполнению"),
    phoneNumber: string().required("Поле 'Номер телефона' обязательно к заполнению"),
    factories: array().of(number().required("Выберите завод"))
});

export const userSchemaEdit = object({
    firstName: string().typeError("Поле должно быть строкой").required("Поле 'Имя' обязательно к заполнению"),
    lastName: string().typeError("Поле должно быть строкой").required("Поле 'Фамилия' обязательно к заполнению"),
    password: string().typeError("Поле должно быть строкой").required("Поле 'Пароль' обязательно к заполнению"),
    role: string().typeError("Поле должно быть строкой").required("Поле 'Роль' обязательно к заполнению"),
    email: string().email("Некорректный email адрес").required("Поле 'Email' обязательно к заполнению"),
    phoneNumber: string().required("Поле 'Номер телефона' обязательно к заполнению"),
    factories: array().of(number().required("Выберите завод"))
});

export const fieldsMessages = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    email: "",
    phoneNumber: "",
    factories: ""
};