import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';

import Button from 'ant-design-vue/lib/button';
import Slider from 'ant-design-vue/lib/slider';
import Radio from 'ant-design-vue/lib/radio';

Button.install(Vue);
Slider.install(Vue)
Radio.install(Vue);

var album = require('./app.vue');
var sMd = require('../index.js');

Vue.use(sMd)
var app = new Vue({
    el: '#main',
    render: h => h(album)
});
