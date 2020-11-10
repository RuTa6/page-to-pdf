import { useState } from "react";
import axios from "axios";
import "./App.css";
var fileDownload = require("js-file-download");
const App = () => {
  const [url, setUrl] = useState("");
  const [option, setOption] = useState("");
  const [pdfSize, setPdfSize] = useState("letter");
  const [screenshotOption, setScreenshotOption] = useState("fullpage");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [clipHeight, setClipHeight] = useState(800);
  const [clipWidth, setClipWidth] = useState(600);
  const [viewPortHeight, setViewPortHeight] = useState(800);
  const [viewPortWidth, setViewPortWidth] = useState(600);

  const handleClick = async (e) => {
    const body = {
      url: url,
      option: option,
      pdfSize: pdfSize,
      screenshotOption: screenshotOption,
      viewPortHeight: parseInt(viewPortHeight),
      viewPortWidth: parseInt(viewPortWidth),
      clipHeight: parseInt(clipHeight),
      clipWidth: parseInt(clipWidth),
      x: parseInt(x),
      y: parseInt(y),
    };

    await axios
      .post("https://us-central1-page2pdf94.cloudfunctions.net/widgets", body, {
        responseType: Blob,
        timeout: 30000,
      })
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="txtUrl"
          id="txtUrl"
          placeholder="page URL. example: https://www.google.com/"
          onChange={(e) => setUrl(e.target.value)}
          required
        ></input>
        <br></br>
        <select
          id="option"
          name="option"
          required
          onChange={(e) => setOption(e.target.value)}
        >
          <option>Select an option</option>
          <option value="pdf">PDF</option>
          <option value="screenshot">Screenshot</option>
        </select>
      </div>
      {option === "pdf" ? (
        <div>
          <div>
            <p>Page size</p>
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
            <div>
              <p>viewport</p>
              <input
                type="number"
                id="viewPortHeight"
                name="viewPortHeight"
                value={viewPortHeight}
                onChange={(e) => setViewPortHeight(e.target.value)}
              ></input>
              <br></br>
              <input
                type="number"
                id="viewPortWidth"
                name="viewPortWidth"
                value={viewPortWidth}
                onChange={(e) => setViewPortWidth(e.target.value)}
              ></input>
              <p>screen shot size</p>
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
              <label for="partial">Partial</label>
              <input
                type="radio"
                name="screenshotSize"
                id="clip"
                value="clip"
                onChange={(e) => setScreenshotOption(e.target.value)}
              ></input>
              <label for="clip">Clip</label>
              {screenshotOption === "clip" ? (
                <div>
                  <input
                    type="number"
                    id="x"
                    name="x"
                    placeholder=""
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                  ></input>
                  <br></br>
                  <input
                    type="number"
                    id="y"
                    name="y"
                    placeholder=""
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                  ></input>
                  <br></br>
                  <input
                    type="number"
                    id="clipHeight"
                    name="clipHeight"
                    placeholder=""
                    value={clipHeight}
                    onChange={(e) => setClipHeight(e.target.value)}
                  ></input>
                  <br></br>
                  <input
                    type="number"
                    id="clipWidth"
                    name="clipWidth"
                    placeholder=""
                    value={clipWidth}
                    onChange={(e) => setClipWidth(e.target.value)}
                  ></input>
                  <br></br>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <button onClick={handleClick}>submit</button>
    </div>
  );
};

export default App;
