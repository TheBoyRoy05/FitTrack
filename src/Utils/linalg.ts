export const sub = (a: number[], b: number[]) => {
  return a.map((_, i) => a[i] - b[i]);
};

export const dot = (a: number[], b: number[]) => {
  return a.reduce((acc, _, i) => acc + a[i] * b[i], 0);
};

export const norm = (a: number[]) => {
  return Math.sqrt(a.reduce((acc, _, i) => acc + a[i] * a[i], 0));
};

export const angle = (a: number[], b: number[]) => {
  return Math.acos(dot(a, b) / (norm(a) * norm(b)));
};