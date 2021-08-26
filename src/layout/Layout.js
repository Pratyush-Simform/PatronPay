import React from "react";
import Header from "../components/sidebar/Header";
import Footer from "../components/sidebar/Footer";

function Layout({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
