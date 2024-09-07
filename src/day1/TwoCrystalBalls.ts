export default function two_crystal_balls(breaks: boolean[]): number {
    // We use square root, so we don't have O(N) and this is the trick!
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jmpAmount;

    for (; i < breaks.length; i += jmpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    // Jumped back
    i -= jmpAmount;

    for (let j = 0; j < jmpAmount && i < breaks.length; j++, i++) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}