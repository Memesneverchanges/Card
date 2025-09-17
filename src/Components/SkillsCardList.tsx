import { ReactNode } from "react"

export function SkillsCardList<T>({ list, title, listStyle, className, listItemClassName, render }: {
    list: T[]
    title: string
    listStyle?: React.CSSProperties
    className?: string
    listItemClassName?: string
    render?: (item: T) => ReactNode
}) {
    return (
        <>
            <div className={`skills-card-list ${className ? className : ''}`}>
                <h3>{title}</h3>
                <ul style={listStyle}>
                    {list.map((item, index) => <li key={index} className={listItemClassName}>
                        {render !== undefined ? render(item) : typeof item == 'string' ? item : ''}
                    </li>)}
                </ul>
            </div>
        </>
    )
}