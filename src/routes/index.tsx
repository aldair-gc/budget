import { Routes, Route } from "react-router-dom";
import Budget from "../pages/budget";
import Home from "../pages/home";
import Register from "../pages/register";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/budget" element={<Budget/>}/>
    </Routes>
  );
}
