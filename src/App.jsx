import { BrowserRouter } from "react-router-dom";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Portfolio />
    </BrowserRouter>
  );
}

export default App;