# Tree Search

## [Notes](./notes.md)
<br>

## Breadth-First Search

Queue is used for BFS, while stack is for DFS.

> In other words, it's a tree level kind of visiting. You'll visit one level of the tree at a time. And this is true even if the tree is kind of sparsely populated, even if it's just a bunch of little lines and then maybe every now and then a parent with two and then keeps on going. It will always follow the level of the tree, each iteration.

<span id="bfs-graph-example"></span>
```text
first          -> O
                /   \
second      -> O     O
              / \    / \
third     -> O   O  O   O
```

Demonstration of how it works as a queue

```text
        O 7
      /   \
     O 23  O 8
    / \     / \
   O 5 O 4 O 21 O 15

add the first node (root) and its children

7 -> 23 -> 8

print 7, pop off 7

23 -> 8

add children of 23

23 -> 8 -> 5 -> 4

print 23, pop off 23

8 -> 5 -> 4

add children of 8

8 -> 5 -> 4 -> 21 -> 15

print 8, pop off 8

5 -> 4 -> 21 -> 15

5 doesn't have children, print, pop off

4 -> 21 -> 15

...

EMPTY_QUEUE

OUTPUT: 7 23 8 5 4 21 15
```

Notice the order of the output, it is the same as in the [graph example](bfs-graph-example)! Level by level.

> Obviously, we could reverse the direction in which it reads by pushing in first the right hand side then the left hand side, but again, strange, always go left to right.

The complexity of BFS is linear, but if we use BFS with ArrayList from JS, it will be O(N^2).

> The thing about a binary tree is each level, if complete, is approximately half the size of the entire tree above it. So as you can see, if we had to do half the tree shifting off, we'd have to do an n amount of work n times.

```text
1        O
       /   \
2      O    O
      / \  / \
4    O   O O  O   level complete and it's a half size of the above level (4 / 2 = 2)
```

## Search Practice

> So, the question, of course, is comparing two binary trees to see if they're both equal in shape and in structure.

So you basically compare two trees and check, if they're both same in value and same in shape.

Here is an example:

```text
        O 5
      /   \
     O 3  O 0x45

        O 5
      /   \
     O 3  O 0x45
```
Both trees have the same value and shape. And you can test it by using BFS.

But what if you have trees like these

```text
        O 5
      /   \
     O 3  O 0x45

       O 5
      /  
     O 3
    /
    O 0x45
```

BFS will say that they're equal, and yes the values are equal, but shapes are different!

So instead of BFS you need to use DFS, because

> Depth first preserves the shape of the traversal.

:)
> Always walk through solutions it does make interviewers happy.

See `CompareBinaryTrees.ts`.

> Any node is in itself a tree. If you think about it, because it is a point in which has children, and so any point of your tree is just another tree.

## Binary Search Tree

> We're not seeing a new data structure at this point, right? We're just simply ordering the data in the data structure differently.

Binary Search Tree won't be implemented in this course. It's similar to linked list implementation, but worse. 

> It just would take an hour of link playing.

> Often you'll see it abbreviated as a **BST**. And so a binary search tree is still a binary tree, but there's a **rule** that has to be applied at every node.  
I always draw my trees complete. So I'll just intentionally draw this one a non-complete tree. A complete tree, of course, is where all left and right is completely filled and it has the same height.So this is a non-complete tree, if you will.

It's a **strong** ordered. Meaning, if you have a tree like this

```text
          15  
        /    \ 
       7     51
     /     /    \
    4     25    100
           \
            37
```

You will print: 4 7 15 25 37 51 100

There is one rule: All nodes in the left subtree must have values less than the value of the node. All nodes in the right subtree must have values greater than the value of the node.

You could have greater than or equal to the right side (for some optimization) (Prime). And also to the left side like below.

```text
  <=      O     <
  <--   /   \   -->
      O     O
    /   \   /
   O    O  O 
          / \
         O   O
```

Binary Search Tree looks similar to quicksort! Recall quicksort? Everything on the left is less than or equal to pivot and everything on the right is greater than the pivot.

```text
[   <=    P     <   ]
```

```text
          17    
        /    \ 
       15     50
     /   \    /
    4    16  25 
             /  \
          18-25  26-50
```

Instead of 15 you could put 17, but then the right side must be >= 18, which will break the rule, because 18 is greater than the root (17). But technically you can have the same value, but then your tree will be like: 17 17 17 17 ...

### BST: Finding

Find operation is a simple version of binary search on an array.

Here is a pseudocode:

```text
find(n, v): bool
  if !n:
    return false
  
  if n.v == v:
    return true
  
  if n.v < v:
    return find(n.right, v)

  return find (n.left, v)
```

Time complexity: O(logN) - O(h), where h is height of the tree. The complexity depends on how your binary tree is balanced. You can balance your tree, for instance by using AVL or Red-Black Trees. 

So if you have a tree like this

```text
             O
            /
           O
          /
         O
        /
       O
```

Then you have O(h), in this case height is 3 (it's linear) and you need to go through all nodes. So it behaves like a linked list in this case. If you have a complete tree, then you have a logN

A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes at the last level h.

See implementation in `DFSOnBST.ts`.

### BST: Insertion

Insertion is like the finding. You just go through the tree and ask, if the value you want to add is less than or equal to the current node or if it's greater than the current node.

```text
          17    
        /    \ 
       15     50
     /   \    /
    4    16  25 
             /
           18

Insert 5

Is 5 less than or equal to 17 ? yes, go to the left

Is 5 less than or equal to 15 ? yes, go to the left

Is 5 less than or equal to 4 ? no, go to the right

          17    
        /    \ 
       15     50
     /   \    /
    4    16  25 
      \      /
       5    18

5 is inserted
```

Here is a pseudocode:

```text
# https://www.geeksforgeeks.org/insertion-in-binary-search-tree/

insert(node, v): Node
  if !node:
    return Node(v)

  # Duplicates are not allowed
  if v == node.v:
    return node

  # In a strict BST, relational operators are only < and > 
  if v < node.v:
    node.left = insert(node.left, v)
  else if v > node.v:
    node.right = insert(node.right, v)

  return node
```

Insertion inherently unbalances the tree! The algorithms AVL or Red-Black tree do rotations to fix this.

### BST: Deletion

Deletion is a bit complicated. It depends, if node has children. So here are the cases:

1. No children. Then just delete the node.
```text
# Delete 4
          15  
        /    \ 
       7     51
     /     /    \
    4     25    100
           \
            37

          15  
        /    \ 
       7     51
     /     /    \
    x     25    100
           \
            37
            
```
2. One child. Set parent to child (it's similar to linked list deletion, just update the parent)
```text
# Delete 7
          15  
        /    \ 
       7     51
     /     /    \
    4     25    100
           \
            37
```

          15  
        /    \ 
       4     51
           /    \
          25    100
           \
            37
3. 2 children. This is the worst case. Imagine you have a tree like this

```text
          15  
        /    \ 
       7     51
     /     /    \
    4     25    100
           \
            37       
```

You want to delete 51. In that case you go to the **smaller side (left)** and find **the largest** node. In this case 37 (we first went to left and then to the right). You then replace 51 by this node, so

```text

          15  
        /    \ 
       7     37
     /     /    \
    4     25    100

# Everything is good, 37 > 15, 37 > 25, 37 < 100
```

The largest node can have 1 or none children. That one will be left. Because, if it was the right, we went to that node. This is a proof.
So if you have something like this

```text

          15  
        /    \ 
       7     51
     /     /    \
    4     25    100
           \
           37
           /
          32
```

You do

```text
          15  
        /    \ 
       7     37
     /     /    \
    4     25    100
           \
           32

# 32 moved to the right of 25, since 37 was on the right, thus its child should be on the right of 25
```

You can do also the reverse operation. In that case you go to the **larger side (right)** and find **the smallest** node. (first go to right and then all the way to left, until the leave is found)

Which one to choose? Add maximum height to your nodes and choose the node with higher height, so you can shrink up the tree (subtree) and you don't let it spider out (unbalanced tree).