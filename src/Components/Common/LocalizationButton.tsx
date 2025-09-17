import { TLocalization } from "../../Reducers/appReducer"

export const LocalizationButton: React.FC<{
    localization: TLocalization
    onLocalizationValueChanged: () => void
}> = ({ localization, onLocalizationValueChanged }) => {

   

    return (
        <>
            <div className="localization-button-container">
                <button
                    className="localization-button"
                    onClick={onLocalizationValueChanged}
                    title={localization==='en'?'Change language':'Сменить язык'}
                >
                    {` ${localization==='en'?'🇬🇧':'🇷🇺'}`}
                </button>
            </div>
        </>
    )
}