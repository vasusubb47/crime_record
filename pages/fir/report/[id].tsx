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
    <div className="container">
      <h1 className="handwriten">FRI Report</h1>
      <hr />
      
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
