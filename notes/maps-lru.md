# Maps & LRU

## [Notes](./notes.md)
<br>

- [Maps](#maps)
- [LRU cache](#lru-cache)
    - [Remove from LRU cache](#remove-from-lru)

## Maps

> Terms
> - load factor: The amount of data points vs the amount of storage (data.len / storage.capacity). So if we had seven items in our map, and we had ten available units of storage, we'd have a load factor of 0.7.
> - key: a value that is hashable and is used to look up data. The hash has to be consistent. We use the key to create something in which we can access our value.
> - value: a value that is associated with a key
> - collision: when 2 keys map to the same cell.

> So effectively how a Map works is that, we have a key and it needs to map to value. And what the key is mapping to a value has to be, is a consistent hash.
> All right, so what this means is that when I give case of 0, right, some key, that is uniquely defined, it [hash function] will always give me the same answer back out. If it doesn't gimme the same answer back out, that's an inconsistent hash. What is it good for?

> We need a hashing function, right, that takes in the key and needs to produce out some sort of unique number.  
And this is the important part, is that we need a number. And the reason why is, let's just say k comes in [hash(k)] and it returns out some great number, and it can be a really big number. It can be a really small number if there's not anything specific to it. Then what we can do is, we can take it, and we can modulo it based on say, the **length of our data storage**, right, so say 10.

> And since we say only have ten slots, the chance of them colliding is uniformal. If they uniformly go to any number, it would be a chance of one over ten, right? It wouldn't be that great. So if you had a perfectly uniform hash generator, you get a 10% chance of collision. Which means that what happens when we collide? Well, we need a way to be able to store both [keys with values].

> What we used to do, at least how I learned it is that you'd actually do something called linear or exponential back off. Meaning we would literally go down to the next slot and put it in there.

```text
Old way, linear put
           [__]
           [__]
           [__]
---        [__]
    \      [__]
     > ->  [__]  collision happens
      >    [__]  put to the next slot
```

> So as things become less and less efficient, or more and more full, you're gonna need a larger amount of storage with a smaller amount of load factor to prevent collisions, right? Cuz the moment you have five items in here, the chance of you hitting it and then having to linearly go down gets greater, and greater, and greater.

> So in more modern ways or what I've seen is that, instead you use a list underneath the hood to be able to add in items. So you have an ArrayList, that has an ArrayList, that can add in items and then we just walk the ArrayList. We could technically also use a LinkedList underneath the hood because you do linearly walk it every single time.

```text
Modern way, each cell stores an arrayList
           [__]
           [__]
           [__]
---        [__]
    \      [__]
     > ->  [__]  [{k, v}, {k, v}]
           [__] 
```

> So how does retrieval work? Well, we go through our magical hashing function, right? We pass in a key, we go through a hashing function and produces an index, we then modulo that with the size of our storage area, and we now have an item into it. Well, the problem is, is there could be multiple items inside of any one storage unit, correct? So that's why we store **the key plus the value**.

Hash function can produce the same number for two different keys, meaning we will point to the same cell. And ArrayList basically solves the problem, so you store a list of k => v, and then you ask if key is equal to key, and if it does it's your associated value.

> Deletion, exact same thing, you go to that spot within your ArrayList, you find the associated key with the value, remove it from the entry, and there you go. You now have it removed, of course you have to decrement length.

> But there is always one problem. So, I believe the ideal load factor is 0.7 at this point. That's kind of what I believe is considered the ideal one long as you do this ArrayLists or this LinkedList style storing. If you do that, once you exceed that load factor, we need a way to be able to redo this, right?   
So something we can do is that, we can take our current data storage, what it is, and we can iterate through all of the keys that we can find. And then we can rehash them and restore them into a larger storage arena, thus cutting down our load factor, say by half if we double the storage, and then we have a bunch more in which we can store.

Maps has constant lookup time, because you just generate the hash, and the key, that is passed to the hash, is not big. It then points to the big thing (value). And your lists contain 1-2 items, so the iteration won't take long.

## LRU Cache

LRU (Least Recently Used) is a data structure.

> It's a caching mechanism that says that we will evict [to force someone to leave a place] the least recently used item.

> Well, one thing we can think about is that cash really is some sort of container, right? We're gonna build some sort of node container based system in which contains some sort of value. Now this value is what the user gave us to cache so you can think of website caching when you go to www.google.com, it's gonna pull up likely a lot of cache, right?

LRU uses doubly linked list.

```text
V0 <-> V1 <-> V2 <-> V3 <-> ...
```

> Now the thing about this is that all these values need to be stored in such a way that if the user says hey, do I have value 2? I should be able to pull out value 2 and say yes you do. Here's the value, but more than just that, I need to take value 2, and I need to move it to the head of the queue, right?

```text
V0 <-> V1 <-> V2 <-> V3 <-> ...

V2 <-> V0 <-> V1 <-> x <-> V3 <-> ...

most                         least
recently                     recently
used                         used
v                            v
V2 <-> V0 <-> V1 <-> V3 <-> ...
```

But how do we retrieve the value? We need to use a **hashmap**, so we don't have to use traversal, that is costly (linear complexity).

> There's always two generics associated with a HashMap a key and a value. But the problem is, of course, that our key and our value, well, what is our value? Well, our value needs to be a node within the linkedlist so we can instantaneously jump to that point within the list.   
So if you think about it, this could solves the traversing effect of a linkedlist, you don't have to go through it sequentially you jump right to the value that exists, if it doesn't you don't jump to it.

So node will be the value.

> Here we're gonna use a key of some sort to jump straight to the value, and the value is actually gonna be a container class of node, which means we're literally going to have a HashMap that has items inside of it that also have pointers to other items.

### Remove from LRU

> So how we remove an item from the LRU is we do need to still have a tail pointer, right? We need to be able to point to the end of the list, as much as we able to point to the front of the list, the front is for when we update the cache, the tail is for when we need to remove from the cache an item. So let's say we set our capacity to 10, the moment we have 11 items inside of our cache, we now need to downgrade and remove the oldest possible item which always will be at the tail because every time we get something, we have to update the cache.

We don't return value of the evicted item.

See implementation in `LRU.ts`