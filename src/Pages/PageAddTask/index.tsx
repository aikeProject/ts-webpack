///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Contants from '../../Common/Constans';

const PageContacts = require('../../../third/PageContacts/index.js');
//Components
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
                        let fileKey = result.downloadKey;
                        let lowerkey = fileKey && fileKey.toLowerCase();
                        let fileUrl = result.fileUrl;
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
                                    <div className="del" onClick={this.deleteFile(key)}/>
                                </div>
                            );
                        } else {
                            return (
                                <div key={key} className="file_item">
                                    <div className="img"><img src={imgSrc_ || imgSrc}/></div>
                                    <div className="f_text">
                                        <div className="name ellipsis">{name}</div>
                                    </div>
                                    <div className="del" onClick={this.deleteFile(key)}/>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    };

    render() {
        const pthis = this;
        const {recordId} = this.props.match.params;
        const {
            subject, remark, imgBgShow, imgBgSrc,
            level, copyList, isShowContacts,
            isVIP, fileList
        } = this.state;
        return (
            <div className="_PageAddTask">
                <div className='h30'/>
                <div className='task-subject top_1px_line'>
                    <div className='ipt_line subject-wrapper'>
                        <label className="require">任务</label>
                        {
                            !subject ? <div className='placeholder-txt'>请输入</div> : null
                        }
                        <div ref={(ref) => this.data.subjectInput = ref}
                            className='subject-input needsclick'
                            contentEditable={true}
                            suppressContentEditableWarning={true} onInput={this.handleInput.bind(this, 'subject')}>
                        </div>
                    </div>
                    <div className="ipt_line top_1px_line textarea_line">
                        <textarea className="textarea"
                            onChange={this.handleInput.bind(this, 'remark')}
                            value={remark} placeholder="请输入任务描述"/>
                    </div>
                    {
                        isVIP ? (
                            <div className='upload_btn top_1px_line'>
                                <div className='img_up'>
                                    <input type="file" name="file" className="upload_ipt"
                                        onChange={this.uploadFile.bind(this)} onClick={(e) => {
                                            if (fileList.length >= 10) {
                                                G.toast.show('最大上传10个文件');
                                                e.preventDefault();
                                            }
                                        }} id="upload_ipt" accept="image/*"/>
                                </div>
                                上传附件
                            </div>
                        ) : null
                    }
                    {/* 附件列表 */}
                    {
                        this.renderFile()
                    }
                    {/* 查看图片 */}
                    <div className='img_bg' style={{display: imgBgShow ? 'block' : 'none'}}
                        onClick={() => this.setState({imgBgShow: false, imgBgSrc: ''})}>
                        <div className='inner_img'>
                            <img src={imgBgSrc} alt=""/>
                        </div>
                    </div>
                </div>
                <div className='h20 top_1px_line'/>
                {/* 执行人 */}
                <div className='ipt_line top_1px_line' onClick={this.showContacts(0)}>
                    <label className="require">执行人</label>
                    <i className='rdrop'>请选择</i>
                </div>
                {
                    pthis.state.nameList.length > 0 ?
                        <div className="copy-content top_1px_line">
                            {
                                pthis.state.nameList.map((one, idx) => {
                                    return (<span
                                        key={one.timestamp}>{one.name + (idx < pthis.state.nameList.length - 1 ? '；' : '')}</span>);
                                })
                            }
                        </div>
                        : null
                }
                {/* 截止时间 */}
                <div className='ipt_line top_1px_line w75'>
                    <label className="require">截止时间</label>
                    <i className='rdrop'>
                        <input
                            className='stopTime'
                            placeholder="请选择"
                            ref={(ref) => this.data.v_time = ref}
                            readOnly
                            defaultValue=''
                            onClick={this.showTimeActions.bind(pthis)}
                        />
                    </i>
                </div>
                {/* 提醒时间 */}
                {/*<div className='ipt_line top_1px_line' onClick={this.showNoticeTimer.bind(this)}>
                    <label className="require">提醒时间</label>
                    {(() => {
                        let str: string[] = [];
                        for (let t in pthis.state.txTime) {
                            Contants.NOTICE_MAP[t] && str.push(Contants.NOTICE_MAP[t]);
                        }
                        return (
                            <i className={"rdrop" + (str.length ? ' clr' : '')}>{str.join('；') || '请选择'}</i>
                        );
                    })()}
                </div>*/}
                {/* 优先级 */}
                <div className="ipt_line top_1px_line w75">
                    <label>优先级</label>
                    <i onClick={pthis.changeLevel('normal')}
                        className={"sbtn" + (level == 'normal' ? " normal" : '')}><span>无</span></i>
                    <i onClick={pthis.changeLevel('low')}
                        className={"sbtn" + (level == 'low' ? " low" : '')}><span>低</span></i>
                    <i onClick={pthis.changeLevel('high')}
                        className={"sbtn" + (level == 'high' ? " high" : '')}><span>高</span></i>
                </div>
                {/* 抄送人员 */}
                <div className='ipt_line top_1px_line w75' onClick={this.showContacts(1)}>
                    <label>抄送人员</label>
                    <i className='rdrop'>请选择</i>
                </div>
                {
                    (() => {
                        if ((copyList || []).length === 0) return <div className='copy-tip'>抄送人可时刻查看任务进度，但无需完成任务</div>;
                        return (
                            <div className="copy-content top_1px_line">
                                {
                                    pthis.state.copyList.map((one, idx) => {
                                        return (<span
                                            key={one.timestamp}>{one.name + (idx < pthis.state.copyList.length - 1 ? '；' : '')}</span>);
                                    })
                                }
                            </div>
                        );
                    })()
                }
                {
                    (copyList || []).length !== 0 ? <div className='top_1px_line h20'/> : null
                }
                {/* 发送任务 */}
                <div className='send-btn-wrapper top_1px_line'>
                    <div className='send-btn bottom-iphonex' onClick={this.addOrEditTask}>
                        <div className='btn-add'>{recordId ? '修改任务' : '发送任务'}</div>
                    </div>
                </div>
                {/* 选人组件 */}
                <div className='PageContactsWrapper' style={{display: (isShowContacts ? 'block' : 'none')}}>
                    <div className='cover'/>
                    <PageContacts ref={(o: any) => {
                        this.data.refPageContacts = o;
                    }} phoneNotExitAndAlarmCb={() => {
                        return true;
                    }} sureFn={this.sureSelectMCallBack.bind(this)}
                    component={true}
                    onlyMember={true}
                    clearAll={true}
                    noOther={1}/>
                </div>
            </div>
        );
    }
}


export default Page;
