# Stack

## [Notes](./notes.md)
<br>

Stack is a data structure, which looks like a queue, but it works backwards. It uses LIFO principle - Last In First Out. 

In other words the last element inserted inside the stack is removed first.

So it looks like this:

```text
A <- B <- C <- D

               ^
               head
```
So imagine the stack was empty. We first **push** A, then we push B, then C, and then D.

```text
A <- B <- C

We want to add D

const head = this.head; // C
this.head = D;
this.head.prev = head;

Or shorter

D.prev = this.head;
this.head = D;
```

If we want to remove (**pop**), let's say B, we need to remove D, then C, and then B.

```text
A <- B <- C

          ^
          head

const head = this.head; // C
this.head = this.head.prev;

A <- B <- C

     ^
     head

head.prev = undefined;

A <- B

return head.value
```

Peek operation is exact same as in queue. Take the head and return the values (if there is, otherwise undefined).

**So you only add/remove from the head.**

> The big thing that you'll definitely see them [stacks] with is coming up here when we start doing recursion, it's really good to think of calling functions like a stack.

> But it just helps give you a mental model of what's going on actually with in the computer cuz when you do call a function it is actually on something like a stack.

> In fact, the memory that it uses is called the stack for a reason, because it is only going up and down.