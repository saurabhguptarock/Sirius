import Header from "../Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../Footer"));

const MainLayout = ({ children }) => (
  <div className="container">
    <Header />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
