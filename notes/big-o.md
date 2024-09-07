# Big O Time Complexity

## [Notes](./notes.md)
<br>

> Big O is a way to categorize your algorithms time or memory requirements based on input. 

> It is not meant to be an exact measurement.

> Instead it's a generalized way to understand how your algorithm will react as your input or the things you are using grow.

> And so if someone says, this is O(N), what they mean is your algorithm grows linearly based on input.

> So why do we use it? Well it often helps us make decisions on why you should or should not use a specific data structure / algorithm.

> Big O, said differently: as your input grows, how fast does your computation or memory grow?

### Important concepts

1. Growth is with respect to the input.

2. Constants are dropped.

For example, O(2*N) is the same as O(N). Explanation:
> That is because Big O is meant to describe the upper bound of the algorithm (the growth of the algorithm). The constant eventually becomes irrelevant.

Big O = how does it grow (how is it fast)

> Just because N is faster than N^2, doesn't mean practically its always faster for smaller input.

```ts
function sum_char_codes(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        const charCode = n.charCodeAt(i);
        // Capital E
        if (charCode === 69) {
            return sum;
        }

        sum += charCode;
    }

    return sum;
}
```

> In Big O we often consider the worst case.
Especially in interviews (i have never been asked for best, average, and worst case, just worst case).

E = 69

Therefore any string with E in it will terminate early (unless E is the last item in the list).

IT'S STILL O(N)

3. Worst case is usually the way we measure

[Big O Complexity graph](https://www.hackerearth.com/practice/notes/big-o-cheatsheet-series-data-structures-and-algorithms-with-thier-complexities-1/)

O(n!) and O(2^n) can't be solved on modern computers.