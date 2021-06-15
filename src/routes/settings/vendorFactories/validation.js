import { object, string, number } from "yup";

export const VendorFactoryValidation = object().shape({
    vendor: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    factory: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    paymentCondition: string().typeError("Недопустимое значение для поля 'Условия оплаты'").required("Поле 'Название транспорта' обязательно к заполнению"),
})

export const fieldsMessages = {
    vendor: "",
    factory: "",
    paymentCondition: "",
}