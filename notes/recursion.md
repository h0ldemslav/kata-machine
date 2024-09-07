# Recursion

## [Notes](./notes.md)
<br>

- [Fundamentals](#fundamentals)
- [Path Finding: Base Case](#path-finding-base-case)
- [Path Finding: Recursive Case](#recursive-case)
- [When do I use recursion](#when-do-i-use-recursion)

## Fundamentals

> It's something that keeps on calling itself over and over again.

> The simplest way to think of recursion is a function that calls itself until the problem is solved. This usually involves what is referred to as a "base case." A base case is the point in which the problem is solved at.  
> At that point the function no longer calls itself, and it's able to return out some value, or do some operation, or do something, right?

<span id="recursion-example">Example</span>

```ts
// Forget about problematic arguments (e.g. you could pass a zero, but forget about it just for the sake of demonstration)
// Sums the numbers
function foo(n: number): number {
    // Base case
    if (n === 1) {
        return 1;
    }

    // Recurse
    return n + foo(n - 1);
}
```

To better visualize the recursion, think about these 3 values:

- *rA* - return address. Some space should be allocated for this. When function is done it needs to hand back its value. In simple words: who did call me and where should I return the value?
- *rV* - value. Some space should be allocated for this. In simple words: this value I will return to whoever called me.
- *A* - arguments. Some space should be allocated for this. In simple words: these are my arguments, they parametrize me.

So here is an example of `foo(5)` and how it may look like during the execution:

```js
foo(5);

// NOTE: though we have a return statement, we don't return, because we don't know the final value, because we make another function call and we need to wait for the return of this function

// But this function calls another function, etc. Recursion :)

// foo(5) body execution
is 5 = 1? No, return 5 + foo(5 - 1) => 5 + foo(4)

// foo(4) body execution
is 4 = 1? No, return 4 + foo(4 - 1) => 4 + foo(3)

// foo(3) body execution
is 3 = 1? No, return 3 + foo(3 - 1) => 3 + foo(2)

// foo(2) body execution
is 2 = 1? No, return 2 + foo(2 - 1) => 2 + foo(1);

// foo(1) body execution
is 1 = 1? YES! return 1 // we've reached the base case

// So 1 is returned to foo(2)
// And foo(2) returns
return 2 + 1

// This is returned to foo(3)
// And foo(3) returns
return 3 + 3

// This is returned to foo(4)
// And foo(4) returns
return 4 + 6

// This is returned to foo(5)
// And foo(5) returns
return 5 + 10

// We finally return the result of foo(5)
```

If we put `throw new Error()` we would get a stack trace! foo(1) -> foo(2) -> foo(3) -> foo(4) -> foo(5) -> main function -> uncaught error

> You've seen the stack traces, you've seen error stacks, it's literally the stack of functions that have been called.

So

> **Base case** is extremely important. Always think clearly what your base case is. If you don't know your base case, recursion is extremely hard. If you know your base case and you can make it clever, recursion becomes exceptionally simple.

Basic structure of recursion is: **base case** + **we recurse the function**.

But we can also consider other parts of the structure:

- *pre* - an operation that we do *before* we recurse the function. For example in [that function](#recursion-example) we do `n+`.
- *recurse* - actually recursing
- *post* - an operation that we do after recursing. We don't need to immediately return a function call. We can have something like this

```ts
// Forget about problematic arguments (e.g. you could pass a zero, but forget about it just for the sake of demonstration)
// Sums the numbers
function foo(n: number): number {
    // Base case
    if (n === 1) {
        return 1;
    }

    const result = n + foo(n - 1);

    // post operation, once we reached the base case (1), the result will be logged
    // In that case in foo(2), foo(3), foo(4), foo(5)
    console.log(result);

    return result;
}
```

It's good to think about it, and it's extremely useful during *pathing*. From [Wikipedia](https://en.wikipedia.org/wiki/Pathfinding): 
> Pathfinding or pathing is the search, by a computer application, for the shortest route between two points. It is a more practical variant on solving mazes.  
> This field of research is based heavily on Dijkstra's algorithm for finding the shortest path on a weighted graph.

REMEMBER:

1. Base case
2. Recurse

## Path Finding: Base Case

Prime explains recursion on Maze solver, which is a maze game, where you need to find the way from the start to the end (pathfinding, see more at the end of previous section).

You have a list of strings, where each string is a row. It contains some characters:

- `'#'` - a wall. You *cannot* go through them.
- `''` - empty pathway. You *can* go through them.
- `'s'` - start point.
- `'e'` - ending, where you want to get.

```js
[
    "####e#",
    "#    #",
    "#s####",
]
```

> Recursion is your best friend.

So how can we tell the computer, where should he go?

Well, we can think about movements as **squares**. So once we're in a starting point we can go top, right, bottom, left.

But we need to *check*, before we go. Why? Because we can:

- Face a wall. We cannot pass them. 
- Go off the maze, we don't wanna do that. 
- Get to the place, where we've already been and we don't wanna waste our steps (stuck in loop -> stackoverflow).

These all are our **base case**.

> And there's a good reason why you consider the base case, and you don't check for it in the recursive case. It's very, very important not to do that. I keep stressing the base case cuz it just makes recursion a million times simpler.

So to sum up, base case:

1. It's a wall
2. Off the maze
3. It's the end
4. We have been here/we have seen this tile

The recursive cases is checking every direction (top, right, bottom, left).

> So remember, we want to be able to do our base cases, then our recursive cases.  
> The base cases require us to know where we're currently at, the recursive case requires us to be able to walk in directions.

## Recursive case

Completely separate from the base case. If you have a pathfinding problem, you need to think about pre and post operations.

Always do the base case! Don't check the things that are related to the base case.

Should I stop if the value is null, it's of the grid? No, put this in the base case!

Move everything that you can do to the base case.

See `MazeSolver.ts`.

## When do I use recursion

It's not able to be done via for loop. Or it's difficult to solve using a loop.

There is no defined end, especially there is a branching factor (like maze, four possible directions). Then use recursion.

If you can solve a problem with a loop in a sane way, then always use the loop. Otherwise try to use the recursion.