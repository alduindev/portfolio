import { BrowserRouter } from "react-router-dom";
import Portfolio from "./components/Portfolio";

const baseUrl = import.meta.env.BASE_URL;
const routerBasename = baseUrl.startsWith('/') ? baseUrl.replace(/\/$/, '') : window.location.pathname.startsWith('/portfolio') ? '/portfolio' : '/';

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Portfolio />
    </BrowserRouter>
  );
}
