import React, { useState } from "react";
import Editor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

const AceEditor = () => {
  const [value, setValue] = useState("");
  const onChange = (val: string, _: any) => {
    setValue(val);
  };
  const onLoad = (e) => {};

  return (
    <div>
      <Editor
        mode="json"
        theme="monokai"
        onLoad={onLoad}
        onChange={onChange}
        value={value}
        setOptions={{
          fontFamily: "Fira Code Retina",
          fontSize: 18,
          showPrintMargin: true,
          showGutter: true,
          highlightActiveLine: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default AceEditor;
