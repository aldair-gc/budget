import { useState } from "react";
import { RightClickMenuContainer, MenuOption } from "./style";

export default function RightClickMenu(props: {openProperties: (id: number) => void}) {
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

  return (
    <RightClickMenuContainer
      style={{ left: click.x , top: click.y, display: click.display }}
      id="menu-context"
    >
      <MenuOption id="right-click-menu-properties" onClick={() => {
        setClick({ x: -300, y: -300, display: "none" });
        props.openProperties(selectionId);
      }}
      >
          Properties
      </MenuOption>
    </RightClickMenuContainer>
  );
}
