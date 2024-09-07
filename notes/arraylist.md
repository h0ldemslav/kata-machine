# ArrayList

## [Notes](./notes.md)
<br>

Can we do better? Can we have an array access with the ability to grow? 

Yes!

We can combine both worlds, arrays and lists. And this will be an *ArrayList* (sometimes referred as dynamic arrays, because they can grow).

So imagine you have an array like this:

<div id="example1">

```text
[2, , ] // max 3 elements
```

</div>

The length is 1, but the *capacity* is 3.

Capacity is the total number of elements that the ArrayList can hold without requiring reallocation. (taken from vector cpp reference) See more in [Exceeding the length](#exceeding-the-length).

Get operation could be `get(idx)`, where we control, if `idx` is within our length (< length). If not we throw, or return undefined, more JavaScript way.

We can also push. We ask if the length is within our bounds (in the previous example it's 1), if so then push a new element and increment the length. If not then we need to create a bigger array, copy the elements and then add this new one. See more in [Exceeding the length](#exceeding-the-length).

**So, the basic idea is that you're using an array as your data type instead of a node based structure, like linked list. And then you add list's operations (pushes, pops, ...)**.

The complexity of push/pop is constant, because you just use length, and it doesn't matter, how the input is big.

Pop is simple. You just grab the last item, return its value and decrement the length. Then the item is not *accessible*. Though physically it is still in the array, but logically it's not. Length represents the tail of our array, while head is a 0th item.

You don't have to clean the item, if it's a primitive value.

> We don't actually zero out the data. You could zero out the data if you want to, but you also don't have to zero out the data with **primitive structures**.  
If you're using a language that uses pointers, you can technically still leave them in there because there's nothing that you're actually doing, right? Unless if it's of course a shared pointer, using some like rust, blah blah, there could be all different ways in which you would want to clean this up.
But in general, if we're just talking about a simple array underneath the hood, you don't actually have to clean it up because you are using length to keep track of what you own, right? And you only clean up as you need to.  
In Java land you'd probably want to set it to null, because nulls release a pointer to an object, thus it can be garbage collected, right?

## Exceeding the length

What happens, if we push, but we've run out of our capacity? (length == capacity) What can we do? 

We can create a new array, a bigger one and let's say it will be double of our capacity (6, according to the [previous example](#example1)).

> Then we could mem copy or just do a for loop, and copy them in one at a time, where we actually move over all of our values. Then our length would still point right here [length == 3], our capacity now becomes six, and we can now easily handle the push operation.

> So this is effectively what an ArrayList does underneath the hood,is it contains some actual array structure, and then helps you make it so that it's dynamic, that it grows.  
That's why you're always gonna see a capacity on a lot of these more traditional structures, is because it actually is starting off with hey, give me a hint about how much you want to use. In that way I don't allocate too much memory, and that way you're not using a bunch of empty space.

> Cuz if it starts off by saying hey my initial capacity is 30,000, that could be way too much. It's just wasting a bunch of memory. So it's a game here. There's definitely a game you have to play in which you want to be as, use the least amount of memory but do the least amount of growing operations.

## Queue-like, insert/delete operations

What happens, if let's we have an array `[1, 2, 3]`, with length 3 and capacity 3, and we want to insert a new element to the beginning, so enqueue?

Firstly, we need to create a new array, let's say with a capacity of 4 and then **we need** to copy and **move** all elements by one position, because we need a space in the beginning, right? And this is a problem. Because we now have O(N) complexity. (JS `Array.prototype.unshift` method has O(N), by the way)

> And so that's why often you'll see people getting up in arms about using insert into the front of a list, because if it's an ArrayList you have to do an N-like operation, and actually shift over all of your underlying values.  
And that's why you see people liking, say queues with node-based items, because you can do this in O(1) operation, not O(N).

Same thing with deque (in js, `shift`). We remove from the beginning and now we need to shift all elements back by one.

Same, when you want to insert/delete in the middle. These are O(N) operations. For instance, in JS it's the `splice` method.

So ArrayLists operate best when treated like a stack.

What to use: ArrayList or linked list? The correct answer is: **IT DEPENDS**.

> If you're pushing and popping from the end, well, either a Linked List or an ArrayList can work quite well. You get a little bit more conveniences cuz often with an ArrayList you also have like say an angle bracket accessing. You can have that with a Linked List, but doesn't often happen.

> But at the exact same time you have random access with an ArrayList. Give me index three. That's constant time. That's really really good, but you do not remove from the front.

> So there's definitely a trade-off somewhere on there that you have to be careful of. Getting sucks on Linked List; removing from the front, sucks on ArrayList. And so long as you can explain that to your interviewer, they're usually pretty happy about that.