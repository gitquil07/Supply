import { object, number, string, boolean } from "yup";
import { currencyOptions } from "utils/static";

const currencyEnum = currencyOptions.map(currency => currency.value);

export const MaterialsSchema = object().shape({
    vendorFactory: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    product: number().typeError("Значение для поля 'Продукт' не выбрано"),
    price: number()
            .positive("Цена не можеть быть отрицательной")
            .typeError("Поле 'Продукт' должно иметь число в качестве значения"),
    deliveryDayCount: number()
            .positive("Введите положительно число")
            .integer("Введите целое число")
            .typeError("Поле 'Дни доставкм' должно иметь число в качестве значения"),
    productionDayCount: number()
            .positive("Введите положительно число")
            .integer("Введите целое число")
            .typeError("Поле 'Срок изготовлеия' должно иметь число в качестве значения"),
    isActive: boolean(),
    currency: string()
        .oneOf(currencyEnum, "Недопустимое значение поля 'Валюта'"),
    moq: number()
            .positive("Введите положительное число")
            .integer("Введите целое число")
            .required("Поле 'moq' должно быть заполнено")
});

export const fieldsMessages = {
    "factory": "",
    "vendorFactory": "",
    "product": "",
    "price": "",
    "deliveryDayCount": "",
    "productionDayCount": "",
    "isActive": "",
    "currency": "",
    "moq": ""
}