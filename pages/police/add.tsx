
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";

const addPoliceSt: NextPage = () => {

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <div>
      <h1 className="handwriten">Add Police Station</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        console.log(target);
        const [name, address] = [target[0], target[1]] as [HTMLInputElement, HTMLInputElement];
        
        const data = {
          name: name.value,
          address: address.value
        };
        console.log(data);
        fetch(
          "/api/police/add",
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
              Router.push("/police");
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

export default addPoliceSt;
