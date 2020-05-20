import 'react-sortable-tree/style.css'
import React, {  useState, useEffect } from 'react'
import SortableTree, { /* getFlatDataFromTree,*/ getTreeFromFlatData } from 'react-sortable-tree'
import NodeContentRenderer from './NodeContentRender'

function SortableList({ items , onDelete, onUpdate }) {
  const [ treeData, setTreeData ] = useState([])
  useEffect(() => {
    setTreeData(
      getTreeFromFlatData({
        flatData    : items.map(node => ({ ...node, title: node.name , onUpdate, onDelete })),
        getKey      : node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey     : null // The value of the parent key when there is no parent (i.e., at root level)
      })
    )
  }, [ items ])

  /** futute use with order field */
  // const flatData = getFlatDataFromTree({
  //   treeData,
  //   getNodeKey     : ({ node }) => node.id, // This ensures your "id" properties are exported in the path
  //   ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
  // }).map(({ node, path }) => ({
  //   ...node,
  //   id  : node.id,
  //   name: node.name,

  //   // The last entry in the path is this node's key
  //   // The second to last entry (accessed here) is the parent node's key
  //   parent: path.length > 1 ? path[path.length - 2] : null
  // }))

  return (
    <div>
      <div style={{ height: '100vh' , overflow: 'unset' }}>
        <SortableTree
          maxDepth={2}
          /* eslint react/jsx-handler-names: 0 */ //
          nodeContentRenderer={NodeContentRenderer}
          onChange={setTreeData}
          treeData={treeData}/>
      </div>
    </div>
  )
}

SortableList.defaultProps = {}

export default SortableList
