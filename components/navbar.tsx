import style from "../styles/navbar.module.css"

function Navbar() {
    return (
        <nav className={style.nav}>
            <a href="./">
                <img src="/CollegeCo.png" width="50"></img>
            </a>

            <a href="./search">Furniture</a>
            <a href="./search">Textbooks/Classroom</a>
            <a href="./search">Electronics</a>
            <a href="./search">Apparell</a>
            <a href="./search">Sports</a>
            <a href="./search">Search</a>
            <a href="./search">Cart</a>
            <a href="./search">Login</a>


        </nav>
    )
}

export default Navbar