import React from "react";
import Header from "./header";
import { MainPage, ContentPage } from "../../assets/styles/frontGlobalStyle";
import Footer from "./footer";

export default function Base({ className, children }) {
  return (
    <MainPage className={className}>
      <Header />
      <ContentPage>{children}</ContentPage>
      <Footer />
    </MainPage>
  );
}
