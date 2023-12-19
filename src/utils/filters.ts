type FormatFiltersProps = {
    id: string;
    value: any
}[]
interface FormatFiltersPropsReturnType {
    [key: string]: any
}
export function formatFilters(filters: FormatFiltersProps):FormatFiltersPropsReturnType {
    const formatedFilters: {
        [key: string]: any
    } = {}
    filters.forEach(f => {
        formatedFilters[f.id] = f.value
    })
    return formatedFilters;
}