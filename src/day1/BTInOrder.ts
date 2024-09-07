function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // Base case first!
    // Node doesn't have children (left and right are undefined)
    if (!curr) {
        return path;
    }

    // pre

    // recurse
    walk(curr.left, path);

    path.push(curr.value);
    
    walk(curr.right, path);
    
    // post
    // We don't do anything in the post, because we've already pushed the node to the path

    return path;
}

// Return: visited nodes in that order (pre order)
export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}