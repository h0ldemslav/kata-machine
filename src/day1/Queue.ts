type QNode<T> = {
    value: T,
    next?: QNode<T>
}

export default class Queue<T> {
    public length: number;
    private head?: QNode<T>;
    private tail?: QNode<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item } as QNode<T>;

        // Don't forget to update the length!!!
        this.length++;

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
 
        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) { 
            return undefined;
        }

        // Don't forget about the length!!!
        this.length--;

        const head = this.head;
        this.head = this.head.next;

        // Here must be a cleanup, if the language doesn't have a garbage collector
        // In JavaScript to make even better we can do
        head.next = undefined;

        if (this.length === 0) {
            // So we make sure there no references
            this.tail = undefined;
        }

        // Return the value is necessary
        return head.value;
    }
    
    peek(): T | undefined {
        return this.head?.value;
    }
}