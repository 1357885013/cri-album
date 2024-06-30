
export interface Picture {
    src: string;
    name: string;
    width?: string;
    height?: string;
    oHeight?: number;
    oWidth?: number;
    resolved?: boolean;
    index?: number;
    scaling?: number;
    aspectRatio?: number;
    row?: number;
}