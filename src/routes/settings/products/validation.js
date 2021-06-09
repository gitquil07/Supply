import { object, string } from "yup";
import { measureOptions } from "utils/static";

const measureEnums = measureOptions.map(measure => measure.value);

export const ProductSchema = object({
    name: string().typeError("Поле `Название` должно быть строкой").required("Поле `Название` должно быть заполнено"),
    code: string().typeError("Поле `Код` должно быть строкой").required("Поле `Код` должно быть заполнено"),
    codeTnved: string().typeError("Поле `Код ТН ВЭД` должно быть строкой").required("Поле `Код ТН ВЭД` должно быть заполнено"),
    measure: string().oneOf(measureEnums, "Недопустимое значение поля 'Ед. измерения' "),
    typeOfPackaging: string().typeError("Поле `Тип упаковки` должно быть строкой").required("Поле `Тип упаковки` должно быть заполнено")
});

export const fieldsMessages = {
    name: "",
    code: "",
    codeTnved: "",
    measure: "",
    typeOfPackaging: ""
}

