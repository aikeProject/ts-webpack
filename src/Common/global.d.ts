interface Gajax {
    url: string,
    data?: JQuery.PlainObject,
    success?: (data: any) => void,
    error?: (data: any) => void,

    [key: string]: any
}

declare var G: {
    BASE_URL?: () => string,
    addWaitDom?: () => void,
    removeWaitDom?: () => void,
    ajax?: (ob: Gajax) => void,
    toast?: {
        show: (msg: string, delay?: number, callbackFn?: () => void) => void,
        toast2: (img: string, msg: string, delay?: number, callbackFn?: () => void) => void
    },
    parseDate?: (longtime: number | Date | string, f?: number | any) => any
    [key: string]: any,
};
declare var wx: any;
declare var _: any;

interface Window {
    Reflux: any;
    React: any;
}

declare var fsz: any;