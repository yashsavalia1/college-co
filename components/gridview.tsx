import style from "../styles/gridview.module.css"


export default function GridView({children}: any) {
    return (
        <div className={style.grid}>
            {children}
        </div>
    )
}