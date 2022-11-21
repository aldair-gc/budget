import { useState } from "react";
import { RightClickMenuContainer, MenuOption } from "./style";

export default function RightClickMenu(props: {openProperties: (id: number) => void}) {
  const [click, setClick] = useState({x: -300, y: -300, display: "none"});

  document.addEventListener("contextmenu", (event):void => {
    event.preventDefault();
    (event as any).path.map((child: HTMLDivElement) => {
      if (child.className?.includes("item-id")) {
        setClick({ x: event.clientX, y: event.clientY, display: "flex" });
        (document.querySelector("#right-click-menu-properties") as HTMLDivElement).onclick = () => {
          props.openProperties(parseInt(child.firstChild.id));
        };
      }
    });
    (document.querySelector("#menu-context") as HTMLDivElement).addEventListener("mouseleave", () => {
      setClick({x: -300, y: -300, display: "none"});
    });
  });

  return (
    <RightClickMenuContainer style={{ left: click.x , top: click.y, display: click.display }} id="menu-context">
      <MenuOption>Edit</MenuOption>
      <MenuOption>Delete</MenuOption>
      <MenuOption id="right-click-menu-properties">Properties</MenuOption>
    </RightClickMenuContainer>
  );
}
