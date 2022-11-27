import { NextPage } from "next";
import { useEffect, useState } from "react";

const fir: NextPage = () => {

  const [ firs, setFirs ] = useState([{
    id: "",
    date_of_filling: "",
    witness_name: "",
    witness_pho: "",
    summary: "",
    area_code: ""
  }]);

  useEffect(() => {
    fetch("/api/fir")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setFirs(data);
      });
  }, []);

  return (
    <div>
      <h1 className="handwriten">Fir</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>date of filling</th>
            <th>witness name</th>
            <th>witness pho</th>
            <th>summary</th>
            <th>area code</th>
          </tr>
        </thead>
        <tbody>{
          firs.map((ele, ind: number) => {
            return <tr key={ind}>
              <td>{ele.id}</td>
              <td>{ele.date_of_filling}</td>
              <td>{ele.witness_name}</td>
              <td>{ele.witness_pho}</td>
              <td>{ele.summary}</td>
              <td>{ele.area_code}</td>
            </tr>
          })
        }</tbody>
      </table>
    </div>
  );
};

export default fir;
