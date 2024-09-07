export default class MinHeap {
    // It's important to maintain the length! Because it will be used for insertion and deletion
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        // Add child to the end of the array using the length
        this.data[this.length] = value;
        // Bubble up to weakly sort
        this.heapifyUp(this.length);
        // Don't forget to adjust the length!
        this.length++;
    }

    // delete is often called poll or pop
    delete(): number {
        // Return some kind of sentinel value like -1, undefined
        // It depends on you
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        // Same as the above code (this.length-- should be removed before if statement)
        // this.data[0] = this.data[this.length - 1];
        // this.length--;
        // this.heapifyDown(0);

        return out;
    }

    // Could be either recursive or iterative
    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        // We cannot heapify down, once there are no nodes (idx >= length)
        // And we know if left index is greater or equal to length, there are no more children left,
        // because heap fills always from left to right, which does make sense
        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const v = this.data[idx];
        const lV = this.data[leftIdx];
        const rV = this.data[rightIdx];

        // Of course for those that are wondering, why would you ever want to do it this way with all these if statements, why not come up with a more elegant solution?
        // My general rule of thumb is I don't refactor unless if I see a rule of three. (Prime)
        if (lV > rV && v > rV) {
            // Swap and heapify down
            this.data[idx] = rV;
            this.data[rightIdx] = v;
            this.heapifyDown(rightIdx);
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV;
            this.data[leftIdx] = v;
            this.heapifyDown(leftIdx);
        }
    }

    // Could be either recursive or iterative
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            // We can no longer heapify up, because we've reached the root
            // There is no anything up
            return;
        }

        // Get parent idx
        const p = this.parent(idx);
        // Get parent value
        const parentV = this.data[p];
        const v = this.data[idx];

        if (parentV > v) {
            // Swap the values
            // Could wrapped in a method
            this.data[idx] = parentV;
            this.data[p] = v; 
            // Start with the parent again, since it's value has been updated 
            this.heapifyUp(p);
        }
    }

    /**
     * 
     * @param idx - index of the child.
     * @returns parent index.
     */
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        // Check, if child exists won't be here, but in the other place (of course we find out it by using length)
        return (2 * idx) + 1;
    }

    private rightChild(idx: number): number {
        // Check, if child exists won't be here, but in the other place (of course we find out it by using length)
        return (2 * idx) + 2;
    }
}