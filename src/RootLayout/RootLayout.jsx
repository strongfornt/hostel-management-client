import { Outlet } from "react-router-dom";
import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";


export default function RootLayout() {
  return (
    <>
        <header className="">
            <Nav/>
        </header>

        <main>
            <Outlet/>
        </main>

        <footer>
            <Footer/>
        </footer>

    </>
  )
}
