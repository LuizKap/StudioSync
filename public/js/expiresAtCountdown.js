const countdowns = document.querySelectorAll('.countdown')

function updateCountdown() {
    countdowns.forEach(element => {
        const expiresAt = dayjs(element.dataset.expires)
        const now = dayjs()

        const minutes = expiresAt.diff(now, 'minute')
        const seconds = expiresAt.diff(now, 'second') % 60

        if (minutes < 0 || (minutes === 0 && seconds < 0)) {
            clearInterval(interval)
            location.reload()
            return
        }

        element.textContent =
            `Pagamento expira em ${minutes}:${String(seconds).padStart(2, '0')}`
    })
}

if (countdowns.length > 0) {
    updateCountdown()
    setInterval(updateCountdown, 1000)
}