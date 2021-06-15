import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';

export const Supply = [
    {
        name: "Заказы",
        url: "/supply/order"
    },
    {
        name: "Заявки на транспорты",
        url: "/supply/application"
    },
    {
        name: "Прибывшие",
        url: "/supply/arrived"
    },
    {
        name: "Таможня",
        url: "/supply/customs"
    },
    {
        name: "Отчет",
        url: "/supply/report"
    },
    {
        name: "Остатки на складе",
        url: "/supply/stock-balance"
    },
    {
        name: "План",
        url: "/supply/plan-product"
    }
];

export const Logistics = [
    {
        name: "Логистика",
        url: "/tracking"
    },
    {
        name: "Слежение",
        url: "/tracking/transport"
    },
    {
        name: "Прибывшие",
        url: "/tracking/arrived"
    },
    {
        name: "Клиенты",
        url: "/tracking/clients"
    },
    {
        name: "Задолжники по заводам",
        url: "/tracking/dept"
    }
];

export const Customs = [
    {
        name: "Новые",
        url: "/customs/new"
    },
    {
        name: "Готовые для оформления",
        url: "/customs/ready"
    },
    {
        name: "Нет денег",
        url: "/customs/no-money"
    },
    {
        name: "Нет документов",
        url: "/customs/no-document"
    },
    {
        name: "Сертификат",
        url: "/customs/certificate"
    },
    {
        name: "Ждет льготы",
        url: "/customs/no-typed"
    },
    {
        name: "Закрытые",
        url: "/customs/closed"
    }
];

export const Settings = [
    {
        name: "Фирмы",
        url: "/settings/firms"
    },
    {
        name: "Заводы",
        url: "/settings/factories"
    },
    {
        name: "Пользователи",
        url: "/settings/users"
    },
    {
        name: "Продукты",
        url: "/settings/products"
    },
    {
        name: "База данных",
        url: "/settings/materials"
    },
    {
        name: "Партнеры",
        url: "/settings/suppliers"
    },
    {
        name: "Поставщики",
        url: "/settings/vendor-factories"
    },
    {
        name: "Транспорт",
        url: "/settings/transports"
    },

];

export const navElements = [
    {
        name: "Снабжение",
        icon: <DashboardIcon />,
        children: Supply,
        state: "supply"
    },
    {
        name: "Логистика",
        icon: <BookIcon />,
        children: Logistics,
        state: "logistics"
    },
    {
        name: "Таможня",
        icon: <ShoppingCartIcon />,
        children: Customs,
        state: "customs"
    },
    {
        name: "Управление",
        icon: <SettingsIcon />,
        children: Settings,
        state: "settings"
    }
];
