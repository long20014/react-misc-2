import { useState } from 'react';
import './style.css';

const COMMENT = 'comment';
const REPLY = 'reply';

const initialData = [
  [
    {
      id: 1,
      rootId: null,
      type: COMMENT,
      content: 'Comment 1',
      depth: 0,
      left: 1,
      right: 6,
    },
    {
      id: 2,
      rootId: 1,
      type: REPLY,
      content: 'Comment 1-1',
      depth: 1,
      left: 2,
      right: 5,
    },
    {
      id: 3,
      rootId: 1,
      type: REPLY,
      content: 'Comment 1-1-1',
      depth: 2,
      left: 3,
      right: 4,
    },
  ],
  [
    {
      id: 4,
      rootId: null,
      type: COMMENT,
      content: 'Comment 2',
      depth: 0,
      left: 1,
      right: 2,
    },
  ],
];

const TreeNode = (props) => {
  const { node, treeData, data, updateData, treeIdx } = props;
  const childNodes = treeData.filter(
    (nodeItem) =>
      nodeItem.left > node.left && nodeItem.right < node.right && nodeItem.depth === node.depth + 1
  );

  const addChild = (content) => {
    const lastChild = childNodes.length > 0 ? childNodes[childNodes.length - 1] : null;
    const addedValue = 2;
    const treeRightNodes = lastChild
      ? treeData.filter((nodeItem) => nodeItem.left > lastChild.right)
      : treeData.filter((nodeItem) => nodeItem.left > node.right);
    const newTree = treeData.map((nodeItem) => {
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
      id: new Date().getTime(),
      rootId: node.id,
      type: REPLY,
      content: content,
      depth: node.depth + 1,
      left,
      right,
    };
    newTree.push(newNode);
    console.log(newTree);
    data[treeIdx] = newTree;
    console.log(data);
    updateData([...data]);
  };

  const deleteNode = () => {
    const treeRightNodes = treeData.filter((nodeItem) => nodeItem.left > node.right);
    const minusValue = node.right - node.left + 1;
    const newTree = treeData
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
    data[treeIdx] = newTree;
    console.log(data);
    updateData([...data]);
  };

  return (
    <li>
      <div className="node-wrapper">
        <div className="node-content">
          {`${node.content} `}
          <span style={{ color: 'green' }}>{`(${node.left}:${node.right})`}</span>
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
                key={`${node.id}`}
                node={nodeItem}
                treeData={treeData}
                data={data}
                updateData={updateData}
                treeIdx={treeIdx}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

const Tree = (props) => {
  const { treeData, updateData, data, treeIdx } = props;
  const root = treeData.find((node) => node.depth === 0);
  return (
    <div className="tree-wrapper">
      <ul>
        <TreeNode
          key={`${root.id}`}
          node={root}
          treeData={treeData}
          data={data}
          updateData={updateData}
          treeIdx={treeIdx}
        />
      </ul>
    </div>
  );
};

const NestedStructureDemo = (props) => {
  const [data, setData] = useState(initialData);

  const updateData = (data) => {
    setData(data);
  };

  const resetData = () => {
    setData(initialData);
  };

  const addComment = () => {
    const newComment = {
      content: `Comment ${data.length + 1}`,
      id: new Date().getTime(),
      rootId: null,
      type: COMMENT,
      depth: 0,
      left: 1,
      right: 2,
    };
    const newData = [...data, [newComment]];
    setData(newData);
  };

  return (
    <div>
      {data.map((treeData, treeIdx) => {
        return (
          <Tree
            key={treeIdx}
            updateData={updateData}
            data={data}
            treeData={treeData}
            treeIdx={treeIdx}
          />
        );
      })}
      <div className="button-area">
        <button onClick={() => addComment()}>Add comment</button>
        <button onClick={() => resetData()}>Reset data</button>
      </div>
    </div>
  );
};

export default NestedStructureDemo;
