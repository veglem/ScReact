import { VDomNode } from "./vdom";
import { VDomNodeUpdater } from "./diffs";
export declare const applyUpdate: (elem: HTMLElement | Text, diff: VDomNodeUpdater) => HTMLElement | Text;
export declare const renderDOM: (htmlId: string, rootNode: VDomNode) => HTMLElement;
