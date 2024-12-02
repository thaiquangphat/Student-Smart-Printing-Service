import React, { useState } from "react";
import Popup from "../popup/popup.component";
import search from "../../assets/search.svg";
import "./xemlichsunvia.styles.css";

const XemLichSuNvia = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="button-custom1" onClick={() => setOpen(true)}>
        Xem lịch sử
      </div>
      {open && (
        <Popup openPopup={setOpen} closeBtn={false}>
          <div className="popup-title">
            <h1>Lịch sử in</h1>
          </div>

          <div className="popup-body">
            <div className="search-box-container">
              <img src={search} alt="Search" className="search-icon" />
              <input
                type="search"
                className="search-box"
                placeholder="Tìm lịch sử giao dịch"
              />
            </div>

            <table className="table-history-nvia">
              <thead>
                <tr>
                  <th className="history-title-nvia">Thời gian</th>
                  <th className="history-title-nvia">Mã giao dịch</th>
                  <th className="history-title-nvia">Mã máy in</th>
                  <th className="history-title-nvia history-title-nvia-username">Tên tài khoản</th>
                  <th className="history-title-nvia history-title-nvia-filename">
                    Tên tài liệu
                  </th>
                  <th className="history-title-nvia">Số trang</th>
                  <th className="history-title-nvia">Trạng thái</th>
                  <th className="history-title-nvia">Chi tiết giao dịch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>17:00:24 18/11/2023</td>
                  <td className="history-item-content-nvia">T-Pr-001</td>
                  <td className="history-item-content-nvia">BK-LTK-001</td>
                  <td className="history-item-content-nvia history-item-content-nvia-username">Lê Duy Anh</td>
                  <td className="history-item-content-nvia history-item-content-nvia-filename">Software-Engineer-Document.docs</td>
                  <td className="history-item-content-nvia history-item-content-nvia-pagenumber">100</td>
                  <td className="history-item-content-nvia-receive">Received</td>
                  <td className="history-item-content-nvia">
                    <div className="history-xemchitiet">Xem chi tiết</div>
                  </td>
                </tr>

                <tr>
                  <td>08:30:29 29/10/2023</td>
                  <td className="history-item-content-nvia">T-Pr-010</td>
                  <td className="history-item-content-nvia">BK-LTK-001</td>
                  <td className="history-item-content-nvia history-item-content-nvia-username">Nguyễn Trần Bảo Ngọc</td>
                  <td className="history-item-content-nvia history-item-content-nvia-filename">Data-Structure-and-Algorithms-Textbook.pdf</td>
                  <td className="history-item-content-nvia history-item-content-nvia-pagenumber">100</td>
                  <td className="history-item-content-nvia-printed">Printed</td>
                  <td className="history-item-content-nvia">
                    <div className="history-xemchitiet">Xem chi tiết</div>
                  </td>
                </tr>

                <tr>
                  <td>20:00:01 05/10/2023</td>
                  <td className="history-item-content-nvia">T-Pr-100</td>
                  <td className="history-item-content-nvia">BK-LTK-001</td>
                  <td className="history-item-content-nvia history-item-content-nvia-username">Lê Phương Các</td>
                  <td className="history-item-content-nvia history-item-content-nvia-filename">Introduction-to-Artificial-Intelligence-Slide.pptx</td>
                  <td className="history-item-content-nvia history-item-content-nvia-pagenumber">100</td>
                  <td className="history-item-content-nvia-inprogress">In progress</td>
                  <td className="history-item-content-nvia">
                    <div className="history-xemchitiet">Xem chi tiết</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="popup-footer">
            <button
              className="button-footer"
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Quay lại
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};
export default XemLichSuNvia;
