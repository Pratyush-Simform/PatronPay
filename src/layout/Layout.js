import React from "react";
import Header from "../components/sidebar/Header";
import Footer from "../components/sidebar/Footer";

function Layout({children}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
