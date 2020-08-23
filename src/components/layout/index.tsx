import Header from "../Header";
import dynamic from "next/dynamic";
import ReactNotification from "react-notifications-component";

const Footer = dynamic(() => import("../Footer"));

const MainLayout = ({ children }) => (
  <div className="container">
    <ReactNotification />
    <Header />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
