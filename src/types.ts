
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

export interface RadioItem {
    blocksRadio: number;
    vector: [number, number];
}

export interface RadioState {
    list: number[];
    map: Record<number, [number, number][]>;
}