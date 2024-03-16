export type WindowAppTypes = 'calculator' | 'other-app';
export interface WindowProps {
  id: string;
  type: WindowAppTypes;
  isFullscreen: boolean;
  isMinimalize: boolean;
  zIndex: number;
}
export interface AppProps {
  displayName: string;
  iconSrc: string;
  minSize: { width: string; height: string };
}
export interface WindowApp extends WindowProps, AppProps {}
