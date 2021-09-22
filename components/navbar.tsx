import style from "../styles/navbar.module.css"

function Navbar() {
    return (
        <nav className={style.nav}>
            <a href="./">
                <img src="/CollegeCo.png" width="50"></img>
            </a>

            <a href="./search">
                Categories
            
            </a>
            <a href="./search">Search</a>
            <a href="./search">Login</a>

        </nav>
    )
}

export default Navbar