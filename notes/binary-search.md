# Binary Search

## [Notes](./notes.md)
<br>

When you have a dataset, ask yourself: is it ordered? If it is, then you can take advantage of it.

So let's say we have an array `int a[N]` and it's ordered. We don't need to go from the first element to the end. Instead we can say, well, let's look at 10th value. Is that value bigger than mine? No. Then I should go further. It is? Then I should go back and search linearly.

For better grasp, think of it in terms of real life. How you search, when something is ordered? You do it similarly. Let's say you have 100 cabins. You walk through the numbers to find 68th.

And this is a simple idea that comes to mind. The Binary search works similarly. Except you don't pick 10th element, you divide an array by 2.

Then you ask is that value bigger than mine? If it is you skip the first part, otherwise the second (the value is smaller). And you keep dividing into halves, until you find or there is no value at all.

So in short: you divide the array into half and just look for the value (not traversing through the array), then divide again and so on. So the big O is O(logN).

If you go through the half, then it's O(NlogN)