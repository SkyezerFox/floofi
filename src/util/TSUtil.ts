// Generic listener type
export type Listener<T extends any[]> = (...data: T) => void;
