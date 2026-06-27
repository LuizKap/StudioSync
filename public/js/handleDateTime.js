
const startTime = document.querySelector('#start-time')
const endTime = document.querySelector('#end-time')
const finalPrice = document.querySelector('.preco-final')
const date = document.querySelector('#date')
const price = Number(document.querySelector('.room-card').dataset.price)
const form = document.querySelector('.reservation-form')

function getTime(timeStr) {
    return dayjs(timeStr, "HH:mm")
}

function isValidRange(start, end) {
    return end.isAfter(start)
}

function validateMinAdvanceTime(dateTime) {
    const now = dayjs()
    const limit = now.add(30, 'minute')

    return dateTime.isBefore(limit)
}

form.addEventListener('submit', (ev) => {
    const inicio = dayjs(`${date.value} ${startTime.value}`, 'YYYY-MM-DD HH:mm')
    const fim = dayjs(`${date.value} ${endTime.value}`, 'YYYY-MM-DD HH:mm')

    const dataReserva = inicio

    if (dataReserva.isBefore(dayjs()) || !isValidRange(inicio, fim) || dataReserva.isBefore(dayjs().add(30, 'minute'))) {
        ev.preventDefault()
        finalPrice.textContent = 'Data ou horário inválidos'
        return
    }
})



function calculatePrice(horaInicio, horaFim, salaPreco) {
    const inicio = getTime(horaInicio)
    const fim = getTime(horaFim)

    if (!isValidRange(inicio, fim)) return 0

    const duracao = fim.diff(inicio, 'hour', true)
    return salaPreco * duracao
}



function watchSelect() {
    const inicio = getTime(startTime.value)
    const fim = getTime(endTime.value)

    if (!isValidRange(inicio, fim)) {
        finalPrice.textContent = 'Horário inválido'
        return
    }

    const total = calculatePrice(
        startTime.value,
        endTime.value,
        price
    )

    finalPrice.textContent = `Preço Final: R$ ${total.toFixed(2)}`
}



async function watchDate() {
    const roomId = document.querySelector('.room-card').dataset.roomId
    const response = await fetch(
        `/rooms/${roomId}/availability?date=${date.value}`
    )

    const horarios = await response.json()


    startTime.innerHTML = ''
    endTime.innerHTML = ''

    horarios.forEach((horario, index, array) => {


        if (index !== array.length - 1) {
            const optionStart = document.createElement('option')
            optionStart.value = horario.hora
            optionStart.textContent = horario.disponivel ? horario.hora : `${horario.hora} - Indisponível`

            optionStart.disabled = !horario.disponivel
            startTime.appendChild(optionStart)
        }


        if (index !== 0) {
            const optionEnd = document.createElement('option')
            optionEnd.value = horario.hora
            optionEnd.textContent = horario.disponivel ? horario.hora : `${horario.hora} - Indisponível`

            optionEnd.disabled = !horario.disponivel
            endTime.appendChild(optionEnd)
        }
    })
}



startTime.addEventListener('change', watchSelect)
endTime.addEventListener('change', watchSelect)
date.addEventListener('change', watchDate)