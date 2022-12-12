/* eslint-disable react/no-unescaped-entities */
import { FaRegTimesCircle } from "react-icons/fa";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { HelpContainer } from "./style";

export default function Settings(props: { close: () => void; }){
  return (
    <LayerContainer>
      <WindowContainer>
        <WindowHeaderContainer>
          <button onClick={() => props.close()}>
            <FaRegTimesCircle/>
          </button>
          <h1>Help</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer width={"350px"} height={"400px"}>
          <HelpContainer>
            <h1>This app was made to be simple and to make it very easy to have control over financial resources.</h1>
            <li>
              <h2>Add, remove or edit transactions</h2>
              <p>
                Click on the plus icon on the left top corner of the list to add a new transaction.
                For deleting or editing a transaction, click on the arrow on the left side of the item on the list
                and then select DELETE and confirm the action.
              </p>
              <p>
                By clicking on the arrow on the left of the item, some options are shown and it is also possible to edit
                or copy a transaction.
              </p>
              <p>
                A transaction with future repetitions will show two options when editing or deleting it:
                ONLY THIS and THIS AND FUTURE. These options will be applied when the action is confirmed.
                When a transaction with future repetitions is edited with the ONLY THIS option, it will no longer be
                considered to have repetitions while the others will remain intact.
              </p>
            </li>
            <li>
              <h2>Transactions colors</h2>
              <p>These hightlight colors are there to ask for attention.</p>
              <p>
                YELLOW: when a transaction's expiration day is 3, 4 or 5 days ahead of the present date.
                RED: when the transaction is already expired or will expire in 1 or 2 days.
              </p>
            </li>
          </HelpContainer>
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}
