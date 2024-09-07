# QuickSort

## [Notes](./notes.md)
<br>

## Divide and Conquer technique

> Effectively, divide and conquering is to be able to split your input into two chunks, three chunks, four chunks, whatever that splitting is. And then be able to go over those smaller subsets and solve things faster.  
> Then you could resplit it again, and resplit it again, and resplit it again. It becomes something in which progressively gets smaller and smaller until it gets to some sort of fundamental unit, in which you can solve really easily. So think about sorting, an array of one element is always sorted.

QuickSort is a divide and conquer algorithm.

First you pick up some element out of the array (doesn't really matter what the element is). This element is called **pivot** (P).

```text
// Here we'll take the last element. (Learn more about Lomuto partition scheme)
[x                    P]
0                      N

^
index pointer (runner) that hangs over here

^
this pointer walks the entire array

// Any element that is less than or equal to pivot will be put in the first runner's position. 
// The element will be swapped with the element on a runner position (x) and then the runner is incremented

// Then pivot will follow the runner to keep the condition x <= P < x

// So we put all the ones that less than or equal to pivot on one side of the array
// Then we put pivot
// And then we put all the ones that are bigger than the pivot on the other side

[      <=      P0       <      ]
0                              N
```

```text
// Besides the iteration we also split our problem

[               P0               ]
|            |      |            |   
|            |      |            | 
|            |      |            |
first part          second part 

And we repeat the process again (pick another pivot and split)

|      P1      |  |      P2      |   
|              |  |              | 
|              |  |              |

// And split, we don't include the pivot

|    |   |    |   |    |    |    |
|    |   |    |   |    |    |    |
|    |   |    |   |    |    |    |
first    second   third     fourth

// We keep doing it, until we these chunks are sorted (lo >= hi )
```

The complexity of quick sort is O(N log(N)). But this is an average case. The worst case is O(N^2). This happens, when array is reversed sorted. For instance, if we have [10, 9, 8, ..., 1] and our pivot is the last element, then we have a problem.

This is the biggest issue of the algorithm. Picking the right pivot.

But overall it's complexity is between O(N log(N)) and O(N^2). It's difficult to get all conditions in order to achieve the worst case (Prime).

So there are some strategies how to fix it. For instance, take always the middle element.

## Implementation

You often have 2 functions:
- partition - produces the pivot index and moves the items that are less or equal to pivot on a one side
- quicksort - does quicksorting. It calls partition, gets the pivot, then recalls the quicksort (recursion)