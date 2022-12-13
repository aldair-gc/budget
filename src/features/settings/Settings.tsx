import { useState } from "react";
import { FaRegArrowAltCircleLeft, FaRegTimesCircle } from "react-icons/fa";
import { LanguageContext, NumberContext, ThemeContext } from "../../app/App";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import DeleteUser from "./DeleteUser";
import DownloadData from "./DowloadData";
import { MenuContainer, SettingsContainer } from "./style";
import UpdateUser from "./UpdateUser";

type SettingsTypes = "none" | "updateUser" | "deleteUser" | "downloadData";

export default function Settings(props: { close: () => void; }){
  const [selection, setSelection] = useState("none" as SettingsTypes);

  return (
    <LanguageContext.Consumer>
      {({language, file, setLanguage}) => (
        <NumberContext.Consumer>
          {({country, setCountry}) => (
            <LayerContainer>
              <WindowContainer>
                <WindowHeaderContainer>
                  <button onClick={() => selection !== "none" ? setSelection("none") : props.close()}>
                    {selection !== "none" ? <FaRegArrowAltCircleLeft/> : <FaRegTimesCircle/>}
                  </button>
                  <h1>{file.settings.title}</h1>
                </WindowHeaderContainer>
                <WindowBodyContainer width={"350px"} height={"400px"}>
                  <SettingsContainer>
                    {selection === "none" &&
                      <MenuContainer>
                        <ThemeContext.Consumer>
                          {({themeId, setTheme}) => (
                            <div className="config-item">{file.settings.theme}:
                              <div className="config-item-options">

                                <label htmlFor="auto">
                                  <input type="radio" name="theme" id="auto"onClick={() => setTheme("auto")} defaultChecked={themeId === "auto"}/>
                                  {file.settings.auto}
                                </label>

                                <label htmlFor="light">
                                  <input type="radio" name="theme" id="light" onClick={() => setTheme("light")} defaultChecked={themeId === "light"}/>
                                  {file.settings.light}
                                </label>

                                <label htmlFor="dark">
                                  <input type="radio" name="theme" id="dark" onClick={() => setTheme("dark")} defaultChecked={themeId === "dark"}/>
                                  {file.settings.dark}
                                </label>

                              </div>
                            </div>
                          )}
                        </ThemeContext.Consumer>

                        <div className="config-item">{file.settings.language}:
                          <div className="config-item-options">

                            <label htmlFor="en-US">
                              <input type="radio" name="language" id="en-US"onClick={() => setLanguage("en-US")} defaultChecked={language === "en-US"}/>
                              {file.settings.english}
                            </label>

                            <label htmlFor="pt-BR">
                              <input type="radio" name="language" id="pt-BR" onClick={() => setLanguage("pt-BR")} defaultChecked={language === "pt-BR"}/>
                              {file.settings.brazilian}
                            </label>

                          </div>
                        </div>

                        <div className="config-item">{file.settings.currency}:
                          <div className="config-item-options">

                            <label htmlFor="real">
                              <input type="radio" name="currency" id="real"onClick={() => setCountry("en-US")} defaultChecked={country === "en-US"}/>
                              {file.settings.dolar}
                            </label>

                            <label htmlFor="dolar">
                              <input type="radio" name="currency" id="dolar" onClick={() => setCountry("pt-BR")} defaultChecked={country === "pt-BR"}/>
                              {file.settings.real}
                            </label>

                          </div>
                        </div>

                        <li onClick={() => setSelection("updateUser")}>{file.settings.editAccount}</li>
                        <li onClick={() => setSelection("deleteUser")}>{file.settings.deleteAccount}</li>
                        <li onClick={() => setSelection("downloadData")}>{file.settings.downloadData}</li>
                      </MenuContainer>
                    }
                    {selection === "updateUser" && <UpdateUser/>}
                    {selection === "deleteUser" && <DeleteUser/>}
                    {selection === "downloadData" && <DownloadData/>}
                  </SettingsContainer>
                </WindowBodyContainer>
              </WindowContainer>
            </LayerContainer>
          )}
        </NumberContext.Consumer>
      )}
    </LanguageContext.Consumer>
  );
}
