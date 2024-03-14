import { VDOMAttributes, VDomNode } from "./vdom";
type AttributesUpdater = {
    set: VDOMAttributes;
    remove: string[];
};
interface InsertOperation {
    kind: 'insert';
    node: VDomNode;
}
interface UpdateOperation {
    kind: 'update';
    attributes: AttributesUpdater;
    childeren: ChildUpdater[];
}
interface ReplaceOperation {
    kind: 'replace';
    newNode: VDomNode;
    callback?: (elem: HTMLElement | Text) => void;
}
interface RemoveOperation {
    kind: 'remove';
}
interface SkipOperation {
    kind: 'skip';
}
export type VDomNodeUpdater = UpdateOperation | ReplaceOperation | SkipOperation;
export type ChildUpdater = UpdateOperation | ReplaceOperation | RemoveOperation | SkipOperation | InsertOperation;
export declare const createDiff: (oldNode: VDomNode, newNode: VDomNode) => VDomNodeUpdater;
export {};
