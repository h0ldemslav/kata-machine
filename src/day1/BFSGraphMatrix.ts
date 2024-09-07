// BFS on adjacency matrix
// source - starting node
// needle - node we're looking for
// return path (list of nodes, just their indexes in the matrix, remember each row == node) to our needle (or null)
export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    // This check wasn't in the video implementation
    if (source === needle) {
        return [source];
    }

    // seen or visited - I've already visited this node 
    const seen = new Array<boolean>(graph.length).fill(false);
    // prev - from which node you arrived at the current node
    const prev = new Array<number>(graph.length).fill(-1);

    // source is already seen
    seen[source] = true;
    const q: number[] = [source];

    do {
        const curr = q.shift() as number;
        
        if (curr === needle) {
            break;
        }

        // edges of the current node
        const adjs = graph[curr];

        for (let i = 0; i < adjs.length; i++) {
            // no connection
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;

            q.push(i);
        }
    } while (q.length);

    // If needle is not in prev, we will return [], we didn't find the path
    if (prev[needle] === -1) {
        return null;
    }

    // Build it backwards
    
    let curr = needle;
    // Path through the graph, from needle to the source, we need to reverse later
    const out: number[] = [];
    
    // Walk the prev, until we get -1, that means we've reached our source
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr]; // set to my parent; who added me to that prev
    }

    // We need to add the `source`, since it has -1 in `prev`, and it won't be included in `out`
    return [source].concat(out.reverse());
}