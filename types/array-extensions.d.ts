interface Array<T> {
    filterMap<U, S extends T>(
        predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any,
        callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any
    ): U[]
}