import Header from "../Header";
import ReactNotification from "react-notifications-component";

const MainLayout = ({ children }) => (
  <div>
    <ReactNotification />
    <Header />
    <div style={{ paddingLeft: "50px" }}>{children}</div>
  </div>
);

export default MainLayout;
