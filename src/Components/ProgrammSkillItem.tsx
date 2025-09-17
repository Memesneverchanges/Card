import { TLocalization } from "../Reducers/appReducer"

export const ProgrammSkillItem: React.FC<{
    localization:TLocalization
    name: string
    level?: number
    additionalInfoTitle?:string
    additionalInfo?: string[]

}> = ({ additionalInfo,additionalInfoTitle, level, name ,localization}) => {

    return (

        <>
            <div className="programm-skill">
                <div className="programm-skill-name">
                    {name}
                </div>
                <div className="programm-skill-info-container">
                    <div className={`programm-skill-info`}>
                        {level ? <div className="programm-skill-progress-part">
                            <h3>{localization === 'en' ? 'Skill' : 'Уровень'}:</h3>
                            <div className="programm-skill-progress-bar" style={{ '--skill-level': level } as React.CSSProperties} />
                        </div> : <></>}

                        <div className="programm-skill-additional">
                            {additionalInfoTitle ? <h3>{additionalInfoTitle}:</h3> : ''}
                            <ul>
                                {additionalInfo?.map((framework, index) => <li key={index}>{framework}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}