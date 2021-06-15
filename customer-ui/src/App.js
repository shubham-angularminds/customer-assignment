import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
