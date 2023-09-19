import { useState } from "react";
import "./styles.css";
export default function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value,showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name} </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}> 🗀 </button>
            <button onClick={(e) => handleNewFolder(e, false)}> 🗋 </button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return <Folder explorer={exp} key={exp.id} handleInsertNode={handleInsertNode} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name} </span>;
  }
}
