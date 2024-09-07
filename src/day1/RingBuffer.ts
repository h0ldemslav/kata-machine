export default class RingBuffer<T> {
    public length: number;
    private head: number;
    private tail: number;
    private capacity: number;
    private items: Array<T>;

    constructor(maxSize: number) {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.capacity = maxSize;
        this.items = new Array<T>(maxSize);
    }

    push(item: T) {
        if (this.isFull()) {
            return;
        }

        this.items[this.tail] = item;
        this.length++;
        // Don't forget about exceeding array length!
        // You could solve this like so
        // this.tail = this.tail + 1;
        // if (this.tail >= this.capacity) { this.tail = 0; }
        // or
        this.tail = (this.tail + 1) % this.capacity;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.head];
        this.length--;
        // Don't forget about exceeding array length!
        // You could solve this like so
        // this.head = this.head + 1;
        // if (this.head >= this.capacity) { this.head = 0; }
        this.head = (this.head + 1) % this.capacity;

        return result;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            throw new Error("Out of bounds");
        }

        return this.items[(this.head + idx) % this.capacity];
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    isFull(): boolean {
        return this.length === this.capacity;
    }
}