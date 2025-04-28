const input = {
  users: [
    { name: "Alice", hobbies: ["chess", "hiking"] },
    { name: "Bob", hobbies: ["golf"] },
  ],
  location: {
    city: "Wonderland",
    coordinates: [100, 200, { altitude: 300 }],
  },
};

// output
// {
//   "users[0].name": "Alice",
//   "users[0].hobbies[0]": "chess",
//   "users[0].hobbies[1]": "hiking",
//   "users[1].name": "Bob",
//   "users[1].hobbies[0]": "golf",
//   "location.city": "Wonderland",
//   "location.coordinates[0]": 100,
//   "location.coordinates[1]": 200,
//   "location.coordinates[2].altitude": 300
// }

// if is object, normal logic
// if is array, append index
// if value = base case
// all items = we don't return early.

function flatten(data) {
  const result = {};

  walk(data, "", result);
  return result;
}

function walk(data, prefix, result) {
  const tempData = { ...data };

  for (const [key, value] of Object.entries(tempData)) {
    const newKey = prefix === "" ? `${key}` : `${prefix}.${key}`;

    if (typeof value == "object") {
      // item is Object
      if (!Array.isArray(value)) {
        walk(value, newKey, result);
        continue;
      }

      // item is Array
      value.forEach((item, i) => {
        const arrKey = `${newKey}[${i}]`;
        if (typeof item == "object") {
          walk(item, arrKey, result);
        } else {
          result[arrKey] = item;
        }
      });
      continue;
    }

    // item is primitive
    result[newKey] = value;
  }
}

const answer = flatten(input);
console.log(answer);
