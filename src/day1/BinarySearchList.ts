// ThePrimeagen approach
export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    do {
        const middle = Math.floor(low + (high - low) / 2);
        const element = haystack[middle];

        if (element === needle) {
            // Return true or index
            return true;
        } else if (element < needle) {
            // Our value is larger
            low = middle + 1;
        } else {
            // The value in the array is larger
            high = middle;
        }
    } while (low < high);

    // Return true or -1
    return false;
}

// Another approach (from Wikipedia)
// Modified a bit to use generics
function binarySearch<T>(array: T[], target: T): number {
    let l = 0;
    let h = array.length - 1;

    console.log(`l: ${l}, h: ${h}`);

    do {
        const middle = Math.floor((h + l) / 2);
        const middleElement = array[middle];

        if (middleElement === target) {
            return middle;
        } else if (middleElement < target) {
            l = middle + 1;
        } else {
            h = middle - 1;
        }
        
        console.log(`l: ${l}, h: ${h}`);
    } while (l <= h);

    return -1;
}

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;

console.log(binarySearch<number>(testArray, target));