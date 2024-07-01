import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <br></br>
      {children}
      <br></br>
      <Footer />
    </>
  );
}
