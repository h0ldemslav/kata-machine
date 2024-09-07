// Return path. This is just for the convenience. You can have void
// Then return nothing and you don't do anything in post
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // Base case first!
    // Node doesn't have children (left and right are undefined)
    if (!curr) {
        return path;
    }

    // pre
    path.push(curr.value);

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    // We don't do anything in the post, because we've already pushed the node to the path

    return path;
}

// Return: visited nodes (their values) in that order (pre order)
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}