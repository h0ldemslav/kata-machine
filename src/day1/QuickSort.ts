// Performs quicksort
function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
       return; 
    }

    const pivotIdx = partition(arr, lo, hi);

    // We don't want to include the pivot, and, since it's inclusive, we need to subtract 1
    qs(arr, lo, pivotIdx - 1);
    // Remember, we need to go not only to the pivot (excluded by adding 1), but also beyond
    qs(arr, pivotIdx + 1, hi);

    // So we repeat quicksort on both sides, but we don't include the pivot
}
 
// Returns pivot index
function partition(arr: number[], lo: number, hi: number): number {
    // Last item picked for the first pivot
    // Lomuto partition scheme
    const pivot = arr[hi];

    // Most books will have index -1, even though it's not strictly necessary (Prime)
    let idx = lo - 1;

    // Weak sort
    // Note hi is the index of the last element, which is a pivot, and we don't want to include it
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;

            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp; 
        }
    }

    // It's important to increment the index here, because we need to keep the rule:
    // everything on a one side is less than or equal to pivot
    // and everything on the other side is greater than the pivot 
    // It's also important to increment, if there were no elements <= pivot, 
    // and we don't want to get -1 (which lo - 1, if lo = 0)
    idx++;

    arr[hi] = arr[idx];
    arr[idx] = pivot;

    // Pivot idx
    return idx;
}

// You could return the sorted array, if needed
export default function quick_sort(arr: number[]): void {
    // NOTE: lo and hi are both inclusive
    qs(arr, 0, arr.length - 1);
}