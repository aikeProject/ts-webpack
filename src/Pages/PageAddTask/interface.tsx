import {} from '../../Interface/interface';

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
    subject: string,
    remark: string,
    fileList: { downloadKey?: string, fileUrl?: string }[],
    imgBgShow: boolean,
    imgBgSrc: string,
    level: string,
    copyList: Array<NameNode>,
    stopDate: string,
    txTime: { [key: number]: number },
    nameList: Array<NameNode>,
    isShowContacts: boolean,
    isVIP: boolean
}

export interface Props {
    match: {
        url: string,
        params: {
            recordId: string
        }
    }
}

export interface Data {
    refPageContacts: any,
    v_time: HTMLInputElement,
    txMap: {
        [key: number]: string,
    },
    userListExecutor: Array<Member>,
    userListCopy: Array<Member>,
    isSelectType: number,
    subjectInput: HTMLElement
}