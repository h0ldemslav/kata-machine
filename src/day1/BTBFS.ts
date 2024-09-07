export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // We can't use a recursion in BFS (although it's possible), because it uses queue, not stack 
    // And you can see we use a loop and it's a bit messy (however, recursion also has it's downsides)

    // Pretend this is a queue, and not an arraylist
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        const curr = q.shift() as BinaryNode<number> | undefined | null;
        
        if (!curr) {
            continue;
        }
        
        // search
        if (curr.value === needle) {
            return true;
        }

        q.push(curr.left);
        q.push(curr.right);
    }

    return false;
}