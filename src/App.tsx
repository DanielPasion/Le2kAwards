import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AwardsIndex from "./pages/awards";
import StatsIndex from "./pages/stats";
import StatsGameIndex from "./pages/stats/game";
import StatsPlayerIndex from "./pages/stats/player";
import StatsPlayerID from "./pages/stats/player/id";
import ComparisonIndex from "./pages/comparison";
import MeetDeveloper from "./pages/developer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="awards">
        <Route index element={<AwardsIndex />} />
      </Route>

      <Route path="stats">
        <Route index element={<StatsIndex />} />
        <Route path="player">
          <Route index element={<StatsPlayerIndex />} />
          <Route path=":id" element={<StatsPlayerID />} />
        </Route>
        <Route path="game">
          <Route index element={<StatsGameIndex />} />
        </Route>
      </Route>
      <Route path="comparison">
        <Route index element={<ComparisonIndex />} />
      </Route>
      <Route path="developer" element={<MeetDeveloper />} />
    </Routes>
  );
}
