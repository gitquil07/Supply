import { object, string } from "yup";

export const fieldsMessages = {
    name: "",
    inn: "",
}

export const firmSchema = object({
    name: string().typeError("Поле должно быть строкой").required("Поле 'Название фирмы' обязательно к заполнению"),
    inn: string().typeError("Введите число").required("Поле 'ИНН' обязательно к заполнению")
});