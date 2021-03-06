import { object, string, number } from "yup";

export const fieldsMessages = {
    firm: "",
    name: "",
    code: "",
}

export const factorySchema = object({
    firm: number().typeError("Поле должно быть числом").required("Поле 'Фирма' должно быть выбрано"),
    name: string().typeError("Поле должно быть строкой").required("Поле 'Название' обязательно к заполнению"),
    code: string().typeError("Поле должно быть строкой"),
});
