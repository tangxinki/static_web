export enum Order {
    Pending = 1,
    Onfulfilled = 1 << 1,
    OnRejected = 1 << 2,
    Onboard = 1 << 3,
}

export enum General {
    Zero = 0,
    One = 1,
    Two = 1 << 1,
    Three = 1 << 1 ^ 1,
    Four = 1 << 2,
}
