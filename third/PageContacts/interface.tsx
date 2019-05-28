import * as React from 'react';
export interface SureCallBackMember {
    userName: string,
    mobile: string,
    id: number,
    type?: string
}
export interface SureCallBackPhone {
}
export interface SureCallBackGroup {
    deptName: string,
    deptId: number,
    type?: string;
    id: number;
    parentId?: number;
}
export interface initListMember {
    userName: string,
    mobile: string,
    id: number,
    type: 'member'
}
export interface initListGroup {
    deptName: string,
    id: number,
    type: 'group'
}
export interface initListPhone {
    phone: string,
    type: 'phone'
}

export interface PageContactsInterface extends React.Component {
    setInitList(list: Array<initListMember | initListGroup | initListPhone>, listDisable: boolean): void;

}