import styles from "./searchbar.module.css"

const SearchBar = () => {
    return (
        <div className={styles.searchDiv}>
            <input className={styles.searchbar} type="text" placeholder="Search"></input>
        </div>
    )
}

export default SearchBar