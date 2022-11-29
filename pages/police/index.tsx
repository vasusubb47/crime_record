import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const pst: NextPage = () => {

  const [ police, setPoliceSt ] = useState([{
    id: "",
    name: "",
    address: ""
  }]);

  useEffect(() => {
    fetch("/api/police")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setPoliceSt(data);
      });
  }, []);

  return (
    <div className=" container">
      <h1 className="handwriten">Ploice Station</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>{
          police.map((ele, ind: number) => {
            return <tr key={ind}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.address}</td>
            </tr>
          })
        }</tbody>
      </table>
      <Link href="/police/add" className="btn btn-primary">Add</Link>
    </div>
  );
};

export default pst;
