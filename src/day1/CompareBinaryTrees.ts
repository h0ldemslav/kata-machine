// function walk(a: BinaryNode<number> | null | undefined, b: BinaryNode<number> | null | undefined): boolean {
//     if (a?.value !== b?.value) {
//         return false;
//     }

//     if (!a && !b) {
//         return true;
//     }

//     return walk(a?.left, b?.left) && walk(a?.right, b?.right);
// }

// Prime's version; in my version I've modified the parameters, which perhaps is not good :(
// Even though he said that you could compare just by their values (this will be both structure and value check)
// But this version is more explicit
function walk(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    // Structural check
    if (a === null && b === null) {
        // Nodes are same
        return true;
    }

    // Structural check
    if (a === null || b === null) {
        // Nodes aren't the same, i.e. tree (or subtree) has a different structure
        return false;
    }

    // Value check
    if (a.value !== b.value) {
        return false;
    }

    return walk(a.left, b.left) && walk(a.right, b.right);
}

export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    return walk(a, b);
}