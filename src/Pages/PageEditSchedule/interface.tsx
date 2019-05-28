import {

} from '../../Interface/interface';

export interface Dept {
    timestamp: number,
    deptName: string,
    deptId: number,
    id: number,
}
export interface Member {
    timestamp: number,
    userName: string,
    id: number
}
export interface NameNode {
    name: string,
    timestamp: number,
    deptNode?: Dept,
    memberNode?: Member
}
export interface State {
    // chooseDate: string,
    isShowContacts: boolean,
    isPublic: boolean,
    level: string,
    startTime: string,
    endTime: string,
    nameList: Array<NameNode>,
    subject: string,
    descript: string,
    txTime: { [key: number]: number },
    leaderValue: string,
}
export interface Props {
    match: {
        params: {
            scheduleId: string,
            leaderId: string,
            chooseDate?: string
        }
    }
}
export interface Data {
    deptList: Array<Dept>,
    userList: Array<Member>,
    txMap: {
        [key: number]: string,
    },
    subFlag: boolean;
    allCompanyDeptId: number;
}