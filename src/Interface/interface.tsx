import {
    ENUM_PUBLIC_USER_TYPE,
    ENUM_PUBLIC_USER_TYPE_FROM
} from '../Common/Constans';

import {SureCallBackGroup, SureCallBackMember} from '../../third/PageContacts/interface';

export interface Test {
    test: string
}

export interface RelationListPublic2Me {
    deptName: string, //部门
    scheduleNum: number,
    avatar: string, //头像
    userName: string, //名字
    userId: number,//编号
}

//
interface UserRelation { //相互状态
    currentUserId: number,
    isSeeHe: string,
    isTop: String;
    otherUserId: number,
    publicRelationType: number,
}

export interface RelationListPublicUserDepts {
    deptName: string;
    deptId: number;
}

export interface RelationListPublicUserUsers {
    deptName: string,
    userRelation: UserRelation,
    isSeeHe: string,
    avatar: string,
    userName: string,
    userId: number;
    publicUserType: ENUM_PUBLIC_USER_TYPE_FROM
}

export interface RelationListPublicUser {
    users: Array<RelationListPublicUserUsers>;
    depts: Array<RelationListPublicUserDepts>;
}

export interface RelationGetRelation {
    currentUserId: number,
    otherUserId: number,
    isSeeHe: string,
    publicRelationType: number,
    isTop: string
}

//

export interface ScheduleV1DetailStaffs {
    userName: string,
    userId: number,
}

export interface ScheduleV1DetailDepts {
    deptName: string,
    deptId: number,
    id: number
}

export interface ScheduleV1Detail {
    subject: string,
    remark: string,
    startTime: string,
    endTime: string,
    priority: number,
    isOpen: string,
    status: number,
    staffs: Array<ScheduleV1DetailStaffs>,
    depts: Array<ScheduleV1DetailDepts>,
    isOwner: string,
    noticeTime: string,
    keeperName: string,
    ownerName: string,
    ownerId: number,
    keeperDept?: string,
    notifyUsers?: ScheduleV1DetailNotifyUsers[],
    thirdId?: string,
    createTime?: string
}

export interface ScheduleV1DetailNotifyUsers {
    name: string,
    id: number,
}

//<-----
export interface ScheduleV1ListExtraInfoPostOffice {
    expressAddress: string,// 快递位置,
    expressNo: string,//快递单号,
    status: number,// 10 //20-已签收 10-未签收
}

//-
export interface ScheduleV1ListExtraInfoVisitorStaffs {
    name: string,//来访者姓名,
    company: string,//访客公司,
    mobile: string,// 联系方式
}

export interface ScheduleV1ListExtraInfoVisitor {
    status: number,// 状态 (10-已预约 20-已来访 30-已取消 40-已过期),
    visitAddress: string,//访客地点,
    visitPurpose: string,//来访目的
    staffs: Array<ScheduleV1ListExtraInfoVisitorStaffs>
}

//-
export interface ScheduleV1ListExtraInfoMeetingStaffs {
    name: string, //参与人姓名,
    userId: number, //参与人用户ID
}

export interface ScheduleV1ListExtraInfoMeeting {
    // ownerName: string,//会议发起者姓名,
    // ownerUserId: number,//会议发起人userId,
    // subject: string,
    // remark: string,
    // startTime: string,
    // time: Array<string>,
    // roomName:string,
    // status: number,//会议状态 ,10-未开始:,20-已开始:,30-进行中:,40-已结束:,50-已取消,
    // //会议参与人
    // staffs: Array<ScheduleV1ListExtraInfoMeetingStaffs>,
    roomName: string,
    status: number,//会议状态 ,10-未开始:,20-已开始:,30-进行中:,40-已结束:,50-已取消,
    ownerName: string,//会议发起者姓名,
    ownerUserId: number,//会议发起人userId,


}

//-
export interface ScheduleV1ListExtraInfoSummaryStaffs {
    name: string,// 可见人姓名,
    userId: number,// 可见人用户ID
}

export interface ScheduleV1ListExtraInfoSummary {
    ownerName: string,//会议发起者姓名,
    ownerUserId: number,//会议发起人userId,
    summarySubject: string,// 会议纪要名称,
    eventSubject: string,//会议纪要关联的会议主题,
    eventId: number,//会议纪要关联会议id
    //会议纪要可见人
    staffs: Array<ScheduleV1ListExtraInfoSummaryStaffs>
}

//-
export interface ScheduleV1ListItem {
    id: number,//	long	是	日程主键，作为删除和编辑时 使用。
    type: number,// int	是 日程类型: 10 - 自建 20 - 会议室 21 - 会议纪要 30 - 访客 40 - 小邮局
    scheduleDate: string,//	string	是	日程日期 yyyy - MM - dd
    startTime: string,// String	否	12: 20
    endTime: string,//String	否	13: 40
    subject: string,//	string	是	主题
    isOpen: string,//	string	是Y - 公开N - 不公开
    ownerName: string,//	string	是	日程创建者姓名，如果 isOwner = N, 前端需要显示该字段。
    isOwner: string,//string	是Y - 当前日程是当前用户创建N - 不是
    remark: string,//string	否	描述
    priority: number,
    thirdId: number,//第三方应用的id
    extraInfo: any, // ExtraInfo
    staffs: Array<{
        userName: string,
        userId: number
    }>
}

export interface ScheduleV1List {
    todo: Array<ScheduleV1ListItem>,
    done: Array<ScheduleV1ListItem>,
}

//----!>

export interface SkylightCommonGetHolidayImage {
    imageUrl: string,
    holidayName: string
}

export interface ScheduleV1PartnerList {
    id: number,//	long	是	日程主键，作为删除和编辑时 使用。
    type: number,// int	是 日程类型: 10 - 自建 20 - 会议室 21 - 会议纪要 30 - 访客 40 - 小邮局
    scheduleDate: string,//	string	是	日程日期 yyyy - MM - dd
    startTime: string,// String	否	12: 20
    endTime: string,//String	否	13: 40
    subject: string,//	string	是	主题
    isOpen: string,//	string	是Y - 公开N - 不公开
    ownerName: string,//	string	是	日程创建者姓名，如果 isOwner = N, 前端需要显示该字段。
    isOwner: string,//string	是Y - 当前日程是当前用户创建N - 不是
    remark: string,//string	否	描述
    priority: number,
    thirdId: number,//第三方应用的id
    extraInfo: any, // ExtraInfo
    staffs: Array<{
        userName: string,
        userId: number
    }>
}

export interface scheduleV1CalendarDatas {
    calDate: string
}

//
export interface ScheduleV2User {
    name: string,
    position: string,
    isKeeper: string,
}

//
export interface ScheduleV3KeeperList {
    name: string,//	是	姓名
    uid: string,//是	用户ID
    position: string,//	否	职位
    avatar: string,
    keepers: Array<{
        name: string,//	是	姓名
        uid: string,//	是	用户ID
        position: string,
    }>
}

//
export interface ScheduleV2PartnersLeader {
    name: string,//	是	姓名
    uid: string,//	是,//	用户ID
    deptName: string,//	否	职位
    avatar: string,//	否	头像地址
    scheduleNum: number,// 是	日程数
    isTop: string,//	是	是否置顶
    userType: 'leader' | 'partner',//	是	leader / partner
}

export interface ScheduleV2PartnersPartner extends ScheduleV2PartnersLeader {
}

export interface ScheduleV2Partners {
    leaders: ScheduleV2PartnersLeader[],
    partners: ScheduleV2PartnersPartner[]
}

export interface ScheduleV3PartnersDatasLeadersPartners {
    avatar: string;	 //	头像
    userName: string;	 //	
    deptName: string;	 //		是
    schedules: ScheduleV1PartnerList[];	 //	数组	是	数据结构如下
    publicUserType: ENUM_PUBLIC_USER_TYPE;	 //	
    userId: number;
    isTop: 'Y' | 'N'
}

export interface ScheduleV3PartnersDatas {
    isKeeper?: string, // 是否是秘书，Y-是  N-不是秘书
    leaders: ScheduleV3PartnersDatasLeadersPartners[];
    partners: ScheduleV3PartnersDatasLeadersPartners[];
}

export interface DeptList {
    currentDept: {
        deptId?: number;
        id?: number;
        deptName: string;
        parentId?: number;
    };
    subDeptList: SureCallBackGroup[];
    userList: SureCallBackMember[];

}

/* 任务列表接口 */
export interface InterfaceList {
    pageNo?: number, // 页码
    pageSize?: number, //
    totalPage?: number, // 总页数
}

export interface InterfaceTaskListDatas {
    subject?: string, // 主题
    assignTime?: string, // 分派时间，时间戳
    endTime?: string, // 任务结束时间，时间戳
    ownerUser?: string, // 任务分派人
    replyCnt?: number, // 留言数
    assignStatus?: number, // 日程状态，0：未完成，10：已完成  20-已逾期
    executorCnt?: number, // 任务执行人总数
    finishCnt?: number, // 任务完成人总数
    recordId?: number, // 任务id
    priority?: number, // 0-无 10-低 20-中 30-高 优先级
}

// /api/assignment/list
export interface InterfaceTaskList extends InterfaceList {
    datas: InterfaceTaskListDatas[]
}

// /api/assignment/data/create 任务新建接口
export interface InterfaceCreate {
    recordId?: string,
    subject: string, // 主题
    remark: string, // 描述
    priority: number, // 优先级  0-无 10-低 20-中 30-高
    endTime: string, // 任务结束时间
    // noticeTime: string, // 以分钟为刻度，如  30,120,1440
    executors: string, // 执行人用户id，逗号分隔
    ccUsers: string, // 抄送人用户id，逗号分隔
    attachKeys: string, // 附件上传接口返回的路径，逗号分隔
}

export interface InterfaceUser {
    userName: string,
    uid: number
}

// /api/assignment/detail 任务详情接口
export interface InterfaceDetail {
    id?: string,
    /*
    * 当前用户在此任务中的角色，不同角色详情页面 展示的按钮不一样
    * 人员类型，0-分派人 10-执行人 20-抄送人
    * 分派人-编辑，留言，删除，
    * 执行人-留言，执行完成
    * 抄送人-留言
    * */
    curStaffType?: number,
    /*
    * 如果当前用户为执行人，判断是否完成。
    * Y-完成   N-未完成
    * */
    isFinish?: string,
    subject?: string, // 主题
    remark?: string, // 描述
    assignTime?: string, // 分派时间，时间戳
    endTime?: string, // 任务结束时间，时间戳
    ownerUser?: string, // 任务分派人
    /**
     * 优先级   0-无   10-低   20-中   30-高
     */
    priority?: number,
    executors?: InterfaceUser[], // 执行人
    ccUsers?: InterfaceUser[], // 抄送人
    attachs?: { downloadKey: string, fileUrl: string }[], // 附件列表
    staffs?: {
        uid: number, // 用户ID
        userName: string, // 用户姓名
        staffType: number, // 用户类型 人员类型，0-分派人 10-执行人 20-抄送人
        assignStatus: number, // 日程状态，0：未完成，10：已完成  20-已逾期
        finishTime: string, // 完成时间，时间戳
        headImg: string,// 头像
        delReplyAuth: string, // Y - 可以删除留言 N -不可以删除留言
        replys: {
            replyId: string, // 留言ID
            content: string, //	留言内容
            replyTime: string, // 留言时间，时间戳
        }[], // 留言列表
    }[]
}