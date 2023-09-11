export interface IDAO<T, L> {
    getAll(): Promise<T[]>
    getByIds(ids: L[]): Promise<T[]>
}
