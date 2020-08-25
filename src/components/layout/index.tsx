import Header from "../Header";
import ReactNotification from "react-notifications-component";

const MainLayout = ({ children }) => (
  <div>
    <ReactNotification />
    <div className="container">
      <Header />
    </div>
    <div style={{ paddingLeft: "50px" }}>{children}</div>
  </div>
);

export default MainLayout;
