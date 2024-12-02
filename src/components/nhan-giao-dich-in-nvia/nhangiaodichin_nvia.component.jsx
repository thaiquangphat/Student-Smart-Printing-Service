import React, { useState } from "react";

import styles from "./nhangiaodichin_nvia.module.css";
import search_icon from "../../assets/search.svg";
import Popup from "../popup/popup.component";
import Button from "../button/button.component";
import TableRow from "./nhan-giao-dich-table-content/nhangiaodichtablecontent.component";

/**
 *
 * @param {*} props
 * @returns
 */
const NhanGiaoDichIn = (props) => {
  const exampleData = [
    {
      id: "1",
      time: "17:00:24",
      date: "18/11/2023",
      accountName: "Thái Quang Phát",
      accountNameTag: "phat.thai04",
      transactionID: "T-Pa-001",
      printerID: "BK-LTK-001",
      docName: "sample.pdf",
      pageNumber: "100",
      confirmation: true,
      status: true,
      delivery: true,
    },
    {
      id: "2",
      time: "08:30:29",
      date: "29/10/2023",
      accountName: "Thai Quang Du",
      accountNameTag: "du.thai04",
      transactionID: "T-Pa-001",
      printerID: "BK-LTK-001",
      docName: "sample.pdf",
      pageNumber: "80",
      confirmation: true,
      status: false,
      delivery: false,
    },
    {
      id: "3",
      time: "20:00:01",
      date: "05/10/2023",
      accountName: "Nguyen Van A",
      accountNameTag: "a.nguyen04",
      transactionID: "T-Pa-002",
      printerID: "BK-LTK-001",
      docName: "sample.pdf",
      pageNumber: "150",
      confirmation: true,
      status: false,
      delivery: false,
    },
  ];

  // UseState
  const [filterString, setFilterString] = useState("");

  /**
   * Callback: Handle for SearchBar onChange event: set search's value to useState 'filterString'
   * @param {*} event
   */
  const handleSearchBarOnChange = (event) => {
    setFilterString(event.target.value);
  };

  /**
   * Get Data to Display, can be got from HardCode or Database
   * @returns :Array of datas
   */
  function getData() {
    return exampleData;
  }

  /**
   * Filter data with match string
   * @param {*} data : data to filter
   * @param {*} filterString : string to filter
   * @returns true : data matchs with filterString
   * @returns false: otherwise
   **/
  function filter(data, filterString) {
    if (data === undefined || filterString === undefined) return false;
    if (filterString == "") return true;
    //
    filterString = filterString.toLowerCase();
    const nameString = data["docName"].toLowerCase();
    //
    return nameString.includes(filterString);
  }

  /* Display Data to Table
   * Input: array of object: {id, time, date, accountName, accountTagName, transactionID, printerID, docName, pageNumber,
   *  confirmation:bool, status:bool, delivery:bool} */
  function displayTable(dataArr) {
    //
  }

  // Main process
  const dataArr = getData();

  // Return
  return (
    <Popup openPopup={props.openPopup}>
      <div className="popup-title">
        <h1>Lịch sử giao dịch</h1>
      </div>
      <div className="popup-body">
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <img src={search_icon} alt="Search" />
            <input
              type="text"
              name="seacrhBar"
              onChange={handleSearchBarOnChange}
            />
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>Thời gian</th>
                  <th style={{ width: "15%" }}>Tên sinh viên</th>
                  <th style={{ width: "8%" }}>Mã dịch vụ</th>
                  <th style={{ width: "8%" }}>Máy in</th>
                  <th style={{ width: "26%" }}>File</th>
                  <th style={{ width: "5%" }}>Số trang</th>
                  <th style={{ width: "10%" }}>Xác nhận</th>
                  <th style={{ width: "10%" }}>Trạng thái</th>
                  <th style={{ width: "10%" }}>Đã nhận</th>
                </tr>
              </thead>
              <tbody>
                {dataArr.map(
                  (data) =>
                    filter(data, filterString) && (
                      <TableRow data={data} key={data["id"]} />
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="popup-footer">
        <Button
          className="button-footer"
          onClick={() => props.openPopup(false)}
        >
          Quay lại
        </Button>
      </div>
    </Popup>
  );
};

export default NhanGiaoDichIn;
