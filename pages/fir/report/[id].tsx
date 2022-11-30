import { crime, fir, criminal } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const firReport: NextPage = () => {

  const [report, setReport] = useState({} as {
    fir: fir,
    crime: crime,
    criminals: criminal[]
  });

  const url = useRouter();
  const id = url.query;
  useEffect(() => {
    console.log(id, id.id);
    if (id.id !== undefined) {
      console.log(id, report);
      fetch("/api/fir/report?id="+ id.id)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setReport(data);
        });
    }
  }, [id]);

  return (
    // {report.fir ? }
    <div className="container">
      <h1 className="handwriten">FRI Report</h1>
      {report.fir ? <>
        <hr />
        <h2>{report.fir.id}</h2>
        <hr />
        <h4>Witness Name</h4>
        <p>{report.fir.witness_name}</p>
        <h4>Witness Pho</h4>
        <p>{report.fir.witness_pho}</p>
        <h4>area code</h4>
        <p>{report.fir.area_code}</p>
        <h4>date of filling</h4>
        <p>{report.fir.date_of_filling.toString()}</p>
        <h4>Summary</h4>
        <p>{report.fir.summary}</p>
        <hr />
        <h3>Crime {report.crime.id}</h3>
        <h4>Date Of Crime</h4>
        <p>{report.crime.date_of_crime.toString()}</p>
        <h4>Location</h4>
        <p>{report.crime.location}</p>
        <h4>Type Of Crime</h4>
        <p>{report.crime.type_of_crime}</p>
        {report.criminals.length == 0? <div>
          <hr />
          <p>No Criminals Cought for this crime Yet</p>
        </div> : <div>
          {report.criminals.map((criminal) => 
            <div key={criminal.id} className="container">
              <hr />
              <h5>criminal id</h5>
              <p>{criminal.id}</p>
              <h5>Name</h5>
              <p>{criminal.name}</p>
              <h5>Address</h5>
              <p>{criminal.address}</p>
              <h5>Phone No</h5>
              <p>{criminal.phone_number}</p>
            </div>
          )}
        </div>}
      </>: <></>
      }
      <hr />
      <button 
        onClick={() => {
          Router.back();
        }}
        className="btn btn-danger"  
      >back</button>
    </div>
  );
}

export default firReport;
