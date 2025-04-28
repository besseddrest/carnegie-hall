const input = {
  user: {
    name: "Alice",
    hobbies: ["chess", "hiking"],
    address: {
      city: "Wonderland",
      coordinates: [100, 200],
    },
  },
  active: true,
};

// Expected output
// {
//   "user.name": "Alice",
//   "user.hobbies[0]": "chess",
//   "user.hobbies[1]": "hiking",
//   "user.address.city": "Wonderland",
//   "user.address.coordinates[0]": 100,
//   "user.address.coordinates[1]": 200,
//   "active": true
// }

//Same approach as before but repeat output when we have an array

function flatten(obj) {
  const result = {};

  walk(obj, "", result);

  return result;
}

function walk(val, prefix, result) {
  for (const [key, value] of Object.entries(val)) {
    let tmpPre = prefix === "" ? `${key}` : `${prefix}.${key}`;

    if (typeof value == "object" && !Array.isArray(value)) {
      walk(value, tmpPre, result);
      continue;
    }

    if (!Array.isArray(value)) {
      result[`${tmpPre}`] = value;
      continue;
    }

    value.forEach((item, i) => {
      result[`${tmpPre}[${i}]`] = item;
    });
  }
}

const answer = flatten(input);

console.log(answer);
