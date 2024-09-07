type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    
    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };

        // BOOK KEEPING!
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;

        this.head.prev = node;
        this.head = node;
    }

    // Inserts BEFORE the node with the index
    // So if idx = 2, then a new node will be inserted ahead of node with index 2
    insertAt(item: T, idx: number): void {        
        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        // BOOK KEEPING!
        this.length++;

        // 1. Attach new node

        const curr = this.getAt(idx) as Node<T>;
        const node: Node<T> = { value: item };

        node.next = curr;
        node.prev = curr.prev;

        curr.prev = node;

        // 2. Break the links
        if (node.prev) {
            node.prev.next = node;
        }
    }

    append(item: T): void {
        const node: Node<T> = { value: item };

        // BOOK KEEPING!
        this.length++;

        // In some type systems you could do
        // if (this.length === 0) {
        //     this.head = this.tail = node;
        //     return;
        // }
        // However, TS doesn't understand it, so do it like this

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {        
        let curr = this.head;

        for (let i = 0; i < this.length && curr && curr.value !== item; i++) {
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        
        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        // BOOK KEEPING!
        this.length--;

        if (this.length === 0) {
            const value = this.head?.value;
            this.head = this.tail = undefined;

            return value;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;

        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx > this.length) {
            throw new Error("Out of bounds");
        }

        let curr = this.head;

        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr;
    }
}