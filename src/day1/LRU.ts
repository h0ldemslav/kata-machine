type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    // We need a second map, so we can clean `lookup`
    // We don't want to store data about nodes that were evicted
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }
 
    // Notice: where is not insert
    // because we don't know, if you have the value in the cache
    // If it's in the cache - move to the front
    // If it's not - add to the front  

    // One tricky part is if we change the value right here, then we may not want to use that. Now, in some LRUs, we have this whole rule that if the key already maps to an item in the cache, we're not technically updating the contents of the cache, we're only updating its position within the list. For us, we're gonna actually update the contents of the cache as well, assuming that it's meant to be changed. (Prime)
    update(key: K, value: V): void {
        // Does it exist?
        let node = this.lookup.get(key);
        if (!node) {
            // Doesn't? Insert. But before check capacity and evict if over
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // Does? Update to the front of the list and update value (see above that it's not done in some LRUs)
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    // Move to the front
    get(key: K): V | undefined {
        // Check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // Update the value and move to the front (we've used it, no longer least recently used)
        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    // It's easier to think of linked list operations, when you break them up
    // Like below we've created `detach` and `prepend` functions

    // Note: detach doesn't alter the length
    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        // We don't need this check
        // Because if length is 1, then the next two checks will still achieve the same
        // That means make head and tail `undefined`
        // Even if length is 1
        // if (this.length === 1) {
        //     this.tail = this.head = undefined;
        // }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        // We already know the length exceeds capacity (so tail exists)
        this.detach(tail);

        // The key should exist, otherwise we've messed up our insertion!
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}