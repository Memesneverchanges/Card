export function getPortfolioboardElement(element?: HTMLElement): HTMLElement | null {
    if (element) {
        if (element.className && typeof element.className ==='string') {
            if (element.className.includes('portfolioboard-object')) {
                return element
            }
        }
        if (element.parentElement) {
            return getPortfolioboardElement(element.parentElement)
        }
    }
    return null
}