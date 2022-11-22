import { useState } from "react";
import { RightClickMenuContainer, MenuOption } from "./style";

export default function RightClickMenu(props: {openProperties: (id: number) => void}) {
  const [click, setClick] = useState({x: -300, y: -300, display: "none"});
  const [selectionId, setSelectionId] = useState(0);

  document.addEventListener("contextmenu", (event):void => {
    event.preventDefault();
    event.composedPath().forEach((child) => {
      if ((child as HTMLElement).className?.includes("item-id")) {
        setClick({ x: event.clientX, y: event.clientY, display: "flex" });
        setSelectionId(parseInt((child as HTMLElement).children[0].id ));
      }
    });

    click.display !== "none" && event.stopImmediatePropagation();
  });

  return (
    <RightClickMenuContainer
      style={{ left: click.x , top: click.y, display: click.display }}
      id="menu-context"
      onMouseLeave={() => setClick({x: -300, y: -300, display: "none"})}
    >
      <MenuOption>Edit</MenuOption>
      <MenuOption>Delete</MenuOption>
      <MenuOption id="right-click-menu-properties" onClick={() => props.openProperties(selectionId)}>Properties</MenuOption>
    </RightClickMenuContainer>
  );
}
