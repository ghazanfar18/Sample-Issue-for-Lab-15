export type Pipe = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PipeUpdateResult = {
  scoreDelta: number;
  hit: boolean;
};
