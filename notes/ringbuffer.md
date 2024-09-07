# RingBuffer

## [Notes](./notes.md)
<br>

> So effectively, you can think the exact same thing as an ArrayList, right, where you have 0 to N. And you have some sort of array-like storage. The only difference is that we're not using 0 as our head, and length as our tail. That's what's happening in ArrayList, you can kind of imagine it kind of a LinkedList.   
Instead, what we're gonna have is we can literally have **index based head**, and we can have **index based tail**. And so they exist somewhere within the list.

RingBuffer is a circular queue that uses array instead of a linked list.

As elements are added and removed to this array, head and tail move forward (they're increased each time you enqueue/deque). When they reach the end of the array, they wrap around to the beginning, hence the "circular" nature of the buffer.

[Circular buffer (Wikipedia)](https://en.wikipedia.org/wiki/Circular_buffer)

[Good Tutorial on How To Implement RingBuffer (in C)](https://www.youtube.com/watch?v=oyX30WVuEos)

ChatGPT short summary:

A **ring buffer**, also known as a circular buffer, is a data structure that uses a fixed-size array in a way that the end of the array wraps around to the beginning, forming a circle. It is commonly used for buffering data streams, such as in networking or audio processing, where data is produced and consumed at different rates.

### Main Points:
1. **Structure**:
   - A ring buffer is implemented as an array of fixed size.
   - It has two pointers: a **head** (or read pointer) and a **tail** (or write pointer).
   - The **tail** points to where data will be written next, and the **head** points to where data will be read next.

2. **Circular Nature**:
   - When the head or tail reaches the end of the array, they wrap around to the beginning. [My note: they will have index of 0]
   - This makes efficient use of memory, allowing continuous data buffering without shifting elements.

3. **Operation**:
   - **Enqueue (write)**: Add data to the buffer at the position pointed to by the tail, and then move the tail forward.
   - **Dequeue (read)**: Remove data from the buffer at the position pointed to by the head, and then move the head forward.
   - The buffer is considered **full** when the tail is one position behind the head.
   - The buffer is **empty** when the head and tail are at the same position.

4. **Use Cases**:
   - Common in scenarios where data is produced and consumed at different rates, such as in **audio processing**, **network packet buffering**, **streaming**, and **multi-threaded** environments.

5. **Advantages**:
   - Efficient use of space with fixed-size memory.
   - Simple implementation for FIFO (First In, First Out) queues.
   - Prevents buffer overflow by overwriting old data in circular fashion (in some implementations).

6. **Disadvantages**:
   - The fixed size may lead to data loss if the buffer becomes full and new data is overwritten (in non-blocking implementations).
   - Not suitable for use cases requiring dynamic resizing.

___

In a ring buffer you can have a `get(idx)` method and you can't rely on a physical placement of items in the array!

Imagine you have a ring buffer

```js
[A, B, C, D, E]

       ^ head
 ^ tail
```

So you removed `A` and `B` and the head is on `C`, so head is 2. You then remove `C` and the head became 3.

Tail is 0 and you add one item, `F`, so:

```js
// A is overwritten due to the nature of the ring buffer. 
// Tail was 0, because it wrapped around and rewrote the beginning and increased by 1 or more precisely: (tail + 1) % capacity.
[F, B, C, D, E]

    ^ tail
          ^ head
```

So then you `get(0)`, for example, the offset will be calculated as `(head + idx) % capacity` and you will get `D`, because (3 + 0) % 5 = 3. The next (`get(1)`) will be E and the next (`get(2)`) will be `F`!!!

So this is a logical indexing, you're relying on the head and tail indexes and they're circulating around the array whenever you add/remove.

The module operator ensures you always have an index within the array.

The modulo operation also ensures that once the internal array is exhausted, the indexing wraps around, giving you the correct logical order of elements in the buffer. 


So you'll often see a tail like this (same with head)

```js
this.tail = (this.tail + 1) % this.capacity;
```

Instead of this (even though it's totally valid and works)

```js
this.tail = this.tail + 1;
if (this.tail >= this.capacity) {
   this.tail = 0;
}
```

The code with modulo is more frequent.

See implementation in `RingBuffer.ts`.