import { TThemePreset } from "../../Reducers/appReducer"

export const ThemeSelector: React.FC<{
    themePreset: TThemePreset
    onThemePresetSelected: (themePreset: TThemePreset) => void
}> = ({ themePreset, onThemePresetSelected }) => {
    return (
        <>
            <div className="theme-selector-container" style={{ display: 'none' }}>
                <button className={`portfolioboard-2 theme-selector-button ${themePreset === 'portfolioboard-2' ? 'theme-selected' : ''}`} onClick={() => {
                    onThemePresetSelected('portfolioboard-2')
                }}><div className="theme-selector-content" /></button>
                <button className={`portfolioboard-1 theme-selector-button ${themePreset === 'portfolioboard-1' ? 'theme-selected' : ''}`} onClick={() => {
                    onThemePresetSelected('portfolioboard-1')
                }}><div className="theme-selector-content" /></button>
            </div>
        </>
    )
}