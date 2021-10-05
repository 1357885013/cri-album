'use strict';

/**
 * crimsonAlbum
 * @author LJJ
 */
const crimsonAlbum = require('./crimson-album.vue');
const criAlbum = require('./cri-album.vue');
const VueCriAlbum = {
    criAlbum: criAlbum,
    crimsonAlbum: crimsonAlbum,
    install: function (Vue) {
        Vue.component('cri-album', criAlbum);
        Vue.component('crimson-album', crimsonAlbum);
    }
};

module.exports = VueCriAlbum;
