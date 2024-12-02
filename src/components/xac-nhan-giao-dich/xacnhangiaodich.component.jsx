import React, { useContext, useEffect } from "react";
import "./xacnhangiaodich.styles.css";
import { DocContext } from "../../contexts/doc.context";

const XacNhanGiaoDich = () => {
  const { doc, setDoc } = useContext(DocContext);

  const getReadyTime = () => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 10);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Lấy ngày, tháng và năm
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
    const year = currentDate.getFullYear();
    // Định dạng giờ và phút thành chuỗi
    const timeFormat = hours + ":" + (minutes < 10 ? "0" : "") + minutes;

    // Định dạng ngày thành chuỗi
    const dateFormat = day + "/" + month + "/" + year;

    // Kết hợp giờ và ngày thành định dạng cuối cùng
    const finalFormat = timeFormat + ", " + dateFormat;

    return finalFormat;
  };

  useEffect(() => {
    const docCopy = { ...doc };
    docCopy.date = new Date();
    console.log(docCopy);
    setDoc(docCopy);
  }, []);

  return (
    <div>
      <div className="order-info">
        <div className="order-title">
          <span>Thời gian dự kiến: </span>
          <span className="order-content">10 phút</span>
        </div>
        <div className="order-title">
          <span>Thời gian hoàn thành dự kiến: </span>
          <span className="order-content">{getReadyTime()}</span>
        </div>
        <div className="order-title">
          <span>Số lượng file: </span>
          <span className="order-content">{doc.list.length}</span>
        </div>
        <div className="order-title">Danh sách file: </div>
      </div>
      <table className="order-file-table">
        <thead>
          <tr className="order-file-table-title">
            <th className="file-title">Tên tài liệu</th>
            <th className="file-title">Kích thước</th>
            <th className="file-title">Số trang</th>
          </tr>
        </thead>
        <tbody className="file-list">
          {doc.list.map((item) => (
            <tr className="file-item">
              <td className="file-item-content file-name">{item.file_name}</td>
              <td className="file-item-content file-name">
                {(item.soTrang * 8000) / 100 + "KB"}
              </td>
              <td className="file-item-content file-name">{item.soTrang}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="order-file-table">
        <div className="order-file-table-title">
          <div className="file-title">Tên tài liệu</div>
          <div className="file-title">Kích thước</div>
          <div className="file-title">Số trang</div>
        </div>
        <ul className="file-list">
          <li className="file-item">
            <div className="file-item-content file-name">
              Software-Engineer-document.pdf
            </div>
            <div className="file-item-content">100 KB</div>
            <div className="file-item-content">100</div>
          </li>
          <li className="file-item">
            <div className="file-item-content file-name">
              Software-Engineer-document.pdf
            </div>
            <div className="file-item-content">100 KB</div>
            <div className="file-item-content">100</div>
          </li>
          <li className="file-item">
            <div className="file-item-content file-name">
              Software-Engineer-document.pdf
            </div>
            <div className="file-item-content">100 KB</div>
            <div className="file-item-content">100</div>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default XacNhanGiaoDich;
