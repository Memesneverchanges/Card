import { PortfolioBoardItem } from "../Components/PortfolioBoard/PortfolioBoardItem"
import { PortfolioBoard, PortfolioBoardRef } from "../Components/PortfolioBoard/PortfolioBoard"
import { ISkillInfo, contacts, pageContent } from "../PageContent"
import { useEffect, useRef } from "react"
import Me from '..//styles/media/images/Me.png'
import email from '..//styles/media/icons/email.png'
import phone from '..//styles/media/icons/phone.png'
import file from '..//styles/media/icons/fileCircle.png'
import tg from '..//styles/media/icons/tg.png'
import vk from '..//styles/media/icons/vk.png'
import wa from '..//styles/media/icons/wa.png'
import resume from '..//Files/resume.pdf'
import gh from '..//styles/media/icons/gh.png'
import { SkillsCardList } from "../Components/SkillsCardList"
import { useLocation, useNavigate } from "react-router-dom"
import { AppState, TAppReducerAction } from "../Reducers/appReducer"
import { useDocumentTitle } from "../Hooks/useDocumentTitle"
import { LocalizationButton } from "../Components/Common/LocalizationButton"
import { ThemeSelector } from "../Components/Common/ThemeSelector"
import { ProgrammSkillItem } from "../Components/ProgrammSkillItem"
import { CardNavButtons } from "../Components/NavButton/CardNavButtons"


export const AppPage: React.FC<{
    state: AppState
    dispatch: React.Dispatch<TAppReducerAction>
}> = ({ state, dispatch }) => {

    const board = useRef<PortfolioBoardRef>(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!state.welcomePage.visibility) {
            if (location.pathname === "/") {
                navigate(pageContent.about.id)
            }
            else {
                board.current?.gotoBoard(location.pathname.slice(1))
            }
        }

    }, [location,navigate, state.welcomePage.visibility])

    useDocumentTitle(state.pageContent.localization)

    return (
        <>
            <LocalizationButton localization={state.pageContent.localization} onLocalizationValueChanged={() => dispatch({ type: 'switchLocalization' })} />
            <ThemeSelector themePreset={state.themePreset} onThemePresetSelected={(themePreset => dispatch({ type: 'changeThemePreset', payload: themePreset }))} />
            <PortfolioBoard
                ref={board}
                themePreset={state.themePreset}
                height={2400}
                width={4700}
            >
                <PortfolioBoardItem
                    id={pageContent.about.id}
                    className="about-card card"
                    style={{ top: 150, left: 650 }}>
                    <div className="about-card-entering">
                        <img src={Me} alt="Me" />
                        <div className="about-card-entering-block">
                            <div className="about-card-entering-text">
                                <h3>{state.pageContent.content.about.helloWord}</h3>
                                <p>{state.pageContent.content.about.pre}</p>
                            </div>
                            <div className="about-card-jobs">
                                <h3>{state.pageContent.content.about.articles[0].title}</h3>
                                <ul>
                                    {state.pageContent.content.about.articles[0].list.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-card-bottom-container">
                        <div className="about-card-education">
                            <h3>{state.pageContent.content.about.articles[1].title}</h3>
                            <ul>
                                {state.pageContent.content.about.articles[1].list.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                    <CardNavButtons buttons={state.pageContent.content.about.navButtons}/>
                </PortfolioBoardItem>
                <PortfolioBoardItem
                    id={pageContent.skills.id}
                    className="skills-card card"
                    style={{ left: 2100, top: 150 }}>
                    <div className="skills-card-container">
                        <div className="skills-card-title">
                            <h1>{state.pageContent.content.skills.title}</h1>
                        </div>
                        <div className="skills-card-content grid-2">
                            <SkillsCardList<ISkillInfo<string, string[]>> render={(item) => <ProgrammSkillItem localization={state.pageContent.localization} name={item.name} level={item.level} additionalInfo={item.additionalInfo} additionalInfoTitle={item.additionalInfoTitle} />} title={state.pageContent.content.skills.articles[0].title} list={state.pageContent.content.skills.articles[0].list as ISkillInfo<string, string[]>[]} />
                            <SkillsCardList<ISkillInfo<string, string[]>> render={(item) => <ProgrammSkillItem localization={state.pageContent.localization} name={item.name} level={item.level} additionalInfo={item.additionalInfo} additionalInfoTitle={item.additionalInfoTitle} />} title={state.pageContent.content.skills.articles[3].title} list={state.pageContent.content.skills.articles[3].list as ISkillInfo<string, string[]>[]} />
                            <SkillsCardList<ISkillInfo<string, string[]>> render={(item) => <ProgrammSkillItem localization={state.pageContent.localization} name={item.name} level={item.level} additionalInfo={item.additionalInfo} additionalInfoTitle={item.additionalInfoTitle} />} title={state.pageContent.content.skills.articles[1].title} list={state.pageContent.content.skills.articles[1].list as ISkillInfo<string, string[]>[]} />
                            <SkillsCardList<ISkillInfo<string, string[]>> render={(item) => <ProgrammSkillItem localization={state.pageContent.localization} name={item.name} level={item.level} additionalInfo={item.additionalInfo} additionalInfoTitle={item.additionalInfoTitle} />} title={state.pageContent.content.skills.articles[2].title} list={state.pageContent.content.skills.articles[2].list as ISkillInfo<string, string[]>[]} />
                            <SkillsCardList<any> className="grid-column-2" title={state.pageContent.content.skills.articles[4].title} list={state.pageContent.content.skills.articles[4].list} />
                        </div>
                    </div>
                    <CardNavButtons buttons={state.pageContent.content.skills.navButtons}/>
                </PortfolioBoardItem>
                <PortfolioBoardItem
                    id={pageContent.achievementsFirstPart.id}
                    className="skills-card card"
                    style={{ top: 150, left: 3500 }}>
                    <div className="skills-card-container">
                        <div className="skills-card-title">
                            <h1>{state.pageContent.content.achievementsFirstPart.title}</h1>
                        </div>
                        <div className="skills-card-content flex-column">
                            {state.pageContent.content.achievementsFirstPart.articles.map((article, index) => {
                                return (
                                    <div key={index} className={`skills-card-list`}>
                                        <h3>{article.title}</h3>
                                        <p>{article.list}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <CardNavButtons buttons={state.pageContent.content.achievementsFirstPart.navButtons}/>
                </PortfolioBoardItem>


                <PortfolioBoardItem
                    id={pageContent.achievementsSecondPart.id}
                    className="skills-card card"
                    style={{ top: 1400, left: 650 }}>
                    <div className="skills-card-container">
                        <div className="skills-card-title">
                            <h1>{state.pageContent.content.achievementsSecondPart.title}</h1>
                        </div>
                        <div className="skills-card-content flex-column">
                            {state.pageContent.content.achievementsSecondPart.articles.map((article, index) => {
                                return (
                                    <div key={index} className={`skills-card-list`}>
                                        <h3>{article.title}</h3>
                                        <p>{article.list}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <CardNavButtons buttons={state.pageContent.content.achievementsSecondPart.navButtons}/>
                </PortfolioBoardItem>

                <PortfolioBoardItem
                    id={pageContent.contacts.id}
                    className="contacts-card"
                    style={{ left: 2130, top: 1650 }}>
                    <h1>contacts</h1>

                    <div className="contact-group">
                        <a className="contact-item" title="email" href={`mailto:${contacts.email}`}><img src={email} alt="email" /> {contacts.email}</a>
                        <a className="contact-item" title="phone" href={`tel:${contacts.number}`}><img src={phone} alt="phone" /> {contacts.number}</a>
                    </div>

                    <div className="contact-link-group">
                        <a className="contact-link" title="GitHub" href={contacts.gitHub} target="_blank" rel="noreferrer"><img src={gh} alt="gh" /></a>
                        <a className="contact-link" title="WhatsApp" href={contacts.wa} target="_blank" rel="noreferrer"><img src={wa} alt="wa" /></a>
                        <a className="contact-link" title="Telegram" href={contacts.tg} target="_blank" rel="noreferrer"><img src={tg} alt="tg" /></a>
                        <a className="contact-link" title="VK" href={contacts.vk} target="_blank" rel="noreferrer"><img src={vk} alt="vk" /></a>
                        <a className="contact-link" title="Resume" href={resume} target="_blank" rel="noreferrer"><img src={file} alt="resume" /></a>
                    </div>
                </PortfolioBoardItem>
            </PortfolioBoard>
        </>
    )
}