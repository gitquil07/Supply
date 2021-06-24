import { object, number, string } from "yup";
import { deliveryCondition, statuses, degreeOfDanger } from "utils/static";

const deliveryConditionEnum = deliveryCondition.map(condition => condition.value);
const degreeOfDangerEnum = degreeOfDanger.map(degree => degree.label);
const statusEnum = statuses.map(status => status.label);

export const ApplicationSchema = object().shape({
    trackingUser: number().typeError("Значение для поля 'Логист' не выбрано"),
    transportType: number().typeError("Значение для поля 'Тип транспорта' не выбрано"),
    degreeOfDanger: string().required("Значение для поля 'Уровень опасности' не выбрано").typeError("Значение для поля 'Уровень опасности' не выбрано").oneOf(degreeOfDangerEnum, "Недопустимое значение для поля 'Уровень опасности'"),
    packageOnPallet: number().positive("Введите положительно число").integer("Введите целое число").required("Поле 'Количество мест' должно быть заполнено"),
    transportCount: number().typeError("Введите число").required("Поле 'Количество транспорта' должно быть заполнено").positive("Введите положительно число").integer("Введите целое число"),
    status: string().required("Значение для поля 'Статус' не выбрано").typeError("Значение для поля 'Статус' не выбрано").oneOf(statusEnum, "Недопустимое значение для поля 'Статус'")
});


export const fieldsMessages = {
    trackingUser: "",
    transportType: "",
    degreeOfDanger: "",
    packageOnPallet: "",
    transportCount: "",
    status: "",
}