import {InterfaceDetail} from '../../Interface/interface';

export interface State {
    fileList: { attachmentKey?: string, attachmentUrl?: string }[],
    imgBgShow: boolean,
    imgBgSrc: string,
    isMore: boolean,
    taskDetailHeight: number,
    detail: InterfaceDetail,
    isShowSend: boolean
}

export interface Props {
    match: {
        params: {
            recordId: string
        }
    }
}

export interface Data {
    taskDetail: HTMLElement,
    staffTypeCon: {
        [key: number]: string
    },
    assignStatusCon: {
        [key: number]: string
    }
}