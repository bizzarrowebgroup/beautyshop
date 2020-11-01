import React from 'react';

interface User {
    id: number,
}

//interface Booking {
//    id: number,
//    make: string,
//    year: number,
//    color: string,
//}

interface servizi {
    id: string,
    label: string,
    enabled: boolean,
    order: number,
    icon: string
}

interface commercianti {
    id: string,
    title: string,
    via: string,
    tipo: number,
    economy: number,
    stars: number,
    phone: string,
    email: string,
    desc: string
}

interface photos {
    id: string,
    commercianti: string,
    url: string,
    isMain: boolean,
}

type showToastType = (
    header?: string,
    message?: string,
    type?: "success" | "error" | "info",
    position?: "top" | "bottom",
    duration?: Number,
) => () => void;

interface AppState {
    // bookings?: Booking[] | null;
    lang?: string;
    i18n?: string;
    currentLocale?: string;
    currentUser?: User[];
    setCurrentUser?: () => void;
    showToast?: showToastType;
    servizi?: servizi[];
    commercianti?: commercianti[];
    foto?: photos[];
}

const AppContext = React.createContext({} as AppState);
export { AppContext };
