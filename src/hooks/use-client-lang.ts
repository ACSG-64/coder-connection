export function getClientLang() {
    return localStorage.getItem('lang') ?? 'en'
}
