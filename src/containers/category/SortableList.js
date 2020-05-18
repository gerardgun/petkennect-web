import 'react-sortable-tree/style.css'
import React, {  useState, useEffect } from 'react'
import SortableTree, { getFlatDataFromTree, getTreeFromFlatData } from 'react-sortable-tree'
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

function SortableList({ items }) {
  const [ treeData, setTreeData ] = useState([])
  useEffect(() => {
    setTreeData(
      getTreeFromFlatData({
        flatData    : items.map(node => ({ ...node, title: node.name })),
        getKey      : node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey     : null // The value of the parent key when there is no parent (i.e., at root level)
      })
    )
  }, [ items ])

  const flatData = getFlatDataFromTree({
    treeData,
    getNodeKey     : ({ node }) => node.id, // This ensures your "id" properties are exported in the path
    ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
  }).map(({ node, path }) => ({
    ...node,
    id  : node.id,
    name: node.name,

    // The last entry in the path is this node's key
    // The second to last entry (accessed here) is the parent node's key
    parent: path.length > 1 ? path[path.length - 2] : null
  }))

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <SortableTree
          maxDepth={2}
          /* eslint react/jsx-handler-names: 0 */ //
          onChange={setTreeData}
          treeData={treeData}/>
      </div>

      <pre>{JSON.stringify(flatData, null , 2)}</pre>
    </div>
  )
}

SortableList.defaultProps = {}

export default SortableList
