# Arrays

## [Notes](./notes.md)
<br>

> Array is a contiguous (unbreaking) memory space in which contains a certain amount of bytes. 

**It's a fixed size data structure**. Once you define the size of array, you cannot change it. (assuming you work with classic languages like C or C++, or modern but that treats array in this way).

> Zero or more pieces of memory that are understood as a single type in a row.

```text
a = int[3];

a[0] // tells the computer to go to this memory address and add to this address (pointer arithmetic) an offset of 0 * size_of_type.
```

In JavaScript to create a kind of array (the real one, don't confuse with [], this is an ArrayList, even though it uses array concepts under the hood) you use `ArrayBuffer` and it creates a **contiguous piece of memory space**.

Then you can create **views**. For instance, `Uint8Array` and then you walk through the space by using offsets.

For instance:

```js
const a = new ArrayBuffer(6); // create a buffer of 6 bytes
console.log(a); // ArrayBuffer { [Uint8Contents]: <00 00 00 00 00 00>, byteLength: 6 }

const a8 = new Uint8Array(a); // create a view to that array
a8[0] = 45; // start from `a` address + 0 * uint8
a8[2] = 45; // start from `a` address + 2 * uint8
console.log(a8); // Uint8Array(6) [ 45, 0, 45, 0, 0, 0 ]

// Another view
const a16 = new Uint16Array(a);
a16[2] = 0x4545; // `a` address + 2 * uint16, which is 5 and 6 elements in `a`. Why? Because uint16, you now walk by 2 bytes. Remember memory address + offset * width_of_type

console.log(a); // ArrayBuffer { [Uint8Contents]: <2d 00 2d 00 45 45>, byteLength: 6 }
console.log(a8); // Uint8Array(6) [ 45, 0, 45, 0, 69, 69 ]
console.log(a16); // Uint16Array(3) [ 45, 45, 17733 ]
```

This might happen a bit differently, but this is the essential way of how array work.

Then we *insert* into array a new element, we don't really insert, but rather overwrite. And this how array works. It's a contiguous chunk of memory, it doesn't grow, because it has a static length. And it's good, we don't want to reallocate the memory every time we insert a new item.

So for insertion you use `a[width_of_the_type] = value`, where `width_of_type` is usually used in bytes.

With deletion again you don't reduce the memory space, you just set it to `null`.

To sum up: indexing, inserting and deletion is O(1), a constant complexity. Input grows, but nothing changes, because the little equation array_address + offset * width_of_type remains the same.