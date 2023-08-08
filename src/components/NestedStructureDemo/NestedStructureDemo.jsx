import { useState } from "react";
import "./style.css";

const initialTree = [
  {
    content: "Root Node",
    depth: 0,
    left: 1,
    right: 10,
  },
  {
    content: "Comment 1",
    depth: 1,
    left: 2,
    right: 7,
  },
  {
    content: "Comment 2",
    depth: 1,
    left: 8,
    right: 9,
  },
  {
    content: "Comment 1-1",
    depth: 2,
    left: 3,
    right: 6,
  },
  {
    content: "Comment 1-1-1",
    depth: 3,
    left: 4,
    right: 5,
  },
];

const TreeNode = (props) => {
  const { node, tree, setTree } = props;
  const childNodes = tree.filter(
    (nodeItem) =>
      nodeItem.left > node.left && nodeItem.right < node.right && nodeItem.depth === node.depth + 1
  );

  const addChild = (content) => {
    const lastChild = childNodes.length > 0 ? childNodes[childNodes.length - 1] : null;
    const addedValue = 2;
    const treeRightNodes = lastChild
      ? tree.filter((nodeItem) => nodeItem.left > lastChild.right)
      : tree.filter((nodeItem) => nodeItem.left > node.right);
    const newTree = tree.map((nodeItem) => {
      if (lastChild && nodeItem.left > lastChild.right) {
        return {
          ...nodeItem,
          left: nodeItem.left + addedValue,
          right: nodeItem.right + addedValue,
        };
      }
      if (nodeItem.left > node.right) {
        return {
          ...nodeItem,
          left: nodeItem.left + addedValue,
          right: nodeItem.right + addedValue,
        };
      }
      if (lastChild && nodeItem.right > lastChild.right && nodeItem.left < lastChild.left) {
        return { ...nodeItem, right: nodeItem.right + addedValue };
      }
      if (nodeItem.right > node.right && nodeItem.left < node.left) {
        return { ...nodeItem, right: nodeItem.right + addedValue };
      }
      if (nodeItem.right === node.right) {
        return { ...nodeItem, right: nodeItem.right + addedValue }; // currentNode
      }
      return { ...nodeItem };
    });

    const left = lastChild ? lastChild.right + 1 : node.left + 1;
    const right = left + 1;

    const newNode = {
      content: content,
      depth: node.depth + 1,
      left,
      right,
    };
    console.log(treeRightNodes);
    newTree.push(newNode);
    console.log(newTree);
    setTree(newTree);
  };

  const deleteNode = () => {
    const treeRightNodes = tree.filter((nodeItem) => nodeItem.left > node.right);
    const minusValue = node.right - node.left + 1;
    const newTree = tree
      .map((nodeItem) => {
        if (nodeItem.left > node.right) {
          return {
            ...nodeItem,
            left: nodeItem.left - minusValue,
            right: nodeItem.right - minusValue,
          };
        }
        if (nodeItem.right > node.right && nodeItem.left < node.left) {
          return { ...nodeItem, right: nodeItem.right - minusValue };
        }
        if (
          nodeItem.right === node.right ||
          (nodeItem.left > node.left && nodeItem.right < node.right)
        ) {
          return null; // currentNode and children
        }
        return { ...nodeItem };
      })
      .filter((nodeItem) => nodeItem !== null);

    console.log(treeRightNodes);
    console.log(newTree);
    setTree(newTree);
  };

  return (
    <li>
      <div className="node-wrapper">
        <div className="node-content">
          {`${node.content} `}
          <span style={{ color: "green" }}>{`(${node.left}:${node.right})`}</span>
        </div>
        <div className="toolbar">
          <button onClick={() => addChild(`${node.content}-${childNodes.length + 1}`)}>
            add child
          </button>
          <button onClick={deleteNode}>delete</button>
        </div>
      </div>
      {childNodes.length > 0 && (
        <ul>
          {childNodes.map((nodeItem) => {
            return (
              <TreeNode
                key={`${nodeItem.left}:${nodeItem.right}`}
                node={nodeItem}
                tree={tree}
                setTree={setTree}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

const Tree = (props) => {
  const [tree, setTree] = useState(initialTree);

  const addComment = () => {
    const childNodes = tree.filter(
      (nodeItem) =>
        nodeItem.left > tree[0].left &&
        nodeItem.right < tree[0].right &&
        nodeItem.depth === tree[0].depth + 1
    );
    const newTree = tree.map((nodeItem) => {
      if (nodeItem.depth === 0) {
        return { ...nodeItem, right: nodeItem.right + 2 };
      }
      return { ...nodeItem };
    });
    const newNode = {
      content: `Comment ${childNodes.length + 1}`,
      depth: tree[0].depth + 1,
      left: tree[0].right,
      right: tree[0].right + 1,
    };
    newTree.push(newNode);
    console.log(newTree);
    setTree(newTree);
  };

  const resetTree = () => {
    setTree(initialTree);
  };

  return (
    <div className="tree-wrapper">
      <ul>
        {tree.map((node) => {
          if (node.depth === 1) {
            return (
              <TreeNode
                key={`${node.left}:${node.right}`}
                node={node}
                tree={tree}
                setTree={setTree}
              />
            );
          }
          return null;
        })}
      </ul>
      <div>
        <button onClick={() => addComment()}>Add comment</button>
        <button onClick={() => resetTree()}>Reset tree</button>
      </div>
    </div>
  );
};

const NestedStructureDemo = (props) => {
  return <Tree />;
};

export default NestedStructureDemo;
