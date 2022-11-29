import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";

const reportCrime: NextPage = () => {

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState({});

  return (
    <div className="container">
      <h1 className="handwriten">Report crime</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        const t = e.target as HTMLFormElement;
        const [wname, wPho, pstId, loc, toc, summary] = [t[0], t[1], t[2], t[3], t[4], t[5]] as [HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLTextAreaElement];
        
        const data = {
          witness_name: wname.value,
          witness_pho: wPho.value,
          area_code: pstId.value,
          summary: summary.value,
          location: loc.value,
          typeOfCrime: toc.value
        };

        (t[6] as HTMLButtonElement).disabled = true;

        console.log(data);

        fetch(
          "/api/reportCrime",
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        ).then(
          res => {
            setStatus(res.status);
            if(res.status == 200) {
              setTimeout(() => {
                Router.push("/fir");
              }, 3000);
            }else {
              (t[6] as HTMLButtonElement).disabled = false;
            }
            res.json().then(
              data => setMessage(data)
            );
          }
        ).then();

      }}>
        <table>
          <tr key="witness-name">
            <td>
              <label htmlFor="witness-name">witness name</label>
            </td>
            <td>
              <input type="text" id="witness-name"/>
            </td>
          </tr>
          <tr key="witness-pho">
            <td>
              <label htmlFor="witness-pho">witness phone#</label>
            </td>
            <td>
              <input type="text" id="witness-pho"/>
            </td>
          </tr>
          <tr key="pst">
            <td>
              <label htmlFor="pst">police station Id</label>
            </td>
            <td>
              <input type="text" id="pst"/>
            </td>
          </tr>
          <tr key="location">
            <td>
              <label htmlFor="location">location</label>
            </td>
            <td>
              <input id="location"/>
            </td>
          </tr>
          <tr key="typeOfCrime">
            <td>
              <label htmlFor="typeOfCrime">type of crime</label>
            </td>
            <td>
              <input id="typeOfCrime"/>
            </td>
          </tr>
          <tr key="summary">
            <td>
              <label htmlFor="summary">symmary</label>
            </td>
            <td>
              <textarea id="summary" rows={20} cols={100}/>
            </td>
          </tr>
        </table>
        <button type="submit" className="btn btn-primary">subumit</button>
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

export default reportCrime;
