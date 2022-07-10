import TruncatedCard from "../../shapes/truncated-data"
import { DisplayListing } from "../../types/DisplayListing"
import style from "./itemcard.module.css"


export default function ItemCard({ cardData }: { cardData: DisplayListing }) {

    const address = cardData.address!;
    const addressAsStr = `${address.address} , ${address.city} ${address.stateOrProvince} ${address.zipOrPostalCode} ${address.country}`
    return (
        <div className={style.card} id={cardData.id}>
            <img src={cardData.pictureLink} />
            <div>{cardData.title}</div>
            <div>{cardData.price}</div>
            {cardData.address &&
                <div>{addressAsStr}</div>
            }

        </div>
    )
}