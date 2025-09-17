import { INavButton } from "../../PageContent"
import { NavButton } from "./NavButton"

export const CardNavButtons: React.FC<{
    buttons: INavButton<string>[]
}> = ({ buttons }) => {
    return (
        <>
            <div className={`card-navigation ${buttons.length>1?'card-navigation-buttons':'card-navigation-button'}`}>
                {buttons.map((b,i) => <NavButton key={i} to={b.navToCard}  title={b.hint}>{b.title}</NavButton>)}
            </div>
        </>
    )
}