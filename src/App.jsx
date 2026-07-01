import { BrowserRouter } from "react-router-dom";
import Portfolio from "./components/Portfolio";

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
        <Portfolio />
    </BrowserRouter>
  );
}
