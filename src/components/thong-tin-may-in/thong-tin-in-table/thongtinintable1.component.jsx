import React, { useState } from "react";

import styles from "./thongtinintable.module.css";

/* Component to display each row of table in NhanGiaoDich
 *   props:
 *       + data: object of each row to display: {id, time, date, accountName, accountNameTag, transactionID, printerID, docName, pageNumber,
 *                           confirmation:bool, status:bool, delivery:bool}
 */


const TableRow1 = (props) => {
  const data = props.data;

  return (
    <tr>
      <td>
        <div className={styles.printerID}>{data.printerID}</div>
      </td>
      <td>
        <div className={styles.printerName}>{data.printerName}</div>
      </td>
      <td>
        <div className={styles.location}>{data.location}</div>
        <div className={styles.locationTag}>{data.locationTag}</div>
      </td>
      <td>{data.time}</td>
      <td>{data.companyName}</td>
      <td>{data.status}</td>
      <td>
        <input
          type="radio"
          name={"confirmation" + data.id}
          value="Confirm"
          defaultChecked={data.confirmation}
        />
        <span>Cho sử dụng</span>
        <br />
        <input
          type="radio"
          name={"confirmation" + data.id}
          value="UnConfirm"
          defaultChecked={!data.confirmation}
        />
        <span>Ngưng sử dụng</span>
      </td>
    </tr>
  );
};

export default TableRow1;
