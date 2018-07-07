"use_strict";

// Returns true if the array has no elements
// Returns false otherwise
const isEmpty = (array) => {
  return array.length === 0;
};

// Returns the first element of an array
const getHead = (array) => {
  if (isEmpty(array)) throw new Error("Can not get head of empty array.");
  return array[0];
};

// Returns all elements of an array after the first element in a new array.
const getTail = (array) => {
  if (isEmpty(array)) throw new Error("Can not get tail of empty array.");
  return array.slice(1);
};

// Returns a new array by combining a head with a tail to form a new array
const buildArray = (head, tail) => {
  return [head, ...tail];
};

/* 
  Returns the number of values in the list.
  Implement in O(n)
*/
const length = (array) => {
  if (isEmpty(array)) {
    return 0;
  }
  return 1 + length(getTail(array))
};

/*
  Applies the given function to every value and returns a new list containing
  the result of the function on each value (in the same order).
*/
const map = (array, fn) => {
  if (isEmpty(array)) {
    return [];
  }
  return [fn(getHead(array)), ...map(getTail(array), fn)];
};

/*
  Applies the given function to the value of each element and returns a new list
  containing only the values from the original list for wich fn(array[i]) returns a truthy value.
*/
const filter = (array, fn) => {
  if (isEmpty(array)) {
    return [];
  }
  if (fn(getHead(array))) {
    return buildArray(getHead(array), filter(getTail(array), fn));
  } else {
    return filter(getTail(array), fn);
  }
};

/*
  Returns a sorted version of the list. Does not mutate original list.
*/
/* 
  Quicksort psuedocode:
  def sort(list):
    return empty_list if list == empty_list
    pivot = list[0]
    rest = list[1..end]

    left, right = partition(rest) where:
      left = elements < pivot
      right = elements >= pivot

    return sort(left) + [pivot] + sort(right)
*/

const sort = (array, compareFn) => {
  if (isEmpty(array)) {
    return [];
  }
  const partition = arrayChunk => {
    const left = filter(arrayChunk, item => {
      return compareFn(pivot, item) > 0;
    });
    const right = filter(arrayChunk, item => {
      return compareFn(pivot, item) <= 0;
    });
    return [left, right];
  };
  const pivot = getHead(array);
  const rest = getTail(array);
  const [left, right] = partition(rest);

  return [...sort(left, compareFn), pivot, ...sort(right, compareFn)];
};

module.exports = { map, filter, isEmpty, length, sort };
