import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WysiwygDefault } from "../../assets/styles/adminStyle/adminGlobalStyle";

export default function WysiwygEditor({
  label,
  placeholder,
  value,
  onChange,
  image,
  ...props
}) {
  let container1 = [
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
  ];
  if (image) container1.push("image");

  return (
    <WysiwygDefault>
      <label>{label}</label>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={{
          toolbar: {
            container: [container1],
            // handlers: {
            //   image: this.imageHandler,
            // },
          },
          // table: true,
        }}
        placeholder={placeholder}
      />
    </WysiwygDefault>
  );
}
