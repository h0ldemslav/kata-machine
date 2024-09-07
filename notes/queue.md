# Queue

## [Notes](./notes.md)
<br>

> So we're gonna get to the point where we're gonna run into, is this an algorithm or is this the data structure. Well it uses the data structure, and then performs an algorithm on top of the data structure.

FIFO - First In First Out - this is basically a queue. So a new element is appended to the end. But the pop off operation is done from the **beginning** of the queue, the head.

More precisely queue is a specific implementation of a linked list.

Interesting note: Brits call queue, but Americans call it a line.

Here is an example of insertion or enqueue

```text
A -> B -> C -> D

We want to add an E. So because it's a queue (line), we append it to the end.

So want we need to do?

Append E and set E as a tail, D is no longer a tail part.

A -> B -> C -> D -> E

In JS/TS it would be

this.tail.next = E;
this.tail = E;
```

NOTE that a singly linked list is used, because we don't need to store prev references, we don't need that extra computation. We don't need that storage property. We need just a minimal stuff.

Here is an example of the pop off or deque (deletion)

```text
A -> B -> C -> D -> E

So we first store current head

currentHead = this.head;

Then we change links

this.head = currentHead.next;
currentHead.next = undefined;

And (assume this is performed in a method) we need to return THE VALUE! Remember in a linked list the value is wrapped in a node. And also decrease a length, since queue has a property that stores length.
```

Queue is simple, constrained (we can only add or **enqueue** to the end and pop or **deque** from the start), but it's fast, because of constant operations (pop and append). We don't need to traverse.

Peek is another operation and it just tells what is my first element (just head.value).