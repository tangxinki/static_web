export interface BasicPageParams {
    current: number;
    size: number
}
export interface TableList<T = any> {
    records: T[];
    size: number;
    total: number;
}