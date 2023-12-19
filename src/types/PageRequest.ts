export interface PageRequest {
    data: any[];
    totalRecords: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
}
