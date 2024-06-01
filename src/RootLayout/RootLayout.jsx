import { Outlet } from "react-router-dom";
import Nav from "../shared/Navbar/Nav";


export default function RootLayout() {
  return (
    <>
        <header className="">
            <Nav/>
        </header>

        <main>
            <Outlet/>
        </main>

    </>
  )
}
