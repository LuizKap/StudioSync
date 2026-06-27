const email = document.querySelector('#email')
const senha = document.querySelector('#senha')
const confirmar = document.querySelector('#confirmar_senha')
const form = document.querySelector('form')

const emailError = document.querySelector('#email-error')
const senhaError = document.querySelector('#senha-error')
const confirmarError = document.querySelector('#confirmar-error')

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPassword(value) {
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)
}

function validateEmail() {
    if (email.value === '') {
        email.classList.remove('valid', 'invalid')
        emailError.textContent = ''
        return false
    }

    if (isValidEmail(email.value)) {
        email.classList.add('valid')
        email.classList.remove('invalid')
        emailError.textContent = ''
        return true
    } else {
        email.classList.add('invalid')
        email.classList.remove('valid')
        emailError.textContent = 'Email inválido'
        return false
    }
}

function validatePassword() {
    if (senha.value === '') {
        senha.classList.remove('valid', 'invalid')
        senhaError.textContent = ''
        return false
    }

    if (isValidPassword(senha.value)) {
        senha.classList.add('valid')
        senha.classList.remove('invalid')
        senhaError.textContent = ''
        return true
    } else {
        senha.classList.add('invalid')
        senhaError.textContent =
            'Senha precisa ter 6+ caracteres e pelo menos 1 número'
        return false
    }
}

function validateConfirm() {
    if (confirmar.value === '') {
        confirmar.classList.remove('valid', 'invalid')
        confirmarError.textContent = ''
        return false
    }

    if (confirmar.value === senha.value) {
        confirmar.classList.add('valid')
        confirmar.classList.remove('invalid')
        confirmarError.textContent = ''
        return true
    } else {
        confirmar.classList.add('invalid')
        confirmar.classList.remove('valid')
        confirmarError.textContent = 'Senhas não coincidem'
        return false
    }
}

email.addEventListener('input', validateEmail)
senha.addEventListener('input', () => {
    validatePassword()
    validateConfirm()
})
confirmar.addEventListener('input', validateConfirm)

form.addEventListener('submit', (e) => {
    const ok =
        validateEmail() &
        validatePassword() &
        validateConfirm()

    if (!ok) {
        e.preventDefault()
    }
})