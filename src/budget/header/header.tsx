import YearMonthPicker from "../yearMonthPicker/YearMonthPicker";
import { YearMonthInterface } from "../interfaces";
import { HeaderContainer, MainTitleContainer } from "./style";
import { useState } from "react";

export default function MainHeader(props: Props) {
  const [width, setWidth] = useState(window.screen.width >= 600 ? "270px" : "150px");

  window.addEventListener("resize", () => setWidth(window.screen.width >= 600 ? "270px" : "150px"));

  return (
    <HeaderContainer>
      <MainTitleContainer>
        Budget
      </MainTitleContainer>

      <YearMonthPicker
        yearMonth={props.yearMonth}
        setYearMonth={props.setYearMonth}
        height={"50px"}
        width={width}
        initialYear={2020}
        finalYear={2031}
      />

      <MainTitleContainer/>
    </HeaderContainer>
  );
}

interface Props {
  yearMonth: YearMonthInterface;
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}
