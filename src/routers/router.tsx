import { Routes, Route } from "react-router-dom";
import Budget from "../features/budget";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Budget/>}/>
    </Routes>
  );
}
