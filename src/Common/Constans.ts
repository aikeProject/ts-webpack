export enum RelationType {
    //无关注关系:-1,全部：0，互相能看:1,我能看他:2,他能看我:3
    NOT = -1,
    ALL = 0,
    EACH,
    VIEW_IT,
    VIEW_ME,
}

export enum ENUM_PUBLIC_USER_TYPE {
    USER = 10,//-个人
    DEPT = 20,//-部门
    LEAD = 30,//-领导
}

export enum ENUM_PUBLIC_USER_TYPE_FROM {
    FROM_USER = 10,//-个人
    FROM_DEPT = 20,//-部门
}

//优先级
export enum PRIORITY {
    NORMAL = 0,
    LOW = 10,
    MIDDLE = 20,
    HIGH = 30
}

//10 - 自建 20 - 会议室 21 - 会议纪要 30 - 访客 40 - 小邮局
export enum SCHEDULE_TYPE {
    SELF = 10,
    MEETING = 20,
    SUMMARY = 21,
    VISITOR = 30,
    POSTOFFICE = 40
}

export const NOTICE_MAP: { [key: string]: string } = {
    // 0: '不提醒',
    5: '提前5分钟',
    10: '提前10分钟',
    30: '提前30分钟',
    60: '提前一小时',
    120: '提前两小时',
    1440: '提前一天',
}