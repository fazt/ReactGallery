import logo from "./logo.svg";
import { Route, Switch } from "react-router-dom";

import ImageGallery from "./pages/ImageGallery";
import ImageForm from "./pages/ImageForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>app</h1>

      <Switch>
        <Route path="/" component={ImageGallery} exact />
        <Route path="/upload" component={ImageForm} />
      </Switch>
    </div>
  );
}

export default App;
