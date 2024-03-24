import { VDomNodeUpdater } from "./diffs";
import { VDomNode } from "./vdom";
export declare abstract class Component<P, S> {
    protected props: P;
    protected state: S;
    private currentRootNode;
    private mountedElement;
    protected setState(updater: (s: S) => S): void;
    setProps(props: P): VDomNodeUpdater;
    getRef(): HTMLElement | Text;
    initProps(props: P): VDomNode;
    private getUpdateDiff;
    notifyMounted(elem: HTMLElement | Text): void;
    unmount(): void;
    componentDidMount(): void;
    componentWillRecieveProps(props: P, state: S): S;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    abstract render(): VDomNode;
}
