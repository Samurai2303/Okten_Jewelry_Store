export interface IPaginatedData<T>{
    "total_items": number,
    "total_pages": number,
    "previous": string|null,
    "next": string|null,
    "data": T
}