// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AwardsIndex from "./pages/awards";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="awards">
          <Route index element={<AwardsIndex />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
