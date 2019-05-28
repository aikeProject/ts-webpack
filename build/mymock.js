module.exports = {
    '/test/api/a': [//接口描述
        {
            error: 0,
            errorMsg: '自定义的错误提示信息',//可选
            data: {
                age: 13,
                name: 'ckaaaa',
                img: 'plugins/test.png'
            }
        },
    ],
    '/oa/api/schedule/v1/relation/listPublic2Me': [
        {
            error: 0,
            errorMsg: '',
            data: [
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 8403
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 3
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 1
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 2
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 4
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 5
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 6
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 7
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 2
                },
                {
                    "deptName": "技术部",
                    "scheduleNum": 1,
                    "userRelation": 1,
                    "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                    "userName": "曾志鹏",
                    "userId": 2
                }
            ]
        },
    ],
    '/oa/api/schedule/v1/relation/listPublicUser': [
        // {
        //     data: [],
        // },
        {
            error: 0,
            errorMsg: '',
            data: {
                users: [
                    {
                        "deptName": "技术部",
                        "scheduleNum": null,
                        "isSeeHe": 'Y',
                        "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                        "userName": "曾志鹏",
                        "userId": 4,
                        relationType: 10,
                        userRelation: {
                            currentUserId: "123123",
                            isSeeHe: 'Y',
                            isTop: 'Y',
                            otherUserId: '123',
                            "publicRelationType": 1,
                        }
                    },
                    {
                        "deptName": "技术部",
                        "scheduleNum": null,
                        "isSeeHe": 'Y',
                        "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                        "userName": "曾志鹏",
                        "userId": 8403,
                        relationType: 20,
                        userRelation: {
                            currentUserId: "123123",
                            isSeeHe: 'Y',
                            isTop: 'Y',
                            otherUserId: '123',
                            "publicRelationType": 1,
                        }
                    },
                    {
                        "deptName": "技术部",
                        "scheduleNum": null,
                        "isSeeHe": 'N',
                        "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                        "userName": "曾志鹏",
                        "userId": 1,
                        userRelation: {
                            currentUserId: "123123",
                            isSeeHe: 'Y',
                            isTop: 'Y',
                            otherUserId: '123',
                            "publicRelationType": 2,
                        }
                    },
                    {
                        "deptName": "技术部",
                        "scheduleNum": null,
                        "isSeeHe": 'N',
                        "avatar": "http://shp.qpic.cn/bizmp/vWv6ApXmSVs5jnsJ0aRo5ovcAwFicvD1JdgKkFK8t0STYuhHmAy6iaXQ/",
                        "userName": "曾志鹏",
                        "userId": 2,
                        userRelation: {
                            currentUserId: "123123",
                            isSeeHe: 'Y',
                            isTop: 'Y',
                            otherUserId: '123',
                            "publicRelationType": 3,
                        }
                    }
                ],
                depts: [
                    {
                        deptName: '技术部',
                        deptId: '1',
                    },
                    {
                        deptName: '技术部1',
                        deptId: '2',
                    },
                    {
                        deptName: '技术部2',
                        deptId: '3',
                    }
                ]
            }
        },
    ],
    '/oa/api/schedule/v1/relation/operate': [
        {
            data: true
        }
    ],
    '/oa/api/schedule/v1/relation/share': [
        {
            data: true
        }
    ],
    '/oa/api/schedule/v1/calendar/datas': [
        {
            data: {
                datas: ["2018-06-10", "2018-06-12", "2018-07-12", "2018-05-22"]
            }
        }
    ],
    // '/oa/api/schedule/v1/detail/\\d+': [
    //     {
    //         data: {}
    //     }
    // ],
    '/oa/api/schedule/v1/detail/.*': [
        {
            data: {
                "data": {
                    "cancel": 0,
                    "owner": 152,
                    "thirdId": null,
                    "subject": "test_05",
                    "channel": null,
                    "remark": "",
                    "priority": 10,
                    "isOpen": "N",
                    "ownerName": "陈凯1",
                    "isDeleted": "N",
                    "scheduleType": 10,
                    "id": 8181915983163392,
                    "cancelReason": null,
                    startTime: '1999-09-09 12:12:12',
                    endTime: '1999-09-09 12:12:12',
                    "depts": [],
                    "staffs": [{
                        "userName": "陈凯1(创建人)",
                        "userId": 152
                    }
                    ],
                    "isNoticed": "N",
                    "cid": 34,
                    "extraInfo": null,
                    noticeTime: 15,
                    keeperName: 'adsfa',
                    keeperDept: 'dd',
                }
            }
        }
    ],
    '/oa/api/schedule/v2/keeper/list': [
        {
            data: [
                {
                    name: '姓名',//	是	姓名
                    uid: 1,//是	用户ID
                    position: '职位职位职位',//	否	职位
                    avatar: 'plugins/test.png',
                    keepers: [{
                        name: '姓名姓名姓名',//	是	姓名
                        uid: 11,//	是	用户ID
                        position: 'asdfads'
                    }]
                },
                {
                    name: '姓名',//	是	姓名
                    uid: 2,//是	用户ID
                    position: '职位职位职位',//	否	职位
                    avatar: 'plugins/test.png',
                    keepers: [{
                        name: '姓名姓名姓名',//	是	姓名
                        uid: 11,//	是	用户ID
                        position: 'asdfads'
                    }, {
                        name: '姓名姓名姓名',//	是	姓名
                        uid: 11,//	是	用户ID
                        position: 'asdfads'
                    },
                        {
                            name: '姓名姓名姓名',//	是	姓名
                            uid: 11,//	是	用户ID
                            position: 'asdfads'
                        }, {
                            name: '姓名姓名姓名',//	是	姓名
                            uid: 11,//	是	用户ID
                            position: 'asdfads'
                        }, {
                            name: '姓名姓名姓名',//	是	姓名
                            uid: 11,//	是	用户ID
                            position: 'asdfads'
                        }]
                }
            ]
        }
    ],
    '/oa/api/schedule/v2/user/.*': [
        {
            data: {
                name: '姓名',//	是	姓名
                position: 'asdfasdf',//string	否	职位
                isKeeper: 'Y'
            }
        }
    ],
    '/oa/api/schedule/v2/partners': [
        // {
        //     data: {}
        // },
        {
            error: 0,
            errorMsg: '',
            data:
                {
                    leaders: [
                        {
                            name: '11',//	是	姓名
                            uid: 1,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'Y',//	是	是否置顶
                            userType: 'leader'// | 'partner',
                        },
                        {
                            name: '11',//	是	姓名
                            uid: 2,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'N',//	是	是否置顶
                            userType: 'leader'// | 'partner',
                        },
                        {
                            name: '11',//	是	姓名
                            uid: 3,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'N',//	是	是否置顶
                            userType: 'leader'// | 'partner',
                        }
                    ],
                    partners: [
                        {
                            name: '11',//	是	姓名
                            uid: 1,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'Y',//	是	是否置顶
                            userType: 'partner'// | 'partner',
                        },
                        {
                            name: '11',//	是	姓名
                            uid: 2,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'N',//	是	是否置顶
                            userType: 'partner'// | 'partner',
                        },
                        {
                            name: '11',//	是	姓名
                            uid: 3,//	是,//	用户ID
                            deptName: '222',//	否	职位
                            avatar: 'plugins/test.png',//	否	头像地址
                            scheduleNum: 3,// 是	日程数
                            isTop: 'N',//	是	是否置顶
                            userType: 'partner'// | 'partner',
                        }
                    ],
                }

        },
    ],
    '/oa/api/schedule/v\\d/list': [
        {
            data: {
                done: [
                    {
                        id: 1,//	long	是	日程主键，作为删除和编辑时 使用。
                        type: 10,// int	是 日程类型: 10 - 自建 20 - 会议室 21 - 会议纪要 30 - 访客 40 - 小邮局
                        scheduleDate: '2018-09-12',//	string	是	日程日期 yyyy - MM - dd
                        startTime: '2018-09-12 12:12:00',// String	否	12: 20
                        endTime: "2018-09-12 12:22:00",//String	否	13: 40
                        subject: '主题主题主题',//	string	是	主题
                        isOpen: 'Y',//	string	是Y - 公开N - 不公开
                        ownerName: 'adsfads',//	string	是	日程创建者姓名，如果 isOwner = N, 前端需要显示该字段。
                        isOwner: 'N',//string	是Y - 当前日程是当前用户创建N - 不是
                        remark: 'adsfadsf',//string	否	描述
                        priority: 1,
                        extraInfo: [{
                            name: 'asdfasd', //参与人姓名,
                            userId: 'asdfa3', //参与人用户ID
                        }]
                    }
                ],
                todo: [
                    {
                        id: 1,//	long	是	日程主键，作为删除和编辑时 使用。
                        type: 10,// int	是 日程类型: 10 - 自建 20 - 会议室 21 - 会议纪要 30 - 访客 40 - 小邮局
                        scheduleDate: '2018-09-12',//	string	是	日程日期 yyyy - MM - dd
                        startTime: '2018-09-12 12:12:00',// String	否	12: 20
                        endTime: "2018-09-12 12:22:00",//String	否	13: 40
                        subject: '主题主题主题',//	string	是	主题
                        isOpen: 'Y',//	string	是Y - 公开N - 不公开
                        ownerName: 'adsfads',//	string	是	日程创建者姓名，如果 isOwner = N, 前端需要显示该字段。
                        isOwner: 'N',//string	是Y - 当前日程是当前用户创建N - 不是
                        remark: 'adsfadsf',//string	否	描述
                        priority: 10,
                        extraInfo: [{
                            name: 'asdfasd', //参与人姓名,
                            userId: 'asdfa3', //参与人用户ID
                        }]
                    }
                ],
            }
        }
    ],
    '/user/isAdmin': [
        {
            data: true
        }
    ],
    '/dept/list': [
        {
            data: {
                "currentDept": {
                    "id": 1239471,
                    "deptName": "豹云网络",
                    "deptId": 1,
                    "parentId": 0,
                    "deptOrder": 2147483447,
                    "directUserCount": null,
                    "totalUserCount": null
                },
                "subDeptList": [{
                    "id": 1239459,
                    "deptName": "小科技公司",
                    "deptId": 23,
                    "parentId": 1,
                    "deptOrder": 2147484447,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239463,
                    "deptName": "小网络公司",
                    "deptId": 27,
                    "parentId": 1,
                    "deptOrder": 2147483947,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239468,
                    "deptName": "江苏XX子公司",
                    "deptId": 3,
                    "parentId": 1,
                    "deptOrder": 2147483247,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239469,
                    "deptName": "浙江XX子公司",
                    "deptId": 2,
                    "parentId": 1,
                    "deptOrder": 2147483447,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239472,
                    "deptName": "山东XX子公司",
                    "deptId": 5,
                    "parentId": 1,
                    "deptOrder": 2147483047,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239493,
                    "deptName": "智能助手白名单",
                    "deptId": 38,
                    "parentId": 1,
                    "deptOrder": 100000000,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239511,
                    "deptName": "航空工业西安研究所",
                    "deptId": 39,
                    "parentId": 1,
                    "deptOrder": 99999000,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239623,
                    "deptName": "EHR生产队",
                    "deptId": 40,
                    "parentId": 1,
                    "deptOrder": 99998000,
                    "directUserCount": null,
                    "totalUserCount": null
                }, {
                    "id": 1239636,
                    "deptName": "测试组",
                    "deptId": 41,
                    "parentId": 1,
                    "deptOrder": 99997000,
                    "directUserCount": null,
                    "totalUserCount": null
                }],
                "userList": [{
                    "id": 125,
                    "userId": "08be06860e214a5c",
                    "loginName": "liangbo1180",
                    "userName": "梁波11",
                    "userType": "U_1003",
                    "cid": 34,
                    "mobile": "13738156822",
                    "wechatUserId": "liangbo1180",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "LIANGBO11",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 152,
                    "userId": "fcff634aee274c90",
                    "loginName": "chenkai",
                    "userName": "陈凯1",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13873044202",
                    "wechatUserId": "chenkai",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "CHENKAI1",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": "前端老大"
                }, {
                    "id": 8456,
                    "userId": "e004a62a0b3e4856",
                    "loginName": "huixiaomi",
                    "userName": "会小蜜",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18621077176",
                    "wechatUserId": "huixiaomi",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "HUIXIAOMI",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 8457,
                    "userId": "ac0592bbe52e419b",
                    "loginName": "chenyingfeng",
                    "userName": "陈应锋",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18367172272",
                    "wechatUserId": "chenyingfeng",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "CHENYINGFENG",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 8479,
                    "userId": "0a0a30a888dc48b4",
                    "loginName": "zenghongyang",
                    "userName": "曾弘扬",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18267913189",
                    "wechatUserId": "zenghongyang",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "CENGHONGYANG",
                    "avatar": "https://p.qlogo.cn/bizmail/UvbAJ2o63zJsTGascpe9NbJPTk69bpMzhQ9RfeoVHuWYLh6879ruhg/0",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 17806,
                    "userId": "8a53164a81b447bd",
                    "loginName": "zhangwenwen",
                    "userName": "张文文",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13067800617",
                    "wechatUserId": "zhangwenwen",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "ZHANGWENWEN",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": "java开发"
                }, {
                    "id": 17832,
                    "userId": "2932cb61862a4cc4",
                    "loginName": "zhuwei",
                    "userName": "朱巍",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13585549867",
                    "wechatUserId": "zhuwei",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "ZHUWEI",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 77846,
                    "userId": "adbf42ea674f4366",
                    "loginName": "WangQiQi",
                    "userName": "汪奇奇",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13732263656",
                    "wechatUserId": "WangQiQi",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "WANGQIQI",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/F.png",
                    "gender": "2",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 77871,
                    "userId": "c29ea1b228fe477e",
                    "loginName": "ZhangXiaoBo",
                    "userName": "张晓波",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18668192857",
                    "wechatUserId": "ZhangXiaoBo",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "ZHANGXIAOBO",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 77889,
                    "userId": "a6e23a7fa04c4b87",
                    "loginName": "Fenghf",
                    "userName": "Fenghf",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18817557418",
                    "wechatUserId": "Fenghf",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "Fenghf",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 84135,
                    "userId": "b65a459a17a34527",
                    "loginName": "qiuwencheng@zhongan.com",
                    "userName": "邱文成",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "15824097844",
                    "wechatUserId": "qiuwencheng@zhongan.com",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "QIUWENCHENG",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": ""
                }, {
                    "id": 84164,
                    "userId": "35e95877cf8a4c47",
                    "loginName": "MeiChao",
                    "userName": "梅超",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13735485532",
                    "wechatUserId": "MeiChao",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "MEICHAO",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": null
                }, {
                    "id": 84168,
                    "userId": "24845b9c6e224ac2",
                    "loginName": "ZhengHongShi",
                    "userName": "郑鸿实",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18352839100",
                    "wechatUserId": "ZhengHongShi",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "ZHENGHONGSHI",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/F.png",
                    "gender": "2",
                    "parentThirdDeptId": null,
                    "position": "交互设计"
                }, {
                    "id": 84175,
                    "userId": "b0daa1dbc336421a",
                    "loginName": "liangchaowei",
                    "userName": "梁朝伟",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13323332322",
                    "wechatUserId": "liangchaowei",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "LIANGCHAOWEI",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": "java开发"
                }, {
                    "id": 84176,
                    "userId": "9f23c55c8a394752",
                    "loginName": "liujialing",
                    "userName": "刘嘉玲",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "15858282828",
                    "wechatUserId": "liujialing",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "LIUJIALING",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/F.png",
                    "gender": "2",
                    "parentThirdDeptId": null,
                    "position": "运营"
                }, {
                    "id": 86891,
                    "userId": "cf3c436ad76444ff",
                    "loginName": "fuwus",
                    "userName": "服务商",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "18056750000",
                    "wechatUserId": "fuwus",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "FUWUSHANG",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": ""
                }, {
                    "id": 90641,
                    "userId": "b69b468633f94633",
                    "loginName": "LiYiNa",
                    "userName": "李伊娜",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "15658127698",
                    "wechatUserId": "LiYiNa",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "LIYINA",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/F.png",
                    "gender": "2",
                    "parentThirdDeptId": null,
                    "position": ""
                }, {
                    "id": 90829,
                    "userId": "243412feab7f4cca",
                    "loginName": "jiangfangqing@zhongan.com",
                    "userName": "姜方清",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "15268594969",
                    "wechatUserId": "jiangfangqing@zhongan.com",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "JIANGFANGQING",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": ""
                }, {
                    "id": 92132,
                    "userId": "a68c00fc1d20441e",
                    "loginName": "muguiying",
                    "userName": "穆桂英",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13856329017",
                    "wechatUserId": "muguiying",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "MUGUIYING",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/F.png",
                    "gender": "2",
                    "parentThirdDeptId": null,
                    "position": ""
                }, {
                    "id": 92133,
                    "userId": "109ea47fd9b84d81",
                    "loginName": "euxie",
                    "userName": "无邪",
                    "userType": "U_1001",
                    "cid": 34,
                    "mobile": "13829863407",
                    "wechatUserId": "euxie",
                    "deptNames": "",
                    "deptId": null,
                    "pinyin": "WUXIE",
                    "avatar": "https://jianjian-test-1255942088.cos.ap-shanghai.myqcloud.com/jianjian/avatar/M.png",
                    "gender": "1",
                    "parentThirdDeptId": null,
                    "position": ""
                }]
            }
        }
    ],
    '/user/showRecentContacts': [
        {
            data: null
        }
    ],
    '/oa/api/schedule/v3/partners/datas': [
        {
            data: {
                isKeeper: 'N',
                leaders: [
                    {
                        "deptName": "测试组",
                        "isTop": null,
                        "schedules": [
                            {
                                "owner": 100905,
                                "thirdId": null,
                                "subject": "2222",
                                "remark": "",
                                "priority": 0,
                                "type": 10,
                                "isOpen": "Y",
                                "ownerName": "秦姗",
                                "isOwner": "Y",
                                "scheduleDate": "2018-12-18",
                                "startTime": "2018-12-18 10:30:00",
                                "finishDate": null,
                                "id": "9256633406533631",
                                "endTime": "2018-12-18 11:30:00",
                                "staffs": [{"userName": "秦姗", "userId": 100905}],
                                "extraInfo": null
                            },
                            {
                                "owner": 100905,
                                "thirdId": null,
                                "subject": "2222",
                                "remark": "",
                                "priority": 0,
                                "type": 10,
                                "isOpen": "Y",
                                "ownerName": "秦姗",
                                "isOwner": "Y",
                                "scheduleDate": "2018-12-18",
                                "startTime": "2018-12-18 10:30:00",
                                "finishDate": null,
                                "id": "9256633406533632",
                                "endTime": "2018-12-18 11:30:00",
                                "staffs": [{"userName": "秦姗", "userId": 100905}],
                                "extraInfo": null
                            }, {
                                "owner": 100905,
                                "thirdId": null,
                                "subject": "33333",
                                "remark": "",
                                "priority": 0,
                                "type": 10,
                                "isOpen": "Y",
                                "ownerName": "73",
                                "isOwner": "Y",
                                "scheduleDate": "2018-12-18",
                                "startTime": "2018-12-18 10:30:00",
                                "finishDate": null,
                                "id": "9256637443878912",
                                "endTime": "2018-12-18 11:30:00",
                                "staffs": [{"userName": "秦姗", "userId": 100905}],
                                "extraInfo": null
                            }],
                        "publicUserType": 30,
                        "avatar": "http://p.qlogo.cn/bizmail/8du9MprWhLK5kiaicyd56IIuiaBcDGE0RnPZxPtPDVcKGznjcpFEuKNBQ/0",
                        "userName": "秦姗",
                        "userId": 100905
                    },
                    {
                        avatar: 'plugins/test.png',	 //	头像
                        userName: '陈凯',	 //	
                        deptName: '陈凯', //		是
                        schedules: [],	 //	数组	是	数据结构如下
                        publicUserType: 0,	 //	
                        userId: 2,
                        isTop: 'Y'
                    },
                    {
                        "deptName": "测试组",
                        "isTop": null,
                        "schedules": [{
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "2222",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "秦姗",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256633406533632",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }, {
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "33333",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "73",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256637443878912",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }],
                        "publicUserType": 30,
                        "avatar": "http://p.qlogo.cn/bizmail/8du9MprWhLK5kiaicyd56IIuiaBcDGE0RnPZxPtPDVcKGznjcpFEuKNBQ/0",
                        "userName": "秦姗",
                        "userId": 100905
                    },
                ],
                partners: [
                    {
                        "deptName": "测试组",
                        "isTop": null,
                        "schedules": [{
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "2222",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "秦姗",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256633406533632",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }, {
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "33333",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "73",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256637443878912",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }],
                        "publicUserType": 30,
                        "avatar": "http://p.qlogo.cn/bizmail/8du9MprWhLK5kiaicyd56IIuiaBcDGE0RnPZxPtPDVcKGznjcpFEuKNBQ/0",
                        "userName": "秦姗",
                        "userId": 100905
                    },
                    {
                        "deptName": "测试组",
                        "isTop": null,
                        "schedules": [{
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "2222",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "秦姗",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256633406533632",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }, {
                            "owner": 100905,
                            "thirdId": null,
                            "subject": "33333",
                            "remark": "",
                            "priority": 0,
                            "type": 10,
                            "isOpen": "Y",
                            "ownerName": "73",
                            "isOwner": "Y",
                            "scheduleDate": "2018-12-18",
                            "startTime": "2018-12-18 10:30:00",
                            "finishDate": null,
                            "id": "9256637443878912",
                            "endTime": "2018-12-18 11:30:00",
                            "staffs": [{"userName": "秦姗", "userId": 100905}],
                            "extraInfo": null
                        }],
                        "publicUserType": 30,
                        "avatar": "http://p.qlogo.cn/bizmail/8du9MprWhLK5kiaicyd56IIuiaBcDGE0RnPZxPtPDVcKGznjcpFEuKNBQ/0",
                        "userName": "秦姗",
                        "userId": 100905
                    },
                ],
            }
        }
    ],
    '/oa/api/assignment/list': [
        {
            data: {
                datas: [
                    {
                        "subject": '未完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨1", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 0, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 5, // 任务执行人总数
                        "finishCnt": 0, // 任务完成人总数
                        "id": 1
                    },
                    {
                        "subject": '未完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨2", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 0, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 10, // 任务执行人总数
                        "finishCnt": 5, // 任务完成人总数
                        "id": 2
                    },
                    {
                        "subject": '未完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨3", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 0, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 9, // 任务执行人总数
                        "finishCnt": 2, // 任务完成人总数
                        "id": 3
                    },
                    {
                        "subject": '未完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨4", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 0, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 8, // 任务执行人总数
                        "finishCnt": 4, // 任务完成人总数
                        "id": 4
                    },
                    {
                        "subject": '已完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨 已完成", // 任务分派人
                        "replyCnt": 10, // 留言数
                        "assignStatus": 10, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 8, // 任务执行人总数
                        "finishCnt": 8, // 任务完成人总数
                        "id": 5
                    },
                    {
                        "subject": '已完成', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨4", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 10, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 9, // 任务执行人总数
                        "finishCnt": 9, // 任务完成人总数
                        "id": 6
                    },
                    {
                        "subject": '已逾期', // 主题
                        "assignTime": new Date().getTime(), // 分派时间，时间戳
                        "endTime": new Date().getTime(), // 任务结束时间，时间戳
                        "ownerUser": "成雨4", // 任务分派人
                        "replyCnt": 12, // 留言数
                        "assignStatus": 20, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "executorCnt": 9, // 任务执行人总数
                        "finishCnt": 9, // 任务完成人总数
                        "id": 7
                    },
                ],
                pageNo: 3,
                totalPage: 3,
            }
        }
    ],
    '/oa/api/assignment/detail': [
        {
            data: {
                curStaffType: 0,
                subject: '分派人', // 主题
                remark: '描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人描述 分派人', // 描述
                assignTime: new Date().getTime(), // 分派时间，时间戳
                endTime: new Date().getTime(), // 任务结束时间，时间戳
                ownerUser: '哈哈,呵呵，嘿嘿', // 任务分派人priority: number,
                priority: 10,
                executors: [
                    {
                        "userName": "成雨100",
                        "uid": 100
                    },
                    {
                        "userName": "成雨200",
                        "uid": 200
                    },
                    {
                        "userName": "成雨300",
                        "uid": 300
                    },
                ],
                ccUsers: [
                    {
                        "userName": "成雨400",
                        "uid": 400
                    },
                    {
                        "userName": "成雨500",
                        "uid": 500
                    },
                    {
                        "userName": "成雨600",
                        "uid": 600
                    },
                ],
                attachs: [
                    {
                        "fileName": "1.png",
                        "fileUrl": "2.png"
                    },
                    {
                        "fileName": "3.doc",
                        "fileUrl": "4.doc"
                    },
                    {
                        "fileName": "4.pdf",
                        "fileUrl": "6.pdf"
                    },
                ],
                staffs: [
                    {
                        "uid": 111, // 用户ID
                        "userName": "李四", // 用户姓名
                        "staffType": 0, // 用户类型 人员类型，0-分派人 10-执行人 20-抄送人
                        "assignStatus": 0, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "finishTime": new Date().getTime(), // 完成时间，时间戳
                        "headImg": "kk.png",
                        "delReplyAuth": "Y",
                        "replys": [
                            {
                                "replyId": 1, // 留言ID
                                "content": "留言内容1111", //	留言内容
                                "replyTime": new Date().getTime(), // 留言时间，时间戳
                            },
                            {
                                "replyId": 2, // 留言ID
                                "content": "留言内容11112222", //	留言内容
                                "replyTime": new Date().getTime(), // 留言时间，时间戳
                            }
                        ],
                    },
                    {
                        "uid": 222, // 用户ID
                        "userName": "张三", // 用户姓名
                        "staffType": 10, // 用户类型 人员类型，0-分派人 10-执行人 20-抄送人
                        "assignStatus": 10, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "finishTime": new Date().getTime(), // 完成时间，时间戳
                        "headImg": "gg.png",
                        "delReplyAuth": "N",
                        "replys": [
                            {
                                "replyId": 2, // 留言ID
                                "content": "留言内容2222", //	留言内容
                                "replyTime": new Date().getTime(), // 留言时间，时间戳
                            }
                        ],
                    },
                    {
                        "uid": 333, // 用户ID
                        "userName": "王二", // 用户姓名
                        "staffType": 20, // 用户类型 人员类型，0-分派人 10-执行人 20-抄送人
                        "assignStatus": 20, // 日程状态，0：未完成，10：已完成  20-已逾期
                        "finishTime": new Date().getTime(), // 完成时间，时间戳
                        "headImg": "yy.png",
                        "delReplyAuth": "N",
                        "replys": [
                            {
                                "replyId": 2, // 留言ID
                                "content": "留言内容2222", //	留言内容
                                "replyTime": new Date().getTime(), // 留言时间，时间戳
                            }
                        ],
                    }
                ]
            }
        }
    ],
    'qqqqq2': [
        {
            error: 0,
            errorMsg: '',
            data: {}
        },
    ],
}