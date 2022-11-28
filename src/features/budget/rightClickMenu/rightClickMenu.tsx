import { useState } from "react";
import { SetEditOptionsInterface } from "../interfaces";
import { RightClickMenuContainer, MenuOption } from "./style";

export default function RightClickMenu(props: Props) {
  const [click, setClick] = useState({x: -300, y: -300, display: "none"});
  const [selectionId, setSelectionId] = useState(0);

  document.addEventListener("click", (event): void => {
    setClick({ x: -300, y: -300, display: "none" });
    click.display !== "none" && event.stopImmediatePropagation();
  });

  document.addEventListener("contextmenu", (event):void => {
    event.composedPath().forEach((child) => {
      if ((child as HTMLElement).className?.includes?.("item-id")) {
        event.preventDefault();
        setClick({ x: event.clientX, y: event.clientY, display: "flex" });
        setSelectionId(parseInt((child as HTMLElement).children[0].id ));
      }
    });

    click.display !== "none" && event.stopImmediatePropagation();
  });

  function clicked(option: boolean): void {
    setClick({ x: -300, y: -300, display: "none" });
    props.setEditOptions.setUpdateFutureOnes(option);
    props.setEditOptions.setId(selectionId);
  }

  return (
    <RightClickMenuContainer style={{ left: click.x , top: click.y, display: click.display }} id="menu-context">

      <MenuOption onClick={() => clicked(false)} >
        Edit this
      </MenuOption>

      <MenuOption onClick={() => clicked(true)} >
        Delete this
      </MenuOption>

      <MenuOption onClick={() => clicked(true)} >
        Edit repetitions
      </MenuOption>

      <MenuOption onClick={() => clicked(true)} >
        Delete repetitions
      </MenuOption>

    </RightClickMenuContainer>
  );
}

interface Props {
  setEditOptions: SetEditOptionsInterface,
}
