# Heap

## [Notes](./notes.md)
<br>

- [Fundamentals](#fundamentals)
- [Heap: Insertion](#heap-insertion)
- [Heap: Deletion](#heap-deletion)
- [Heap: array comes to play](#heap-array-comes-to-play)
- [Time Complexity](#time-complexity)
- [Some characteristics of Heap](#some-characteristics-of-heap)
- [Trie](#trie)

## Fundamentals

Heap is another data structure and it represents a priority queue.

> The simplest way to put it is a binary tree [NOTE: heap may be implemented not only as a binary tree] where every child and grand child is smaller (MaxHeap), or larger (MinHeap) than the current node.
> - Whenever a node is added, we must adjust the tree
> - Whenever a node is deleted, we must adjust the tree
> - There is no traversing the tree

> You don't traverse this tree, though we could traverse the tree, you don't traverse the tree. And it'd be actually extremely simple to traverse it in breadth first ordering.

> So I'm just gonna put a value, 50, let's start with a min heap. So a min heap means that the top value must be the **smallest**. Obviously, if you have duplicates, say we had more 50s, they could be children of 50, that's just fine.

```text
        50   <- MinHeap (top value is the smallest)
      /    \
     71    100
    / \     /  \
   101 80  200  101
```

Everything below 50 should be greater than 50. Everything below 71 should be greater than 71, etc.

But it looks strange, isn't it? For instance, 80 is under 71. Shouldn't be it in 100 left side, like Binary Search Tree (80 > 50 go right, 80 < 100 go left, insert)? No. Because heap maintains a weak ordering, it's not perfectly ordered. 80 is greater than 71, so the condition is preserved.

> And so, what this is called is the **heap condition**. The heap condition effectively states, if it is a min heap, that every node below me must be larger than or technically equal to.  
If it's a max heap, it states that every node below me must be smaller than or equal to. Cuz obviously, a max heap means the maximum item is the root, a min heap means the minimum item is the root.

So the benefit is that you can get the smallest value/largest value in a constant time, because it's at the top of the heap (peek operation).

> Heap is usually full or complete tree, meaning that it's always adding from left to right, and it never has any empty spaces.

For example, this is not a heap structure (we have gaps in the middle):

```text
        50 
      /    \
     71    100
    / \     /  \
   25  x   x   101
```

## Heap: Insertion

```text
        50 
      /    \
     71    100
    / \     /  \
   101 80  200  101

Add 3

        50 
      /    \
     71    100
    / \     /  \
   101 80  200  101
   /
  3

Our condition is not preserved so we bubble up and ask, if the curr is less than its parent, and if so, we swap.

        50 
      /    \
     71    100
    / \     /  \
   3  80  200  101
  /
101

        50 
      /    \
     3    100
    / \     /  \
   71  80  200  101
   /
 101

         3 
      /     \
     50     100
    / \     /  \
   71  80  200  101
   /
 101

Min heap condition is preserved.

Add 200

         3 
      /     \
     50     100
    / \     /  \
   71  80  200  101
   / \
 101  200

It's easy, we don't need to bubble, the heap condition is already OK. (200 > 71)
```

## Heap: Deletion

```text
         3 
      /     \
     50     100
    / \     /  \
   71  80  200  101
   / \
 101 200

 Remove 3 (since it's a queue, we remove it in FIFO manner)

         x
      /     \
     50     100
    / \     /  \
   71  80  200  101
   / \
 101 200 

What's next? So we take our last added node, delete it and put it at the top. 

        200 
      /     \
     50     100
    / \     /  \
   71  80  200  101
   /
 101

So we heapify up, now we need to heapify down

So we take minimum of the two children and compare against that.

So what is smaller, 50 or 100? 50. Is 200 > 50 ? Yes, swap them.

71 or 80 ? 71. Is 200 > 71 ? Yes, swap them.

101 (only one child). Is 200 > 101 ? Yes, swap them.

        50 
      /     \
     71     100
    / \     /  \
  101  80  200  101
   /
 200
```

But how did we get 200? It's the last added node, how did we get it?

## Heap: array comes to play

We could use a linked list for heap, but it will be very hard to manage ([Explanation](https://cs.stackexchange.com/questions/41719/the-most-appropriate-way-to-implement-a-heap-is-with-an-array-rather-than-a-link)). So instead we could use an array.

So you have the following heap

```text
        50 
      /     \
     71     100
    / \     /  \
  101  80  200  101
   /
 200
```

And it will be stored in array as:

```js
[50, 71, 100, 101, 80, 200, 101, 200]
```

Why in that way? Because you can very easily compute the indexes of the children. So 50 is the first node, right? Then its left child will be `2 * i + 1`, which is 1 (2 * 0 + 1). The right child will be `2 * i + 2`, which is 2 (2 * 0 + 2). Those formulas are applicable than heap is like a binary tree. It may not be implemented as a kind of binary tree, even though it's the most common heap ([Explanation, read comments to the best answer](https://cs.stackexchange.com/questions/41719/the-most-appropriate-way-to-implement-a-heap-is-with-an-array-rather-than-a-link)).

But this is only downwards. How about upwards? Well you could calculate the parent, depending on if your index odd or even. But actually, if you think, you need only one formula for this: `(i - 1) / 2`. Since in JS the division returns you a floating point number (unlike in other languages), you need to floor, so `floor( (i - 1) / 2 )`

But how to get the last node! The length!

> Just keep track of how many items you have in your queue and that will be literally where you need to insert into your array.

> There is one more operation that we won't be doing today, but we will be covering later cuz it greatly affects how an algorithm runs, which is updating.  
So, if you ever want to update a node, update a value in a priority queue, you really have to keep track of every single node with a value to index or index to value, kind of hash map.  
That way you can say, hey, I'm 17, where am I? I'm right here. Okay, therefore, let's bubble me up or bubble me down, because I'm gonna change my value from 17 to 25, right? So we're gonna need to know how do we bubble ourselves in that.  
So that one just adds a lot of complexity to it, but it will also make some algorithms way faster if we can do that. Typically, priority queues you usually don't consider update as something you do, but in this case, we could.

## Time Complexity

The time complexity is O(logN) for both, insertion and deletion.

> Hopefully you understand now, of course it's log n cuz every single layer multiplies by 2, half the tree is always in the bottom layer, therefore blah blah blah blah blah.

## Some characteristics of Heap

> This thing is self-balancing, right, it always maintains a perfectly balanced binary tree, cuz we're only really removing or adding right at where the length is, and then bubbling it up into the correct position.  
It can be used for priority, so think of thread scheduling, think of all the great stuff right there.   
And of course, it's the funnest data structure to implement, easy to get wrong, but still the funnest one to do.

See implementation in `MinHeap.ts`.

> Careful about garbage. Your array may contain some items if you did not properly clean them up. So, be careful. We're using a number array, so we don't actually have to be careful. But if you're using an array that's generic over T, you may want to put in something like null or undefined. Make sense? All right.

## Trie

> If it's not a priority queue, it's a trie.

It should be pronounced as *tree*, because it's from the word *reTRIEval*, but usually you will hear *try*. Sometimes it is called *digital* or *prefix* tree.

> The easiest way to visualize a trie is to think of auto-complete.

> So if I type in A, what should you give me back? What kinda results should you give me back? That's just a trie, that's all it is, and it can do it in O(1) time given that the keys meet some sort of minimum length or some sort of length, that they fall within, like the English words, an English word can only be so long. There's not a thousand-letter long English word, so therefore, you can't have that, so constant time lookup.

The explanation will be on the English tree. Our tree (or more precisely root node) could have one of [26] possible symbols (English alphabet) as its children (we don't include capital letters and other symbols). And children can have their own 26 children etc.

Let's pretend we build a spellchecker

```text
              O      <- root, doesn't have any value

We want to add word "cat"

              O      <- root, doesn't have any value
            /
           c
          /
         a
        /
       t
```

We're gonna mark node with value `t`. There are two methods:

> One of them is that it has one last child called the asterisk child, and that denotes, hey, this path that you're on is a word. The other way you can do that is that the nodes themselves contain some sort of isword Boolean flag. I kinda like that approach better than having this star approach because then you have to go check the 27th child. And then if the 27th child exists, then you know for a fact.

```text
We want to add word "cats"

             O 
            /
           c
          /
         a
        /
       t
      /
     s   

We want to add word "cattle"

             O
            /
           c
          /
         a
        /
       t
      / \
     s   l
          \
           e

We want to add word "card", and then "marc"

             O      <- root, doesn't have any value
            / \
           c   m
          /     \
         a       a
        / \       \
       t   r       r
      / \   \       \
     s   l   d       c
          \
           e
```

> Now we can traverse and find out. So if someone starts typing C, what do we have to do to give you some amount of autocomplete back?

We traverse and searching for "c" branch. We have one.

> So often what this is done is usually the C branch in this case would represent index 2.

Why? Because "a" is our first symbol (zero index) in the alphabet and it's ascii representation is 97 and "c" representation is 99. And we get 99 - 97 = 2.

> So you're able to kinda do this little game where you're actually just minusing character stuff out, ASCII symbols, blah, blah, blah, blah, so you can kinda go into your array. You can also do this with unicode and other stuff, but it may be, I don't know how it works in JavaScript. But if you have a proper language that can give you an integer value out, you can offset into it and do these kinda cool little tricks.

> So that means if we were to go to C, someone types a C, and we want to display a list of words, how are we gonna do this?

> Well, what we're gonna have to do is we're gonna have todo a depth first search, right? We can technically also do a breadth first search, depends on how we want our words out. If we want them, say sorted naturally by, say alphabetical ordering, if we do a depth first search, we will always get ourselves the alphabetical ordering.   
That's all we have to do is do a pre-order traversal, as we see a word, we put it into our results. And there we go, we'd actually get cat, cats, cattle, card, and that'd be great.

But the problem is that we will have a huge number of words and how can we find the right words? Answer: we add score (frequency to our words). By using a score we can put most used words by the user on top.

Insertion and deletion are the hardest part (Prime).

Insertion pseudocode:

```text
insert(str)
  curr = head

  for c in str
    # curr has the character
    if curr[c]:
      curr = curr[c]
    else
      # 26 - English alphabet
      # Node: { isWord: bool, children: Node[26] }
      node = createNode()
      curr[c] = node
      curr = node
  
  curr.isWord = true

```

> We're just walking to the end inserting if we need to insert.

> Deletion, of course is the exact opposite, easier to use recursion for deletion, because you want to get to the point of the node. And then in post operation, you want to delete your way back up.

Trie is often asked on interviews. (some variations)

> Interview question is often like, I have a list of words and I wanna build an autocomplete, when you hear the word autocomplete, be like, gotcha, right?

> Or I wanna build a caching mechanism, often caching mechanism if you can see a path that they want, and the path can vary in various points

For instance, we have a path to our data: videos -> id -> title

Do we have videos? Yeah, awesome! Now id, do we have that id? Yes! Do we have that title? Yes, here is your cache.

We don't have id/title? No cache.

Time complexity?

>  So it is constant time cuz you have to determine what is N?   
N in this case is not the string we're inputting into the algorithm, it's the amount of nodes. As we add more and more nodes, as we add hundreds upon hundreds of words, does our lookup time change? It doesn't change, it's based on some finite predetermined amount of length. If the longest English word is 12, then you're right, it's 12 node checks and that is it. So that's a constant time is that's how you can think of it.