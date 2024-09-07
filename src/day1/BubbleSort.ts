export default function bubble_sort(arr: number[]): void {
    let alreadySorted = false;

    for (let i = 0; i < arr.length && !alreadySorted; i++) {
        alreadySorted = true;

        // -1 is necessary, because j + 1 in the first iteration would be undefined
        // In more traditional languages this will throw an exception
        // And we don't wanna go off the array
        // We also need to subtract i, because the last item is the biggest
        // and we don't need it, it's sorted
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const current = arr[j];
            const next = arr[j+1];

            if (current > next) {
                arr[j+1] = current;
                arr[j] = next;
                alreadySorted = false;
            }
        }
    }
}