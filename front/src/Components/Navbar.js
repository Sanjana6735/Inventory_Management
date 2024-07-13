import { Link } from "react-router-dom";

import '../styles/Navbar.css';
const Navbar = ()=>
{
    return (
        <header>
            <div className="container">
                <Link to="/">
                <h1>Inventory</h1>
                </Link>
            </div>
        </header>
    )
}
export default Navbar;
