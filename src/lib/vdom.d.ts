import { Component } from './component';
export type VDOMAttributes = {
    [_: string]: string | number | boolean | Function;
};
export interface VDOMElement {
    kind: 'element';
    tagname: string;
    childeren?: VDomNode[];
    props?: VDOMAttributes & {
        ref?: HTMLElement;
    };
    key: string;
}
export interface VDOMComponent {
    kind: 'component';
    instance?: Component<any, any>;
    props: object;
    component: {
        new (): Component<any, any>;
    };
    key: string;
}
export interface VDOMText {
    kind: 'text';
    value: string;
    key: string;
}
export type VDomNode = VDOMText | VDOMElement | VDOMComponent;
export declare const createElement: (tagname: string, props: VDOMAttributes & {
    key: string;
}, ...childeren: VDomNode[]) => VDOMElement;
export declare const createComponent: <P extends object>(component: {
    new (): Component<P, any>;
}, props: P & {
    key: string;
}) => VDOMComponent;
export declare const createText: (value: string | number | boolean, key?: string) => VDOMText;
