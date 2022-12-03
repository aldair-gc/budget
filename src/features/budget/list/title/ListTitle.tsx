/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus, FaSort, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";
import { InputTitles, SortContainer, SortOption } from "./style";

export default function ListTitle(props: Props) {
  return(
    <InputTitles>
      <FaPlus onClick={props.toggleUserInput}/>
      <h2>{props.type}</h2>
      <div
        className="sorter-icon-container"
        onClick={() => props.changeShowSorter(props.type !== props.showSorter ? props.type : "none")}
      ><i id="income-sorter-icon"></i><FaSort/></div>
      <SortContainer
        style={{display: props.showSorter === props.type ? "flex" : "none"}}
        onMouseUpCapture={() => props.changeShowSorter("none")}
      >
        <SortOption onClick={() => props.changeSorter("none")}><FaSort/>Created at</SortOption>
        <SortOption onClick={() => props.changeSorter("description-A")}><FaSortAlphaDown/>Description</SortOption>
        <SortOption onClick={() => props.changeSorter("description-Z")}><FaSortAlphaDownAlt/>Description</SortOption>
        <SortOption onClick={() => props.changeSorter("value-1")}><FaSortNumericDown/>Value</SortOption>
        <SortOption onClick={() => props.changeSorter("value-9")}><FaSortNumericDownAlt/>Value</SortOption>
        <SortOption onClick={() => props.changeSorter("expiration_day-1")}><FaSortNumericDown/>Expiration day</SortOption>
        <SortOption onClick={() => props.changeSorter("expiration_day-9")}><FaSortNumericDownAlt/>Expiration day</SortOption>
      </SortContainer>
    </InputTitles>
  );
}

interface Props {
  type: "income" | "expenditure",
  showSorter: ShowType
  changeSorter: (sorter: SorterType) => void;
  changeShowSorter: (showSorter: ShowType) => void;
  toggleUserInput: () => void;
}

type ShowType = "none" | "income" | "expenditure";
type SorterType = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
