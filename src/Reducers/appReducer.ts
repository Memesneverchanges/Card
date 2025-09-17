import { IPageContent, ISkillInfo, localizePageContent, pageContent } from "../PageContent"

export type TThemePreset = 'portfolioboard-1' | 'portfolioboard-2'
export type TLocalization = 'ru' | 'en'

export type TAppReducerAction =
    { type: 'changeThemePreset', payload: TThemePreset } |
    { type: 'switchLocalization' } |
    { type: 'changeWelcomePageVisibility', payload: boolean }

export interface AppState {
    pageContent: {
        localization: TLocalization
        content: IPageContent<string,string[],ISkillInfo<string,string[]>[]>
    }
    themePreset: TThemePreset
    welcomePage: {
        visibility: boolean
        timeToHide: number
    }

}
const initialLocalization = localStorage.getItem('localization') as TLocalization ?? 'en'
export const appInitialState: AppState = {
    pageContent: {
        localization: initialLocalization,
        content: localizePageContent(pageContent,initialLocalization)
    },
    themePreset: 'portfolioboard-2',
    welcomePage: {
        timeToHide: 3000,
        visibility: true
    }
}

export function appReducer(state: AppState, action: TAppReducerAction): AppState {
    switch (action.type) {
        case 'switchLocalization': {
            let localization: TLocalization = state.pageContent.localization === 'en' ? 'ru' : 'en'
            localStorage.setItem('localization',localization)
            return {
                ...state,
                pageContent: {
                    localization: localization,
                    content: localizePageContent(pageContent,localization)
                }
            }
        }

        case 'changeThemePreset':
            return {
                ...state,
                themePreset: action.payload
            }
        case 'changeWelcomePageVisibility':
            return {
                ...state,
                welcomePage: {
                    ...state.welcomePage,
                    visibility: action.payload
                }
            }
        default:
            throw new Error(`${(action as TAppReducerAction).type} не ожидался в appReducer`)
    }
}

