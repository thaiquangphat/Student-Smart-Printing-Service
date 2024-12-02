import React, { useContext, useEffect, useState } from "react";
import "./lsmuagiayin.styles.css";
import { getBuyHistory } from "../../../ultis/firebase/firebase";
import { UserContext } from "../../../contexts/user.context";
import search from "../../../assets/search.svg";

const LsMuaGiay = () => {
  const { currentUser } = useContext(UserContext);
  const [searchField, setSearchField] = useState("");
  const [ls, setLs] = useState([]);
  const [filteredLs, setFilteredLs] = useState(ls);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBuyHistory(currentUser);

      setLs(response);
    };
    fetchData();
    // const newLs = response.map((response) => response);
    // console.log(newLs);
  }, []);

  useEffect(() => {
    const newLs = ls.filter((record) => {
      return record.ma.toLocaleLowerCase().includes(searchField);
    }).slice(0,8);
    setFilteredLs(newLs);
  }, [ls, searchField]);
  const handleSearch = (e) => {
    const searchString = e.target.value.toLocaleLowerCase();
    setSearchField(searchString);
    // const newLs = ls.filter((record) => {
    //   return record.ma.toLocaleLowerCase().includes(searchField);
    // });

    // // console.log(newLs, searchField);
    // setFilteredLs(newLs);
  };
  // console.log(filteredLs);
  return (
    <div>
      <div className="search-box-container">
        <img src={search} alt="Search" className="search-icon"/>
        <input
          type="search"
          className="search-box"
          onChange={handleSearch}
          placeholder="Tìm mã số"
        />
      </div>
      <table className="table-history">
        <thead>
          <tr>
            <th className="history-title">Thời gian</th>
            <th className="history-title">Mã giao dịch</th>
            <th className="history-title">Số trang</th>
            <th className="history-title">Giá tiền</th>
            <th className="history-title">Trạng thái</th>
          </tr>
        </thead>
        {/* {console.log(ls)} */}
        <tbody>
          {filteredLs.map((record) => {
            return (
              <tr key={record.ma}>
                <td>{record.date.toDate().toString().slice(0, 24)}</td>
                <td>{record.ma.slice(0, 5)}</td>
                <td>{record.soluonggiay}</td>
                <td className="price-td">{`${record.giatien} VNĐ`}</td>
                <td className="pay-state">{record.paid ? "Paid" : "Unpaid"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LsMuaGiay;
