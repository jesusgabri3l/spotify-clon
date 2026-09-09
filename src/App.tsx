import { ReactElement } from "react";
import IndexRouter from "./components/router/Index";
// All styles are in assets/styles

function App(): ReactElement {
  return (
    <div className="main_wrapper">
      <IndexRouter />
    </div>
  );
}

export default App;
