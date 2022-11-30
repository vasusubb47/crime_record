import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { crime } from "@prisma/client";

const crimePage: NextPage = () => {

  const [ crimes, setCrime ] = useState([] as crime[]);

  useEffect(() => {
    fetch("/api/crime")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCrime(data);
      });
  }, []);

  return (
    <div className=" container">
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
              <td>{ele.date_of_crime.toString()}</td>
              <td><Link href={`/fir/report/${ele.fir_id}`}>{ele.fir_id}</Link></td>
            </tr>
          })
        }</tbody>
      </table>
      <Link href="/linkCrime" className="btn btn-primary"> link cime to criminal </Link>
    </div>
  );
};

export default crimePage;
