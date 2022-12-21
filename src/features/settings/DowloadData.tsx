/* eslint-disable @typescript-eslint/no-explicit-any */
import { LanguageContext, LoadingContext } from "../../app/App";
import axios from "../../services/axios";
import { InputContainer } from "./style";

export default function DownloadData() {
  async function downloadData(setLoading: (status: string) => void) {
    try {
      setLoading("loading");
      const confirmationRequest = await axios.get("/transaction");
      if (confirmationRequest.status === 200) {
        setLoading("success");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(confirmationRequest.data)], { type: "text/plain" }));
        a.setAttribute("download", "data.txt");
        a.className = "hidden";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setLoading("failure");
      }
    } catch (error: any) {
      setLoading("failure");
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => err);
    }
  }

  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <InputContainer>
          <h2>{file.downloadData.title}</h2>
          <p>{file.downloadData.text}</p>

          <LoadingContext.Consumer>
            {({ setStatus }) => <button onClick={() => downloadData(setStatus)}>{file.downloadData.download}</button>}
          </LoadingContext.Consumer>
        </InputContainer>
      )}
    </LanguageContext.Consumer>
  );
}
