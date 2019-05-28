import {
    RelationListPublicUser,
    RelationListPublicUserUsers,
    RelationListPublicUserDepts
} from '../../Interface/interface';
import * as Constant from '../../Common/Constans';

export interface State {
    list: Array<RelationListPublicUserUsers>,
    fetchType: number,
    isShowHwContacts: boolean,
}
export interface Props {
}
export interface Data {
    buttonMap: {
        [key: number]: string
    },
    depts: RelationListPublicUserDepts[];
    allCompanyDeptId: number;
}