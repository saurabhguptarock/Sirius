import Header from "../Header";
import dynamic from "next/dynamic";
import ReactNotification from "react-notifications-component";

const Footer = dynamic(() => import("../Footer"));

const MainLayout = ({ children }) => (
  <div>
    <ReactNotification />
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  </div>
);

export default MainLayout;
