import { NextPage } from "next";
import { useEffect, useState } from "react";

const crimePage: NextPage = () => {

  const [ crimes, setCrime ] = useState([{
    id: "",
    location: "",
    type_of_crime: "",
    date_of_crime: "",
    fir_id: ""
  }]);

  useEffect(() => {
    fetch("/api/crime")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCrime(data);
      });
  }, []);

  return (
    <div>
      <h1 className="handwriten">Crime</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>location</th>
            <th>type of crime</th>
            <th>date of crime</th>
            <th>fir id</th>
          </tr>
        </thead>
        <tbody>{
          crimes.map((ele, ind: number) => {
            return <tr key={ind}>
              <td>{ele.id}</td>
              <td>{ele.location}</td>
              <td>{ele.type_of_crime}</td>
              <td>{ele.date_of_crime}</td>
              <td>{ele.fir_id}</td>
            </tr>
          })
        }</tbody>
      </table>
    </div>
  );
};

export default crimePage;
