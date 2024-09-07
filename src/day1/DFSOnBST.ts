function search(curr: BinaryNode<number> | null, value: number): boolean {
    if (!curr) {
        return false;
    }

    if (curr.value === value) {
        return true;
    }

    // Traverse

    // Go to the right hand side of the tree
    if (curr.value < value) {
        return search(curr.right, value);
    }

    // Go to the left hand side of the tree (value is smaller than curr node's value)
    return search(curr.left, value);

    // Notice that we're not doing both sides, we're only doing one side or the other that is the beauty of a binary search is we're reducing our search space by half every single step and we're only checking once, we're not checking in we're checking once. (Prime)
    
    // So greatly reduces our time effectively, logN on a perfectly balanced tree or really running time of height. (Prime)

    // But it's not guaranteed that we will have logN (in contrast with binary search on an array, where we always have logN), because one side of the tree may not be perfectly equal to the other side.
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}