// encode, decode
// encode to single string, prefix item with length+#

// const input = ["hello", "world", "foo:bar", "hi"];
// const encoded = encode(input); // "5#hello5#world7#foo:bar2#hi"
// const decoded = decode(encoded); // ["hello", "world", "foo:bar", "hi"]

const encode = (arr: string[]): string => {
  let result = "";
  for (let i = 0; i < arr.length; ++i) {
    const curr = arr[i];
    result += `${curr.length}#${curr}`;
  }

  return result;
};

const decode = (sentence: string): string[] => {
  const result: string[] = [];
  let i = 0;
  let j = 0;
  let count = 0;
  do {
    if (sentence.charAt(j) == "#") {
      count = parseInt(sentence.substring(i, j));
      i = j + 1;

      result.push(sentence.substring(i, i + count));
      i += count;
      j = i;
      continue;
    }

    j++;
  } while (j <= sentence.length);

  return result;
};

const input = ["hello", "world", "foo:bar", "hi"];
const encoded = encode(input); // "5#hello5#world7#foo:bar2#hi"
const decoded = decode(encoded); // ["hello", "world", "foo:bar", "hi"]
console.log("Encoded: ", encoded);
console.log("Decoded: ", decoded);
