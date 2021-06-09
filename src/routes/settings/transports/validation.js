import { object, string, number } from "yup";

export const fieldsMessages = {
    name: "",
    customsDayCount: ""
}

export const transportSchema = object({
    name: string().typeError("Поле должно быть строкой").required("Поле 'Название транспорта' обязательно к заполнению"),
    customsDayCount: number().typeError("Поле должно быть строкой").required("Поле 'Кол-во дней' обязательно к заполнению")
});
