
const startTime = document.querySelector('#start-time')
const endTime = document.querySelector('#end-time')
const submit = document.querySelector('#submit')
const finalPrice = document.querySelector('.preco-final')
const date = document.querySelector('#date')
const price = Number(document.querySelector('.room-card').dataset.price)
const form = document.querySelector('form')


form.addEventListener('submit', (ev) => {
    const dataReserva = dayjs(`${date.value} ${startTime.value}`, 'YYYY-MM-DD HH:mm')

    if (dataReserva.isBefore(dayjs()) || startTime.value >= endTime.value) {
        ev.preventDefault()
        finalPrice.textContent = 'Data ou horário inválidos'
        return
    }
})

function calculatePrice(horaInicio, horaFim, salaPreco) {
    const fim = dayjs(horaFim, "HH:mm")
    const inicio = dayjs(horaInicio, "HH:mm")

    const duracao = fim.diff(inicio, 'hour', true)
    const total = salaPreco * duracao
    return total
}

function watchSelect() {
    if (startTime.value >= endTime.value) {
        finalPrice.textContent = 'Horário Inválido'
    }
    else {
        const total = calculatePrice(startTime.value, endTime.value, price)
        finalPrice.textContent = `Preço Final : R$ ${total}`
    }
}

//Filtra pela data e entrega os horarios disponiveis ao usuário
async function watchDate() {
    const roomId = document.querySelector('.room-card').dataset.roomId
    const response = await fetch(`/rooms/${roomId}/availability?date=${date.value}`)
    const horarios = await response.json()

    startTime.options.length = 0
    endTime.options.length = 0

    horarios.forEach((horario, index, array) => {
        let option = document.createElement('option')
        option.value = horario.hora
        option.disabled = !horario.disponivel
        option.textContent = horario.disponivel ? horario.hora : `${horario.hora} - Indisponivel`
        const option_2 = option.cloneNode(true)

        if (index !== array.length - 1) { startTime.add(option) }

        if (index !== 0) { endTime.add(option_2) }
    });
}

startTime.addEventListener('change', watchSelect)

endTime.addEventListener('change', watchSelect)

date.addEventListener('change', watchDate)





