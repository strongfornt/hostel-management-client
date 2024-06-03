import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Nav from "../shared/Navbar/Nav";
import Footer from "../shared/Footer/Footer";
import Spinner from "../shared/Spinner/Spinner";


export default function RootLayout() {
    const navigation = useNavigation()
  return (
    <div>
         <ScrollRestoration />
        <header className="">
            <Nav/>
        </header>

        <main>
        {
            navigation.state ==="loading" ? <Spinner/> : <Outlet/>
        }
        </main>

        <footer>
            <Footer/>
        </footer>

    </div>
  )
}
