import { Component } from "./component";
export declare const ScReact: {
    createElement: (tagname: string, props: import("./vdom").VDOMAttributes & {
        key: string;
    }, ...childeren: import("./vdom").VDomNode[]) => import("./vdom").VDOMElement;
    createText: (value: string | number | boolean, key?: string) => import("./vdom").VDOMText;
    createComponent: <P extends object>(component: new () => Component<P, any>, props: P & {
        key: string;
    }) => import("./vdom").VDOMComponent;
    Component: typeof Component;
};
