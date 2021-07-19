import { object, number, string } from "yup";

export const OrderSchema = object().shape({
    vendorFactory: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    invoiceProforma: string().required("Поле 'Инвойс заказа' должно быть заполнено")
});

export const fieldsMessages = {
    vendorFactory: "",
    invoiceProforma: ""
}