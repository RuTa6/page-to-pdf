import { useState } from "react";
import axios from "axios";
//import "bulma/css/bulma.css";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [screenSize, setScreenSize] = useState("hd");
  const [option, setOption] = useState("pdf");
  const [pdfSize, setPdfSize] = useState("letter");
  const [screenshotOption, setScreenshotOption] = useState("fullpage");
  const [load, setLoad] = useState(0);
  const handleClick = async (e) => {
    if (url != "") {
      const body = {
        url: url,
        option: option,
        pdfSize: pdfSize,
        screenshotOption: screenshotOption,
        screenSize: screenSize,
      };

      await axios
        .post(
          "https://us-central1-page2pdf94.cloudfunctions.net/widgets",
          body,
          {
            responseType: "blob",
            timeout: 30000,
          },
          setLoad(1)
        )
        .then((response) => {
          const downloadUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = downloadUrl;
          if (option === "screenshot") {
            link.setAttribute("download", "screenshot.png");
          } else {
            link.setAttribute("download", "document.pdf");
          }
          document.body.appendChild(link);
          link.click();
          link.remove();
          setLoad(0);
        })
        .catch((error) => {
          alert("error occured:" + error);
        });
    } else {
      alert("Please give a URL");
    }
  };

  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiaWblQeDFPUf7meEpXixt5HccQvzPEkTOLA&usqp=CAU"
        alt=""
      ></img>

      <div className="App">
        <center>
          <h1>Convert webpages to pdf o pic...</h1>
          <h2>See the magic in seconds..</h2>
        </center>
        {load === 0 ? (
          <>
            <div className="container">
              <select
                className="slct"
                id="option"
                name="option"
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="screenshot">Screenshot</option>
              </select>
              <input
                className="input"
                type="text"
                name="txtUrl"
                id="txtUrl"
                placeholder="page URL. example: https://www.google.com/"
                onChange={(e) => setUrl(e.target.value)}
                required
              ></input>
              <button className="btn" onClick={handleClick}>
                <img
                  className="downloadimg"
                  src="https://vectorified.com/images/white-icon-png-37.png"
                ></img>
              </button>
            </div>

            <div className="resContain">
              <select
                className="resolution"
                id="resolution"
                name="resolution"
                onChange={(e) => setScreenSize(e.target.value)}
              >
                <option value="fhd">Full HD</option>
                <option value="hdplus">HD+</option>
                <option selected value="hd">
                  HD
                </option>
                <option value="threesixtyp">360p</option>
                <option value="twofortyp">240p</option>
              </select>
            </div>

            {option === "pdf" ? (
              <div className="control">
                <div className="">
                  <input
                    type="radio"
                    name="pageSize"
                    id="letter"
                    value="letter"
                    onChange={(e) => setPdfSize(e.target.value)}
                  ></input>
                  <label for="letter">Letter</label>
                  <input
                    type="radio"
                    name="pageSize"
                    id="A4"
                    value="a4"
                    onChange={(e) => setPdfSize(e.target.value)}
                  ></input>

                  <label for="A4">A4</label>
                  <input
                    type="radio"
                    name="pageSize"
                    id="A5"
                    value="a5"
                    onChange={(e) => setPdfSize(e.target.value)}
                  ></input>
                  <label for="A5">A5</label>
                </div>
              </div>
            ) : (
              <div>
                {option === "screenshot" ? (
                  <div className="control">
                    <div className="">
                      <input
                        type="radio"
                        name="screenshotSize"
                        id="fullpage"
                        value="fullpage"
                        onChange={(e) => setScreenshotOption(e.target.value)}
                      ></input>
                      <label for="fullpage">Fullpage</label>
                      <input
                        type="radio"
                        name="screenshotSize"
                        id="partial"
                        value="partial"
                        onChange={(e) => setScreenshotOption(e.target.value)}
                      ></input>
                      <label for="partial">Partial (only visible region)</label>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
            <div></div>
          </>
        ) : (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
