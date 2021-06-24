import { Switch } from "@material-ui/core";
import { transduce } from "ramda";

export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: "none"
            },
        },
        {
            name: "name",
            label: "Продукт",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "measure",
            label: "Ед. измерения",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "codeTnved",
            label: "Код тн вэд",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "typeOfPackaging",
            label: "Тип упаковки",
            options: {
                filter: true,
                sort: true
            }
        },
    ];
}