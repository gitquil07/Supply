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
        name: "Поставщики",
        url: "#"
    },
    {
        name: "Заявки на транспортзы",
        url: "#"
    },
    {
        name: "База данных",
        url: "#"
    },
    {
        name: "Прибывшие",
        url: "#"
    },
    {
        name: "Таможня",
        url: "#"
    },
    {
        name: "Отчет",
        url: "#"
    }
];

export const Logistics = [
    {
        name: "Логистика",
        url: "/tracking"
    },
    {
        name: "Слежение",
        url: "/tracking/tracking-transport"
    },
    {
        name: "Прибывшие",
        url: "/tracking/tracking-arrived"
    },
    {
        name: "Клиенты",
        url: "/tracking/tracking-clients"
    },
    {
        name: "Задолжники по заводам",
        url: "/tracking/tracking-dept"
    }
];

export const Customs = [
    {
        name: "Новые",
        url: "#"
    },
    {
        name: "Готовые для оформления",
        url: "#"
    },
    {
        name: "Нет денег",
        url: "#"
    },
    {
        name: "Нет документов",
        url: "#"
    },
    {
        name: "Нет денег",
        url: "#"
    },
    {
        name: "Сертификат",
        url: "#"
    },
    {
        name: "Ждет льготы",
        url: "#"
    },
    {
        name: "Закрытые",
        url: "#"
    }
];

export const Settings = [
    {
        name: "Пользователи",
        url: "/settings/users"
    },
    {
        name: "Отчет",
        url: "#"
    }
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
