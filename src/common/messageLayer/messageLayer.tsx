import { Box, Layer } from "./style";

export default function MessageLayer(props: { title: string }) {
  const close = () => {
    (document.querySelector("#message-layer") as HTMLDivElement).outerHTML = "";
  };
  return (
    <Layer id="message-layer">
      <Box>
        <h1>{props.title}</h1>
        <button onClick={close}>OK</button>
      </Box>
    </Layer>
  );
}
