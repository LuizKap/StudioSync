import dayjs from '../utils/dayjs.js'

export function calculatePrice(horaInicio, horaFim, salaPreco){
    const fim = dayjs(horaFim, "HH:mm")
    const inicio = dayjs(horaInicio, "HH:mm")

   const duracao = fim.diff(inicio, 'minute') / 60

    return Number((salaPreco * duracao).toFixed(2))
}

