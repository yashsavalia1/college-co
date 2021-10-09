import TruncatedCard from "../shapes/truncated-data"
import style from "../styles/itemcard.module.css"


export default function ItemCard( cardData: any) {
    console.log(cardData.cardData.item_id);
    
    return (
        <div className={style.card} id={cardData.cardData.item_id}>
            <img src={cardData.cardData.picture_link}/>
            <div>{cardData.cardData.title}</div>
            <div>{cardData.cardData.cost}</div>
            <div>{cardData.cardData.address}</div>
        </div>
    )
}