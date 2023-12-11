import { FC, useState } from 'react';
import './style.scss';

enum NodeType {
  comment = 'comment',
  reply = 'reply',
}

type TreeNodeType = {
  id: number;
  rootId: number | null;
  type: NodeType;
  content: string | undefined;
  depth: number;
  left: number;
  right: number;
};

type TreeType = TreeNodeType[];

type TreesType = TreeType[];

type TreeNodeProps = {
  node: TreeNodeType;
  treeData: TreeType;
  [key: string]: any;
};

type TreeProps = {
  treeData: TreeType;
  [key: string]: any;
};

const initialData: TreesType = [
  [
    {
      id: 1,
      rootId: null,
      type: NodeType.comment,
      content: 'Comment 1',
      depth: 0,
      left: 1,
      right: 6,
    },
    {
      id: 2,
      rootId: 1,
      type: NodeType.reply,
      content: 'Comment 1-1',
      depth: 1,
      left: 2,
      right: 5,
    },
    {
      id: 3,
      rootId: 1,
      type: NodeType.reply,
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
      type: NodeType.comment,
      content: 'Comment 2',
      depth: 0,
      left: 1,
      right: 2,
    },
  ],
];

const TreeNode: FC<TreeNodeProps> = (props) => {
  const { node, treeData, data, updateData, treeIdx } = props;
  const childNodes = treeData.filter(
    (nodeItem: any) => nodeItem.left > node.left && nodeItem.right < node.right && nodeItem.depth === node.depth + 1
  );

  const addChild = (content: any) => {
    const lastChild = childNodes.length > 0 ? childNodes[childNodes.length - 1] : null;
    const addedValue = 2;

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
      type: NodeType.reply,
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
        if (nodeItem.right === node.right || (nodeItem.left > node.left && nodeItem.right < node.right)) {
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
          <button onClick={() => addChild(`${node.content}-${childNodes.length + 1}`)}>add child</button>
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

const Tree: FC<TreeProps> = (props) => {
  const { treeData, updateData, data, treeIdx } = props;
  const root = treeData.find((node) => node.depth === 0);
  return (
    <div className="tree-wrapper">
      {root && (
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
      )}
    </div>
  );
};

const NestedStructureDemo: FC<any> = (props) => {
  const [data, setData] = useState(initialData);

  const updateData = (data: TreesType) => {
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
      type: NodeType.comment,
      depth: 0,
      left: 1,
      right: 2,
    };
    const newData = [...data, [newComment]];
    setData(newData);
  };

  return (
    <div>
      <h1>Nested structure demo</h1>
      {data.map((treeData, treeIdx) => {
        return <Tree key={treeIdx} updateData={updateData} data={data} treeData={treeData} treeIdx={treeIdx} />;
      })}
      <div className="button-area">
        <button onClick={() => addComment()}>Add comment</button>
        <button onClick={() => resetData()}>Reset data</button>
      </div>
    </div>
  );
};

export default NestedStructureDemo;
