import { object, number } from "yup";

export const OrderSchema = object().shape({
    vendorFactory: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    invoiceProforma: number().typeError("Введите только цифры").required("Поле 'Инвойс заказа' должно быть заполнено")
});

export const fieldsMessages = {
    vendorFactory: "",
    invoiceProforma: ""
}