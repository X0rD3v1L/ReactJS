import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import explorer from './data/folderData';
import './App.css'
import Folder from './components/folder';
import useTraverseTree from './hooks/use-traverse-tree';
export default function App() {
    const [explorerData, setExplorerData] = useState(explorer);
    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const finalTree = insertNode(explorerData,folderId,item,isFolder);

        setExplorerData(finalTree);
    }
    return(
        <div className='App'>
            <h1> File Manager - VS Code Like</h1>
            <Folder explorer={explorerData} handleInsertNode={handleInsertNode}/>
        </div>
    )
}

const root = document.getElementById('root');
const reactRoot = createRoot(root);

// Check if the container already has a root. If not, create one.
if (!root._reactRootContainer) {
    reactRoot.render(<App />);
  } else {
    // If a root already exists, update it.
    reactRoot.update(<App />);
  }