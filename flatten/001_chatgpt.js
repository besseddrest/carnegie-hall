/**
 * 🧩 Flatten a Nested Object
 *
 * Write a function that takes a deeply nested object and returns
 * a new object with all nested properties flattened into a single level,
 * using dot notation for keys.
 *
 * Example Input:
 *
 * const input = {
 *   user: {
 *     name: 'Alice',
 *     address: {
 *       city: 'Wonderland',
 *       zip: {
 *         code: 12345,
 *         plus4: 6789
 *       }
 *     }
 *   },
 *   active: true
 * };
 *
 * Example Output:
 *
 * {
 *   'user.name': 'Alice',
 *   'user.address.city': 'Wonderland',
 *   'user.address.zip.code': 12345,
 *   'user.address.zip.plus4': 6789,
 *   'active': true
 * }
 */

const input = {
  user: {
    name: "Alice",
    address: {
      city: "Wonderland",
      zip: {
        code: 12345,
        plus4: 6789,
      },
    },
  },
  active: true,
};

function solution(obj) {
  const result = {};

  walk("", obj, result);
  return result;
}

function walk(tree, objVal, res) {
  for (const [key, value] of Object.entries(objVal)) {
    const combined = tree !== "" ? `${tree}.${key}` : `${key}`;
    if (typeof value === "object" && value != null && !Array.isArray(value)) {
      walk(combined, value, res);
    } else {
      res[combined] = value;
    }
  }
}

console.log(solution(input));

// how do we make 'active' a string key (like json);
