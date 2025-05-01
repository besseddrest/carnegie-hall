interface DOMNode {
  tag: string;
  children: DOMNode[];
}

type DeepType = {
  node: DOMNode;
  depth: number;
};

function findDeepestNode(root: DOMNode): DOMNode {
  const deepest: DeepType = {
    node: root,
    depth: 1,
  };
  let currStack: DOMNode[] = [root];
  let path: DOMNode[] = [root];

  walk(currStack, path, deepest);
  return deepest.node;
}

function walk(inputArr: DOMNode[], path: DOMNode[], deepest: DeepType): void {
  for (let i = 0; i < inputArr.length; ++i) {
    const curr = inputArr[i];
    path.push(curr);

    if (curr.children.length === 0 && path.length > deepest.depth) {
      deepest.node = curr;
      deepest.depth = path.length;
      continue;
    }

    walk(curr.children, path, deepest);
    path.pop();
  }
}

const domTree = {
  tag: "div",
  children: [
    {
      tag: "section",
      children: [
        {
          tag: "article",
          children: [],
        },
      ],
    },
    {
      tag: "footer",
      children: [],
    },
  ],
};

const result = findDeepestNode(domTree);

console.log("Deepest Node:");
console.log(result);
