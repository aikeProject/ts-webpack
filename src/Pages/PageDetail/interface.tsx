import { ScheduleV1Detail } from '../../Interface/interface';

export interface State {
    detail: ScheduleV1Detail
}
export interface Props {
    match: {
        params: {
            id: string,
            leaderId: string
        }
    }
}
export interface Data {
}