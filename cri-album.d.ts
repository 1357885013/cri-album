import {Component} from "vue";

interface VueCriAlbum {
    criAlbum: Component;
    crimsonAlbum: Component;
    install: (Vue: any) => any;
}

declare let editor: VueCriAlbum;
export default editor;
