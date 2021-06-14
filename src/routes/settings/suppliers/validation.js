import { vendorRoles } from "utils/static";
import { object, string, number } from "yup";

const vendorEnum = vendorRoles.map(vendorRole => vendorRole.label);

export const SuppliersValidation = object().shape({
    sapCountry: number().typeError("Значение для поля 'Страна' не выбрано"),
    name: string().required("Поле 'Контактное лицо' обязательно к заполнению"),
    companyName: string().required("Поле 'Фирма' обязательно к заполнению"),
    phoneNumber: string().required("Поле 'Телефонный номер' обязательно к заполнению"),
    email: string().email("Некорректный Email адрес").required("Поле 'Email' обязательно к заполнению"),
    street: string().required("Поле 'Улица' обязательно к заполнению"),
    house: string().required("Поле 'Дом' обязательно к заполнению"),
    role: string().typeError("Поле 'Роль' обязательно к заполнению").oneOf(vendorEnum),
    postcode: number().required("Поле 'Почтовый индекс' обязательно к заполнению"),
    sapCity: string().required("Поле 'Город' обязательно к заполнению")
});

export const fieldsMessages = {
    sapCountry: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    street: "",
    house: "",
    role: "",
    email: "",
    postcode: "",
    sapCity: ""
};