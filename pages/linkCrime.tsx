import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";

const linkCrime: NextPage = () => {

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <div className=" container">
      <h1 className="handwriten">Link Crime & Criminal</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const t = e.target as HTMLFormElement;
        const [cid, crids] = [t[0], t[1]] as HTMLInputElement[];

        const data = {
          crimeId: cid.value,
          criminalIds: crids.value
            .trim()
            .split(',')
            .map((val) => val.trim())
        }

        console.log(data);

        fetch(
          "/api/linkCrime",
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
              Router.push("/crime");
            }, 3000);
          }
          res.json().then(
            data => setMessage(data)
          );
        }).then();

      }}>
        <table>
          <tr key="crime">
            <td>
              <label htmlFor="crime">crime id</label>
            </td>
            <td>
              <input type="text" id="crime"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="criminals">criminal id's (seperated by ,)</label>
            </td>
            <td>
              <input type="text" id="criminals"/>
            </td>
          </tr>
        </table>
        <button type="submit" className="btn btn-primary">Link</button>
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

export default linkCrime;
