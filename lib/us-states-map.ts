export interface USStatesMapData {
  viewBox: string;
  hub: { x: number; y: number };
  regions: {
    West: { x: number; y: number };
    Midwest: { x: number; y: number };
    Northeast: { x: number; y: number };
    Southeast: { x: number; y: number };
  };
  states: Record<string, string>;
}
