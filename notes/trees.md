# Trees

## [Notes](./notes.md)
<br>

## Overview

Where are the trees

- File system - on Windows you have C:\ and it contains folders, the folders contain subfolders, etc. So it's kind of a tree structure
- HTML and DOM
- Abstract Syntax Tree (important for compilers/transpilers, see how the [syntax tree for js](https://astexplorer.net) looks like)

Tree is kind of a linked list. It consists of **nodes**, where each node has a *value* (generic) and an array of *children* (possible connections, 0 or more).

<span id="tree-example-html"></span>
```text
       HTML
        O       <- node (has a value and children)
      / | \
    ...   BODY
           O
          / \
        DIV 
         O      <- height (from root to the most ancestor)
```

### Terminology

- Root - the most parent node. The First. In case of HTML it's `<html>`

- Height - the longest path from the root to the most childish node (the greatest descendant). It's basically a maximal number of levels below the root.  
Trees don't have to be balanced, i.e. paths don't have the same height. So if most of your branches are going to be at the level of 3 and one is at the level of 100, then the height is 99 (number of edges - 1).
- Binary tree - most frequent data structure. Tree with at max two children. They usually have `left` and `right` properties instead of an array of children, because a node can only have at most 2 children. Root, height etc. of course applied to this kind of tree.

```text
        O
      /   \
     O     O
    / \
   O   O
```

- General tree - a tree with 0 or more children. [Example](#tree-example-html).

- Binary search tree - a tree in which has a specific **ordering** to the nodes and at most 2 children. Usually they have a *strong* ordering like 1, 2, 3, 4, 5. Weak ordering is like

```text
    1 (everything below is larger than me)
  /   \
 5     2 (everything below is larger than me)
```

- Leave - a node that doesn't have children.

- Balanced tree - all leaves are on the same level (same height). This is a *perfectly* balanced tree. The more tree is imbalanced the more problematic some algorithms become. It's not easy to keep the tree balanced. (Prime)

- Branching factor - how many children there are? Example: a binary tree has branching factor of 2. General tree - infinity, you don't know how it's big. (Prime)

There are other types of trees. But in this course only binary tree and general tree will be discussed.

QuickSort is a binary tree (recall the partition?) in some sense.

## Traversals

> So traversals are your most basic operation you can do on a tree. A traversals where you attempt to visit every single node.

> And practically speaking, a lot of trees will also have a parent reference. So they can go both ways, especially if you're doing rotations and other things.

> So a traversal is as simple as this. Is that you're gonna do something called *visiting a node* (`visitNode`). Which means you're gonna do something with the value of the node.

> And then we're going to recurse. Recurse, of course, is that fun operation of calling a function to do the same thing again, but on a new node. ... We're gonna have a pre or a post and a recurse step. And so there's 3 types of tree traversals.

*Pre order* traversal: start from the root, visit that node and then recurse (left most node, if it is a leave, pop back, traverse to right and so on).

```text
        O<- 7 (the first, then go left)
      /   \
     O 23  O 3
    / \     / \
   O 5 O 4 O 18 O 21
```

First `visitNode()`, then `recurse()` (left, then right). So if we just print the value of each node, then the above example will be like: `7 23 5 4 3 18 21`. Notice that root is at the beginning.

Let's say you change the order like this: `recurseLeft()`, `visitNode()`, `recurseRight()`. If we do so, then: `5 23 4 7 18 3 21`. This is know as *in order* traversal. In some algorithms traversing this way will make a difference. Notice that root is in the middle (applies only to binary?).

The last traversal is known as *post* traversal. We visit a node, but after doing the recursion (left and right). This is useful, when you have a traditional language, where you need to cleanup the memory.

> You first have to get to all the children, and then on your way out you have to delete back up.

So the post traversal would be: `5 4 23 18 21 3 7`. Notice that root is at the end.

The input is the whole tree (nodes) and so the complexity of traversals is O(N). If you double the input it will be 2N, but again it's a linear complexity. This is a good way to distinguish between the O(N) and O(N^2).

Linear makes sense, because you have to visit each node.

## Implement Tree Traversals

See `BTPreOrder.ts`, `BTInOrder.ts`, `BTPostOrder.ts`.

These types (pre, in, post) of traversals are called *Depth First Search*. 

**IMPORTANT**: Depth first preserves the shape of the traversal (Prime). Breadth first search does not. So if you're comparing two trees with the same values, but different shape breadth first search will return true. See more in [Tree Search - Search Practice](./tree-search.md#search-practice).

Why is it called Depth first?

> If we do an in order traversal we are going to go left all the way until we can no longer go left.  
In other words we're gonna go **as deep as possible** in this tree on the left hand side and then visit a node.  
Then we're gonna go right once and then go as left as deep as possible and then come back and visit that node.  
And so if you think about we always go depth first, right that's what that means, that's why it's called the DFS or depth first search or depth first traversal.

Note then you call the recursive functions, you actually implicitly use a stack structure!

```text
        O<- 7
      /   \
     O 23  O 3
    / \     / \
   O 5 O 4 O 18 O 21
```

So if we do the in order traversal, we first add 7 node, then 23 node, then 5 node. Then we print out the value of 5 node and try to go left/right and then we pop it off.

This helps to visualize the recursion. You just push and popping on a stack.

> That's all you're doing which means we can technically do any of these traversals without using recursion. We just simply have to add the children to a stack.