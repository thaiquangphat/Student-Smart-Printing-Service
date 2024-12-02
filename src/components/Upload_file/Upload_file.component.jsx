import React, { useContext, useEffect, useState } from "react";
import { DocContext } from "../../contexts/doc.context";
import "./Upload_file.style.css";
const Upload = () => {
  const [completedFiles, setCompletedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <div className="upload-page-body">
      <br></br>
      <Upload_file setFiles={setFiles} />
      <h2 className="text-title">Tài liệu đang được xử lý</h2>
      {completedFiles.map((file) => {
        return (
          <File_item
            file_name={file}
            done={true}
            file_type="pdf"
            setFiles={setFiles}
            setCompletedFiles={setCompletedFiles}
          />
        );
      })}
      {files.map((file) => {
        return (
          <File_item
            file_name={file.name}
            done={false}
            file_type="pdf"
            setFiles={setFiles}
            setCompletedFiles={setCompletedFiles}
          />
        );
      })}
    </div>
  );
};

export default Upload;

const Upload_file = ({ setFiles }) => {
  const handleUpload = (e) => {
    const { name, size, type } = e.target.files[0];
    setFiles((prevFiles) => [...prevFiles, { name, size, type }]);
  };
  return (
    <div className="upload-file">
      <img
        src="./image/icon/icon_upload.png"
        alt="Tải lên"
        width="40"
        height="45"
        className="upload-img"
      />
      <div className="upload-text">Kéo thả file tại đây</div>
      <div className="upload-text">-OR-</div>

      <form action="" encType="multipart/form-data" method="post">
        {" "}
        <label className="upload-file-button">
          <input type="file" accept=".doc,.ppt,.pdf" onChange={handleUpload} />{" "}
          Tải lên file
        </label>
      </form>
      <br />
    </div>
  );
};
const File_item = ({
  file_name = "",
  done = true,
  file_type = "",
  setFiles,
  setCompletedFiles,
}) => {
  const { doc, setDoc } = useContext(DocContext);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (isChecked) {
      const soTrang = Math.floor(Math.random() * 40 + 60);
      const khoGiay = "A4";
      const newDoc = { ...doc };
      newDoc.list.push({ file_name, soTrang, khoGiay });
      setDoc(newDoc);
    } else {
      const newDoc = { ...doc };
      const newList = doc.list.filter((file) => file.file_name != file_name);
      newDoc.list = newList;
      setDoc(newDoc);
    }
  }, [isChecked]);
  useEffect(() => {
    if (!done) {
      const timer = setTimeout(() => {
        if (progress < 100) setProgress(progress + 20);
      }, 1000);
      if (progress == 100) {
        setStatus("completed");
        setFiles((prevFiles) => {
          const new_file = prevFiles.filter((element) => {
            return element.name !== file_name;
          });

          // prevFiles.pop(file_name);

          return new_file;
        });

        setCompletedFiles((prevFiles) => [...prevFiles, file_name]);
      }
      // // Clear the timer to avoid memory leaks
      // return () => clearTimeout(timer);
    } else {
      setProgress(100);

      setStatus("completed");
    }
  }, [progress]);
  return (
    <div className="select-file-line">
      <div className={`file-box ${status}`}>
        <img
          src={"./image/icon/icon_file_" + file_type + ".svg"}
          alt="PDF"
          className="icon-file"
        />
        <div className="file-info-box">
          <div className="file-info">
            <div className="file-name"> {file_name} </div>
            <div className="file-state">
              {" "}
              {status ? "Completed" : "Uploading"}
            </div>
          </div>

          <progress value={progress} max="100"></progress>
        </div>
      </div>
      <div className="select-box">
        <div className="select-title"> Chọn tài liệu</div>
        <div>
          {" "}
          <input
            className="select-input"
            type="checkbox"
            name="file"
            value={file_name}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{" "}
        </div>
      </div>
    </div>
  );
};
