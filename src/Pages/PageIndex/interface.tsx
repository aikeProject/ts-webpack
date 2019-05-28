import {
    ScheduleV1List,
    SkylightCommonGetHolidayImage,
    ScheduleV1PartnerList,
    RelationGetRelation,
    InterfaceTaskListDatas
} from '../../Interface/interface';
import {renderItem} from '../../Common/util';
import {ReactPropTypes} from "react";

export interface State {
    showAllCalendar: boolean,
    newDate: Date,
    topTimeList: Array<string>,
    allTimeList: Array<string>,
    defaultDate: Date,
    weekList: Array<number>,
    calendarScheduleMap: {
        [key: string]: boolean
    },
    //
    renderDoneList: Array<renderItem>,
    renderTodoList: Array<renderItem>,
    staffBabyCard: SkylightCommonGetHolidayImage,
    relationForOther: RelationGetRelation,
    isLoad: boolean,
    page: string,
    isShowSelectFlag: boolean,
    curTask: string,
    isShowAdd: boolean,
    taskListState: InterfaceTaskListDatas[],
    enabled: boolean,
    stop: boolean
}

export interface Props {
    match?: {
        params: {
            userId: number,
            userIsLeader: 0 | 1,
            chooseDate?: string,
            page: string,
        },
        url: string
    },
}

export interface Data {
    allList: ScheduleV1List,
    allOtherList: Array<ScheduleV1PartnerList>,
    nodataList: string[],
    taskList: {
        [key: string]: string
    },
    pageNo: number,
    pageSize: number
}