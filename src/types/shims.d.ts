declare module "react" {
  export type ReactNode = any;
  export type RefObject<T> = { current: T | null };
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useRef<T>(initialValue: T | null): RefObject<T>;
}

declare module "react-dom";

declare module "clsx" {
  export default function clsx(...args: any[]): string;
}

declare module "mapbox-gl" {
  export default any;
  export class Map {
    constructor(options: any);
    remove(): void;
    fitBounds(bounds: any, options?: any): void;
  }
  export class Marker {
    setLngLat(coords: [number, number]): Marker;
    setPopup(popup: Popup): Marker;
    addTo(map: Map): Marker;
    getElement(): HTMLElement;
  }
  export class Popup {
    constructor(options?: any);
    setText(text: string): Popup;
  }
  export class LngLatBounds {
    constructor();
    extend(coords: [number, number]): void;
  }
}

declare module "mapbox-gl/dist/mapbox-gl.css";

declare module "lucide-react" {
  export const MapPin: any;
}

declare const process: {
  env: Record<string, string | undefined>;
};

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: string | number;
  }
}
