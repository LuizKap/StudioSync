export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

/*pelo menos 6 caracteres
pelo menos 1 letra
pelo menos 1 número*/
export function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
    return regex.test(password)
}