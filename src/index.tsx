import * as React from 'react';
import {render} from 'react-dom';
import App from './App';
import 'dayjs/locale/zh-cn';

const root = document.getElementById('_content');

render(<App/>, root);

// 处理时间的npm包 很小2kb
const dayjs = require('dayjs');
// 全局设置为中文
dayjs.locale('zh-cn');
