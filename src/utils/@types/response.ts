
export interface ListResponse<T = any>{
    count: number;
    next: any;
    previous:any;
    results: T[]
}