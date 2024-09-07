# Arrays vs. Linked Lists

## [Notes](./notes.md)
<br>

Here is a comparison of these two data structures by these 3 criteria:

- Usability
- Time
- Space

## Arrays

Usability: indexes access. It's fast and you're able to set or get any value by constant time.

You just allocate some contiguous unbreaking memory space with fixed length (you cannot change it) and then use it. (accessing items by offsets, where offset is index + width_of_type)

But the problem is that there is not literally insert/delete, there is only write. You just rewrite, you don't really insert/delete.

Time: O(1) everything. Get, write is a constant operation and it's fast.

> So one thing that's unique about an array is that you obviously allocate this all upfront.

That means, let's say you want to store a 100 numbers in an array. You might use all of them, but also only part of them.

Whereas a linked list is a bit more optimized in that case. Because you can add dynamically (really add, not overwrite) and remove dynamically, thus changing the amount of space you have.

But there are some runtime costs.

> With an array the memory has already been retrieved, it is already there, so you can easily use what you have.

> So it tends to have really great performance, the constancy that is there, just as smaller now, you could obviously create some sort of object pool, hold on to all the deleted nodes [mentioning linked list]. So that way you're not creating a bunch of new ones ways to speed up a list.

> But still, you are creating a containing node, you're setting up links, it's a little bit more cumbersome than say an array. One thing that's nice a linked list, though, is just always will use less memory, but the usability of a list is a little bit different, right?

Usability of linked list: if you want to get an item out of list (not from the start/end), you need to traverse through the whole list. And it's always a linear search, you can't use binary, since the nodes may not be located in the same space. And if you have a big list, this can destroy performance.

So for this is better an array, because you can access element by indexes.

Lists are good, than you want to add items dynamically to the start/end.

Example:

> Say on your front end, you don't want to have more than five network operations happening at one point.  
For whatever reason, you've decided this is the case, well, then you're gonna have these promises that are generated. They go off, but you only want five of them active at any one point, that means you're gonna have to pull off the front and you're able to push onto the back as new ones come in and as old ones complete.  
So you have this whole problem of a queue, but you don't want to be using an array if it's a really highly used one because now you're shifting all these indices around using a JavaScript array. It's not gonna perform very good, it seems like it's a bad idea. [because js doesn't uses real array, it's an array list with its own tradeoffs]

## Conclusion

> So it's good to know what you have and when you want to use some something. Always play that over in your head.