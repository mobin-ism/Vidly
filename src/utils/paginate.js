export function paginate(items, currentPage, pageSize) {
    const startingIndex = (currentPage - 1) * pageSize;
    const endingIndex = startingIndex + pageSize;
    return items.slice(startingIndex, endingIndex);
}