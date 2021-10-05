import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
import Slider from 'ant-design-vue/lib/slider';
Vue.component(Button.name, Button);
Vue.component(Slider.name, Slider);
var album = require('./app.vue');
var sMd = require('../index.js');

Vue.use(sMd)
var app = new Vue({
    el: '#main',
    render: h => h(album)
});
