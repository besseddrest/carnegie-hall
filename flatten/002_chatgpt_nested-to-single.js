function flatten(arr) {
  const result = [];

  function recurse(val) {
    for (let num of val) {
      if (Array.isArray(num)) {
        recurse(num);
      } else if (!isNaN(num)) {
        result.push(num);
      }
    }
  }

  recurse(arr);
  return result;
}

const input = [1, [2, [3, 4], 5], 6];

// enqueue the input as the first item to process
// loop:
// pop item off stack, loop over its contents
// if number, push to result
// if array, take the tail and push to stack first, then curr item
// do this until we've gone down each 'tree', aka ea item at parent level
// by moving tail to head (tail if it were a Queue))
// we can ensure we process the items 'in order' because we actually process as a Stack
// i believe this is post order depth first search
function stackFlatten(arr) {
  const stack = [arr];
  const result = [];

  do {
    let curr = stack.pop();

    for (let i = 0; i < curr.length; ++i) {
      let item = curr[i];

      if (Array.isArray(item) && item.length > 0) {
        stack.push(curr.slice(i + 1), item);
        break;
      } else {
        result.push(item);
      }
    }

    console.log("stack: ", stack);
  } while (stack.length > 0);

  return result;
}

const answer2 = stackFlatten(input);

console.log(answer2);
