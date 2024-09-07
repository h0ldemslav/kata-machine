function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    // `dists[i] < Infinity` check is necessary
    // because you can have your source NOT at the beginning (not the first)
    // and if this check isn't present, than first element with Infinity
    // will be taken, because this is the way `some` works
    // which doesn't make sense and that's why the check is necessary
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }
        
        if (dists[i] < lowestDistance) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number, 
    sink: number, 
    arr: WeightedAdjacencyList
): number[] {
    
    const seen = new Array<boolean>(arr.length).fill(false);
    const prev = new Array<number>(arr.length).fill(-1);
    const dists = new Array<number>(arr.length).fill(Infinity);
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        const adjs = arr[curr];

        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];

            // Use edge.to, not i! It's not an adjacency matrix!
            if (seen[edge.to]) {
                continue;
            }
            
            // Distance to the node from our current node we are at
            const dist = dists[curr] + edge.weight;
            
            // Use edge.to, not i! It's not an adjacency matrix!
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];

    // This wasn't in the Prime's implementation
    // Return empty array, if needle wasn't found
    // If this check is not present, then [source] returned, which doesn't make sense
    if (prev[sink] === -1) {
        return out;
    }

    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        // Last node who updated our distance to the new shortest distance
        curr = prev[curr];
    }

    // We need to add the `source`, since it has -1 in `prev`, and it won't be included in `out`
    return [source, ...out.reverse()];
}