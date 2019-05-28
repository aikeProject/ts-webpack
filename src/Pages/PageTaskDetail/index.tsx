///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Constans from '../../Common/Constans';
import ClassNames from 'classnames';
//Components
import ComponentSendInput from '../../Components/ComponentSendInput/index';
//Modules
//Less
import './index.less';
//interface
import {} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
//Main
import Action from './action';

const dayjs = require('dayjs');

class Page extends Action {
    constructor(props: Props) {
        super(props);
    }

    // 附件
    renderFile = () => {
        const {fileList} = this.state;
        return (
            <div className={fileList.length ? 'upload_box top_1px_line' : 'hide'}>
                {
                    fileList.map((result, key) => {
                        let fileKey = result.attachmentKey;
                        let lowerkey = fileKey && fileKey.toLowerCase();
                        let fileUrl = result.attachmentUrl;
                        let imgSrc = '';
                        let imgSrc_ = '';
                        let srcflag = 2;
                        if (lowerkey.indexOf('.jpg') != -1 || lowerkey.indexOf('.jpeg') != -1 || lowerkey.indexOf('.png') != -1 || lowerkey.indexOf('.gif') != -1 || lowerkey.indexOf('.bmp') != -1) {
                            imgSrc_ = fileUrl;
                            srcflag = 1;
                        } else if (lowerkey.indexOf('.doc') != -1) {
                            imgSrc = require('../../images/dl_word.png');
                        } else if (lowerkey.indexOf('.pdf') != -1) {
                            imgSrc = require('../../images/dl_pdf.png');
                        } else if (lowerkey.indexOf('.ppt') != -1) {
                            imgSrc = require('../../images/dl_ppt.png');
                        } else if (lowerkey.indexOf('.xsl') != -1 || lowerkey.indexOf('.xlsx') != -1) {
                            imgSrc = require('../../images/dl_excel.png');
                        } else if (lowerkey.indexOf('.rar') != -1 || lowerkey.indexOf('.zip') != -1) {
                            imgSrc = require('../../images/dl_zip.png');
                        } else {
                            imgSrc = require('../../images/dl_other.png');
                        }
                        let name = lowerkey.split('-').pop().split("?")[0];
                        if (srcflag == 1) {
                            return (
                                <div key={key} className='file_item'>
                                    <div className="img" onClick={this.bigImg(imgSrc_)}>
                                        <img src={imgSrc_ || imgSrc}/>
                                    </div>
                                    <div className="f_text">
                                        <div className="name ellipsis">{name}</div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <a key={key} href={fileUrl} download={true} className='file_item'>
                                    <div className="file_item">
                                        <div className="img"><img src={imgSrc_ || imgSrc}/></div>
                                        <div className="f_text">
                                            <div className="name ellipsis">{name}</div>
                                        </div>
                                    </div>
                                </a>
                            );
                        }
                    })
                }
            </div>
        );
    };

    render() {
        let pthis = this;
        const {
            imgBgSrc, imgBgShow, isMore,
            taskDetailHeight, detail, isShowSend
        } = this.state;
        const {staffTypeCon, assignStatusCon} = this.data;
        if (!detail.subject) {
            return (
                <div className="_PageTaskDetail">
                    <div className='task-none'>
                        <img src={require('../../images/task-none.png')} alt=""/>
                        <div className='txt'>亲，分派人已删除任务~</div>
                    </div>
                </div>
            );
        }
        return (
            <div className="_PageTaskDetail">
                <div className='h30'/>
                <div className={ClassNames('ipt_line top_1px_line ', {
                    'bottom_1px_line': !detail.remark
                })}>
                    <label>任务</label>
                    <span style={{boxSizing: 'border-box', paddingRight: '.2rem'}}>{detail.subject}</span>
                </div>
                {
                    detail.remark ? (
                        <div style={{backgroundColor: '#fff'}}>
                            <pre className='task-descript top_1px_line'>{detail.remark}</pre>
                        </div>
                    ) : null
                }
                {
                    this.renderFile()
                }
                <div className='h20 top_1px_line'/>
                <div className='task-transition' style={{height: isMore ? taskDetailHeight : 0}}
                     ref={(ref) => this.data.taskDetail = ref}>
                    {/* 分派 */}
                    <div className='task-assignment top_1px_line'>
                        <div className='ipt_line'>
                            <label className='color-detail'>分派人</label>
                            <span>{detail.ownerUser}</span>
                        </div>
                        {/*<div className='ipt_line top_1px_line'>
                            <label className='color-detail'>执行人</label>
                        </div>
                        {
                            (detail.executors || []).length
                                ? (
                                    <div className='task-people top_1px_line'>
                                        {_.pluck((detail.executors || []), 'userName').join('；')}
                                    </div>
                                ) : (
                                    <div className='task-people top_1px_line'>
                                        无
                                    </div>
                                )
                        }*/}
                        <div className='ipt_line top_1px_line'>
                            <label>分派时间</label>
                            <span>{detail.assignTime && dayjs(detail.assignTime).format('MM月DD日 ddd HH:mm')}</span>
                        </div>
                        <div className='ipt_line top_1px_line'>
                            <label>截止时间</label>
                            <span>{detail.endTime && dayjs(detail.endTime).format('MM月DD日 ddd HH:mm')}</span>
                        </div>
                        <div className='ipt_line top_1px_line'>
                            <label>优先级</label>
                            <span>
                                {
                                    detail.priority == Constans.PRIORITY.NORMAL ? '无' :
                                        detail.priority == Constans.PRIORITY.LOW ? '低优先级' :
                                            detail.priority == Constans.PRIORITY.MIDDLE ? '中优先级' :
                                                detail.priority == Constans.PRIORITY.HIGH ? '高优先级' :
                                                    '其他'
                                }
                            </span>
                        </div>
                    </div>
                    {/* 抄送 */}
                    <div className='task-copy'>
                        <div className='ipt_line top_1px_line'>
                            <label className='color-detail'>抄送人员</label>
                        </div>
                        {
                            (detail.ccUsers || []).length
                                ? (
                                    <div className='task-people top_1px_line'>
                                        {_.pluck((detail.ccUsers || []), 'userName').join('；')}
                                    </div>
                                ) : (
                                    <div className='task-people top_1px_line'>
                                        无
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className='task-open-close top_1px_line' onClick={() => {
                    this.setState({
                        isMore: !this.state.isMore
                    });
                }}>
                    <span>{isMore ? '收起' : '展开'}</span>
                    <span className={ClassNames('icon', {
                        'icon-blur-up': isMore,
                        'icon-blur-down': !isMore
                    })}/>
                </div>
                <div className='h20 top_1px_line'/>
                {/* 留言 */}
                {
                    (() => {
                        if ((detail.staffs || []).length) {
                            return (
                                <div className='leaving-message top_1px_line'>
                                    <ul>
                                        {
                                            detail.staffs.map((value, index, array) => {
                                                // 没有留言评论的时候，执行反馈列表：分派人，抄送人不显示
                                                if (['0', '20'].indexOf(value.staffType.toString()) !== -1
                                                    && !(value.replys || []).length) return null;
                                                return (
                                                    <li key={index} className='bottom_1px_line leaving-message-item'>
                                                        <div className='img'>
                                                            <img src={value.headImg} alt=""/>
                                                        </div>
                                                        <div className='left'>
                                                            <div className='user-detail'>
                                                                <span>{value.userName}</span>
                                                                <span>{value.finishTime && dayjs(value.finishTime).format('MM月DD日 HH:mm')} {value.staffType === 10 && assignStatusCon[value.assignStatus]}</span>
                                                            </div>
                                                            <div
                                                                className='task-role'>{staffTypeCon[value.staffType]}</div>
                                                            {(() => {
                                                                if ((value.replys || []).length > 0) {
                                                                    return (
                                                                        <ul>
                                                                            {
                                                                                value.replys.map((item, index) => {
                                                                                    const styleLi = value.replys.length - 1 === index ? {paddingBottom: 0} : {};
                                                                                    const classLi = ClassNames('leaving-message-content', {'top_1px_line': index !== 0});
                                                                                    return (
                                                                                        <li key={item.replyId}
                                                                                            className={classLi}
                                                                                            style={styleLi}>
                                                                                            <div
                                                                                                className='title'>{item.content}</div>
                                                                                            <div className='time'>
                                                                                                <span
                                                                                                    className='time-txt'>{item.replyTime && dayjs(item.replyTime).format('MM月DD日 HH:mm')}</span>
                                                                                                {
                                                                                                    value.delReplyAuth === 'Y' ?
                                                                                                        <span
                                                                                                            className='del'
                                                                                                            onClick={this.leavingDel(item.replyId)}>删除</span> : null
                                                                                                }
                                                                                            </div>
                                                                                        </li>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    );
                                                                }
                                                            })()}
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        }
                    })()
                }
                <div className='h100'/>
                {(() => {
                    switch (detail.curStaffType !== undefined && detail.curStaffType.toString()) {
                        case "0":
                            return (
                                <div className='task-btn-wrapper'>
                                    <div className='task-btn bottom-iphonex top_1px_line'>
                                        <div className='btn-3' onClick={this.taskDel}>删除</div>
                                        <div className='btn-4' onClick={this.taskEdit}>编辑</div>
                                        <div className='btn-5' onClick={this.showSend}>留言</div>
                                    </div>
                                </div>
                            );
                        case "10":
                            if (detail.isFinish === 'Y') {
                                return (
                                    <div className='task-btn-wrapper'>
                                        <div className='task-btn bottom-iphonex top_1px_line'>
                                            <div className='btn-message' onClick={this.showSend}>留言</div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='task-btn-wrapper'>
                                        <div className='task-btn bottom-iphonex top_1px_line'>
                                            <div className='btn-1' onClick={this.showSend}>留言</div>
                                            <div className='btn-2' onClick={this.taskDone}>执行完成</div>
                                        </div>
                                    </div>
                                );
                            }
                        case "20":
                            return (
                                <div className='task-btn-wrapper'>
                                    <div className='task-btn bottom-iphonex top_1px_line'>
                                        <div className='btn-message' onClick={this.showSend}>留言</div>
                                    </div>
                                </div>
                            );
                    }
                })()}
                {/* 查看图片 */}
                <div className='img_bg' style={{display: imgBgShow ? 'block' : 'none'}}
                     onClick={() => this.setState({imgBgShow: false, imgBgSrc: ''})}>
                    <div className='inner_img'>
                        <img src={imgBgSrc} alt=""/>
                    </div>
                </div>
                {
                    isShowSend ? <ComponentSendInput onChange={this.taskSendReply}
                                                     onHide={() => this.setState({isShowSend: false})}/> : null
                }
            </div>
        );
    }
}

export default Page;
