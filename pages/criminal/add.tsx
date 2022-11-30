
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";

const addCriminal: NextPage = () => {

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <div>
      <h1 className="handwriten">Add Criminal</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        console.log(target);
        const [name, address, phoneNo] = [target[0], target[1], target[2]] as HTMLInputElement[];
        
        const data = {
          name: name.value,
          address: address.value,
          phoneNo: phoneNo.value
        };
        console.log(data);
        fetch(
          "/api/criminal/add",
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
              Router.push("/criminal");
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
            <tr key={"name"}>
              <td><label htmlFor="name">name</label></td>
              <td><input type="text" name="name" id="name" /></td>
            </tr>
            <tr key={"address"}>
              <td><label htmlFor="address">address</label></td>
              <td><input type="text" name="address" id="address" /></td>
            </tr>
            <tr key={"phoneNo"}>
              <td><label htmlFor="phoneNo">phoneNo</label></td>
              <td><input type="text" name="phoneNo" id="phoneNo" /></td>
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
}

export default addCriminal;
