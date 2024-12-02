import React, { useState } from "react";

import styles from "./thongtinin_nvia.module.css";
import search_icon from "../../assets/search.svg";
import Popup from "../popup/popup.component";
import Button from "../button/button.component";
import TableRow from "./thong-tin-in-table/thongtinintable.component";

/**
 *
 * @param {*} props
 * @returns
 */
const NhanGiaoDichIn = (props) => {
  const exampleData = [
    {
      id: "1",
      time: "11/10/2004",
      printerName: "Samsung Printer Pro",
      location: "A4-503",
      locationTag: "LyThuongKiet",
      printerID: "BK-LTK-001",
      companyName: "Samsung",
      status: "Tốt",
      confirmation: true,
    },
    {
      id: "2",
      time: "11/09/2010",
      printerName: "Apple Printer Pro",
      location: "A3",
      locationTag: "LyThuongKiet",
      printerID: "BK-LTK-002",
      companyName: "Apple",
      status: "Ổn",
      confirmation: false,
    },
    {
      id: "3",
      time: "11/09/2010",
      printerName: "Logitech Printer Ultra",
      location: "H6-501",
      locationTag: "DA",
      printerID: "BK-DA-003",
      companyName: "Logitech",
      status: "Tốt",
      confirmation: true,
    },
    {
      id: "4",
      time: "10/10/2022",
      printerName: "Huawei Printer Plus",
      location: "H6-503",
      locationTag: "DA",
      printerID: "BK-DA-004",
      companyName: "Huawei",
      status: "Tốt",
      confirmation: false,
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
        <h1>Danh sách máy in</h1>
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
                  <th style={{ width: "8%" }}>Mã máy in</th>
                  <th style={{ width: "15%" }}>Tên máy in</th>
                  <th style={{ width: "15%" }}>Địa điểm</th>
                  <th style={{ width: "15%" }}>Ngày nhập</th>
                  <th style={{ width: "19%" }}>Công ty</th>
                  <th style={{ width: "8%" }}>Tình trạng</th>
                  <th style={{ width: "10%" }}>Trạng thái</th>
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
