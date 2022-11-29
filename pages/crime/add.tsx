
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { crime } from "@prisma/client";

const addCrime: NextPage = () => {

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <div>
      <h1 className="handwriten">Add Crime</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        console.log(target);
        const [location, type_of_crime, date_of_crime, fir_id] = [target[0], target[1], target[2], target[3]] as [HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLInputElement];
        
        const data = {
          location: location.value,
          type_of_crime: type_of_crime.value,
          date_of_crime: date_of_crime.value,
          fir_id: fir_id.value,
        };
        console.log(data);
        fetch(
          "/api/crime/add",
          {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        )
        .then(res => {
          setStatus(res.status);
          if(res.status == 200) {
            setTimeout(() => {
              // Router.push("/crime");
            }, 3000);
          }
          res.json().then(
            data => setMessage(data)
          );
        }).then()
      }}
        className="form"
      >
        <table>
          <tbody>
            <tr key={"location"}>
              <td><label htmlFor="location">location</label></td>
              <td><input type="text" name="location" id="location" /></td>
            </tr>
            <tr key={"typeOfCrime"}>
              <td><label htmlFor="typeOfCrime">type of crime</label></td>
              <td><input type="text" name="typeOfCrime" id="typeOfCrime" /></td>
            </tr>
            <tr key={"dateOfCrime"}>
              <td><label htmlFor="dateOfCrime">date of crime</label></td>
              <td><input type="text" name="dateOfCrime" id="dateOfCrime" /></td>
            </tr>
            <tr key={"firId"}>
              <td><label htmlFor="firId">fir id</label></td>
              <td><input type="text" name="firId" id="firId" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      {status != 0 ? <>
          <hr />
          {status == 405 ? <>
            error: {(message as any).message}
          </> : <>
            sucess {JSON.stringify(message)}
          </>}
        </> : 
        <></>
      }
    </div>
  );
};

export default addCrime;
