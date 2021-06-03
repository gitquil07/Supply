export const measureOptions = [
    {
        value: "ML",
        label: "мл"
    },
    {
        value: "SH",
        label: "шт"
    },
    {
        value: "GR",
        label: "гр"
    },
    {
        value: "SM",
        label: "см"
    },
    {
        value: "MM",
        label: "мм"
    },
    {
        value: "LI",
        label: "л"
    },
    {
        value: "KG",
        label: "кг"
    },
    {
        value: "ME",
        label: "м"
    },
    {
        value: "KMR",
        label: "км"
    },
    {
        value: "M2",
        label: "м2"
    }
];

export const packagingTypes = [
    {
        value: "KOROBKA",
        valueEnglish: "BOX",
        label: "коробка"
    },
    {
        value: "MESHOK",
        valueEnglish: "BAG",
        label: "мешок"
    },
    {
        value: "PODDON",
        valueEnglish: "PALLET",
        label: "поддон"
    },
    {
        value: "IASHCHIK",
        valueEnglish: "CASE",
        label: "ящик"
    },
    {
        value: "TARA",
        valueEnglish: "CONTAINER",
        label: "тара"
    },
    {
        value: "BOCHKA",
        valueEnglish: "BARREL",
        label: "бочка"
    },
    {
        value: "RULON",
        valueEnglish: "ROLL",
        label: "рулон"
    }
];

export const deliveryCondition = [
    {
        value: "EXW",
        label: "EXW"
    },
    {
        value: "FCA",
        label: "FCA"
    },
    {
        value: "FOB",
        label: "FOB"
    },
    {
        value: "DAP",
        label: "DAP"
    },
    {
        value: "CIP",
        label: "CIP"
    },
    {
        value: "CPT",
        label: "CPT"
    }
];

export const vendorRoles = [

    {
        value: "POSTAVSHCHIK",
        label: "поставщик"
    },
    {
        value: "TRANSPORTNAIA_KOMPANIIA",
        label: "транспортная компания"
    }
];

export const vendorSapSearchCriteria = [
    {
        value: "ICO",
        label: "ICO"
    },
    {
        value: "MESTNYI",
        label: "МЕСТНЫЙ",
    },
    {
        value: "IMPORT",
        label: "ИМПОРТ"
    },
    {
        value: "SOTRUDNIKI",
        label: "СОТРУДНИКИ"
    },
    {
        value: "PROCHIE",
        label: "ПРОЧИЕ"
    },
    {
        value: "ICO_FILIAL",
        label: "ICO ФИЛИАЛ"
    },
    {
        value: "GOS",
        label: "ГОС"
    },
    {
        value: "GNI",
        label: "ГНИ"
    },
    {
        value: "FIN_POSRED",
        label: "ФИН ПОСРЕД"
    }
];

export const paymentOptions = [
    {
        value: "Наличные",
        label: "cash"
    }
];

export const statuses = [
    {
        label: "создано",
        value: "SOZDANO"
    },
    {
        label: "в пути",
        value: "V_PUTI"
    },
    {
        label: "в растаможке",
        value: "V_RASTAMOZHKE"
    },
    {
        label: "поступлено",
        value: "POSTUPLENO"
    },
    {
        label: "удален",
        value: "UDALEN"
    }
];

export const modes = [
    {
        label: "экспорт",
        value: 10
    },

    {
        label: "реэкспорт",
        value: 11
    },

    {
        label: " временный вывоз",
        value: 12
    },

    {
        label: "выпуск для свободного обращения (импорт)",
        value: 40
    },

    {
        label: "реиморт",
        value: 41
    },

    {
        label: "временный ввоз",
        value: 42
    },

    {
        label: "переработка на таможенной территории",
        value: 51
    },

    {
        label: "переработка вне таможенной территории",
        value: 61
    },

    {
        label: "временное хранение",
        value: 70
    },

    {
        label: "свободная таможенная зона",
        value: 71
    },

    {
        label: "беспошлинная торговля",
        value: 72
    },

    {
        label: "свободный склад",
        value: 73
    },

    {
        label: "таможенный склад",
        value: 74
    },

    {
        label: "отказ в пользу государства",
        value: 75
    },

    {
        label: "уничтожение",
        value: 76
    },

    {
        label: "таможенный транзит",
        value: 80
    }
];




export const customModes = [
    {
        label: "readyForSigning",
        value: "готовые для оформления"
    },
    {
        label: "noDocuments",
        value: "нет документов"
    },
    {
        label: "sertificate",
        value: "сертификат"
    },
    {
        label: "noMoney",
        value: "нет денег"
    },
    {
        label: "waitExemption",
        value: "ждет льготы"
    },
    {
        label: "signed",
        value: "оформлен"
    }
];

export const trackingStatuses = [
    {
        label: "в ожидании",
        value: "V_OZHIDANII"
    },
    {
        label: "передано",
        value: "PEREDANO"
    },
    {
        label: "в пути",
        value: "V_PUTI"
    }
];

export const invoiceStatuses = [
    {
        label: "в ожидании",
        value: "V_OZHIDANII"
    },
    {
        label: "в растаможке",
        value: "V_RASTAMOZHKE"
    },
    {
        label: "удален",
        value: "UDALEN"
    }
];


export const degreeOfDanger = [
    {
        label: "опасно",
        value: "OPASNO"
    },
    {
        label: "не опасно",
        value: "NE_OPASNO"
    }
];

export const destinationOptions = [
    {
        label: "в офис",
        value: "V_OFIS"
    }
];

export const currencyOptions = [
    {
        label: "$",
        value: "USD"
    },
    {
        label: "¥",
        value: "CNA"
    },
    {
        label: "€",
        value: "EUR"
    },
    {
        label: "₽",
        value: "RUB"
    }
];


export const generalReportColorSchema = {
    "Дата": {
        single: {
            colorClass: "white"
        },
    },
    "Общие данные": {
        combination: {
            colorClasses: "red yellow",
            type: "simple-devision"
        }
    },
    "Танспортировка": {
        single: {
            colorClass: "white"
        }
    },
    "Планируемый прогноз": {
        combination: {
            colorClasses: "yellow red",
            type: "outline"
        }
    }
}