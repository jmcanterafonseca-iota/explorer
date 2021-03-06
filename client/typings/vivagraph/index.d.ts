/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-shadow */
declare module "vivagraphjs" {
    export namespace Graph {
        export interface ILink<T> {
            id: string;
            fromId: string;
            toId: string;
            data: T;
        }
        export interface INode<T> {
            id: string;
            links: ILink[];
            data: T;
        }
        export interface IGraph<T, U> {
            getLink: (nodeA: string, nodeB: string) => ILink<U> | undefined;
            addLink: (nodeA: string, nodeB: string, data?: U) => void;
            removeLink: (link: ILink<U>) => void;
            getNode: (node: string) => INode<T> | undefined;
            addNode: (node: string, data?: T) => void;
            removeNode: (node: string) => void;

            beginUpdate: () => void;
            endUpdate: () => void;
            forEachNode: (callback: (node: INode<T>) => void) => void;
            forEachLink: (callback: (link: ILink<U>) => void) => void;
            forEachLinkedNode: (node: string, callback: (linkedNode: INode<T>, link: ILink<U>) => void) => void;
        }

        export interface ILocation {
            vertexPos: number;
            customAttributes: number;
            transform: number[];
            screenSize: number;
        }

        export interface IWebGL {
            createProgram: (code: string, codeB: string) => WebGLProgram;
            getLocations: (program: WebGLProgram, commands: string[]) => ILocation;
            extendArray: (arr: Float32Array, numItems: number, itemSize: number) => Float32Array;
            copyArrayPart: (arr: Float32Array, from: number, to: number, itemSize: number) => Float32Array;
        }

        export interface IEvents {
            click: (handler: (node: INode) => void) => void;
            mouseEnter: (handler: (node: INode) => void) => void;
            mouseLeave: (handler: (node: INode) => void) => void;
        }

        function graph(): IGraph;
        function webgl(context: WebGLRenderingContextBase): IWebGL;
        function webglInputEvents(graphics: View.IWebGLGraphics, graph: IGraph): IEvents;

        export namespace View {
            export interface IItem {

            }
            export interface IWebGLGraphics<T, U> {
                link: (callback: (link: ILink<U>) => IItem) => void;
                node: (callback: (node: INode<T>) => IItem) => void;
                getNodeUI: (nodeId: string) => {
                    color: string;
                    size: number;
                } | undefined;
                getLinkUI: (linkId: string) => {
                    color: number;
                } | undefined;
                setNodeProgram: (program: WebGLProgram) => void;
                updateSize: () => void;
                scale: (scale: number, offset: { x: number; y: number }) => void;
            }

            export interface IRenderer {
                run: () => void;
                dispose: () => void;
                getLayout: () => Layout.ILayout;
                rerender: () => void;
                zoomOut: () => void;
                reset: () => void;
                getTransform: () => { scale?: number; offset?: { x: number; y: number } };

                on: (event: "scale", callback: (scale: number) => void) => void;
            }
            function webglGraphics(): IWebGLGraphics<T, U>;
            function webglLine(color: string | number): IItem;

            function renderer(graph: IGraph, options: {
                container: HTMLElement | null;
                graphics: IWebGLGraphics;
                layout: Layout.ILayout;
                renderLinks: boolean;
            }): IRenderer;
        }

        export namespace Layout {
            export interface ISimulator {
                springLength: (size: number) => void;
            }
            export interface ILayout {
                simulator: ISimulator;
            }
            function forceDirected(
                graph: IGraph,
                options: {
                    springLength: number;
                    springCoeff: number;
                    dragCoeff: number;
                    stableThreshold: number;
                    gravity: number;
                    timeStep: number;
                    theta: number;
                }): ILayout;
        }
    }
}
