/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus, FaSort, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { LanguageContext } from "../../../app/App";
import { InputTitles, SortContainer, SortOption } from "./style";

export default function ListTitle(props: Props) {
  return(
    <LanguageContext.Consumer>
      {({file}) => (
        <InputTitles>
          <FaPlus
            className="title-icons"
            style={{transform: props.userInput === 0 ? "rotateZ(45deg)" : ""}}
            onClick={props.toggleUserInput}
          />

          <h2>{props.type === "income" ? file.list.incomes : file.list.expenditures}</h2>

          <FaSort
            className="title-icons"
            onClick={() => props.changeShowSorter(props.type !== props.showSorter ? props.type : "none")}
          />

          <SortContainer
            style={{display: props.showSorter === props.type ? "flex" : "none"}}
            onMouseUpCapture={() => props.changeShowSorter("none")}
          >

            <SortOption>
              <FaSort onClick={() => props.changeSorter("none")}/>
              {file.list.createdAt}
              <FaSort onClick={() => props.changeSorter("none")}/>
            </SortOption>

            <SortOption>
              <FaSortAlphaDown onClick={() => props.changeSorter("description-A")}/>
              {file.transaction.description}
              <FaSortAlphaUp onClick={() => props.changeSorter("description-Z")}/>
            </SortOption>

            <SortOption>
              <FaSortNumericDown onClick={() => props.changeSorter("value-1")}/>
              {file.transaction.value}
              <FaSortNumericUp onClick={() => props.changeSorter("value-9")}/>
            </SortOption>

            <SortOption>
              <FaSortNumericDown onClick={() => props.changeSorter("expiration_day-1")}/>
              {file.transaction.expirationDay}
              <FaSortNumericUp onClick={() => props.changeSorter("expiration_day-9")}/>
            </SortOption>

          </SortContainer>
        </InputTitles>
      )}
    </LanguageContext.Consumer>
  );
}

interface Props {
  type: "income" | "expenditure",
  showSorter: ShowType
  userInput: number,
  changeSorter: (sorter: SorterType) => void;
  changeShowSorter: (showSorter: ShowType) => void;
  toggleUserInput: () => void;
}

type ShowType = "none" | "income" | "expenditure";
type SorterType = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
