import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const criminal: NextPage = () => {

  const [ criminals, setCriminals ] = useState([{
    id: "",
    name: "",
    address: "",
    phone_number: ""
  }]);

  useEffect(() => {
    fetch("/api/criminal")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCriminals(data);
      });
  }, []);

  return (
    <div>
      <h1 className="handwriten">Criminal</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>address</th>
            <th>phone number</th>
          </tr>
        </thead>
        <tbody>{
          criminals.map((ele, ind: number) => {
            return <tr key={ind}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.address}</td>
              <td>{ele.phone_number}</td>
            </tr>
          })
        }</tbody>
      </table>
      <hr />
      <Link className="btn btn-primary" href="/criminal/add"> Add </Link>
    </div>
  );
};

export default criminal;
