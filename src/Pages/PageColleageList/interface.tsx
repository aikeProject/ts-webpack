import {
    ScheduleV1List,
    ScheduleV1PartnerList,
    ScheduleV3PartnersDatas
} from '../../Interface/interface';

export interface State {
    isKeeper: string,
    isLoad: boolean,
    datas: ScheduleV3PartnersDatas,
    showMoreMap: { [key: number]: true },
    page: string
}

export interface Props {
    match: {
        params: {
            page?: string
        }
    }
}

export interface Data {
}