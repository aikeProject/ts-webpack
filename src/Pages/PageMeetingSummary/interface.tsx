import { } from '../../Interface/interface';
import { match } from 'react-router-dom';

export interface State {
    nameList: NameNode[],
    remark: string,
    subject: string,
    ownerName: string,
    creatTime: string,
    status: number,
    content: string,
    isShowAll: boolean,
    contentModel: boolean,
    isOwner: string
}
export interface Props {
    match: match<{
        id: string,
        leaderId: string
    }>
}
export interface Data {
    subFlag: boolean
}

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
    timestamp?: number,
    id: number
}

export interface summaryDetail {
    content: string,
    operator: NameNode[],
    gmtModified: string
}