import { v4 as uuidv4 } from 'uuid'

let rooms = [
    {
        id: uuidv4(),
        nome: "Sala Harmonia",
        tipo: 'Orquestra',
        img: '/assets/images/harmonia.jpg',
        logo: '/assets/images/notaMusical.png' ,
        descricao: "Sala voltada para orquestras, ensembles e apresentações acústicas.",
        equipamentos: [
            "Piano de cauda",
            "Estantes para partituras",
            "Sistema acústico profissional",
            "Microfones condensadores"
        ],
        capacidade: 20,
        precoHora: 150
    },

    {
        id: uuidv4(),
        nome: "Sala Overdrive",
        tipo: 'Banda / Rock',
        img: '/assets/images/overdrive.jpg',
        logo: '/assets/images/guitarra.png',
        descricao: "Sala de ensaio para bandas de rock e metal com isolamento acústico.",
        equipamentos: [
            "Bateria acústica",
            "Amplificador Marshall",
            "Amplificador de baixo",
            "Mesa de som",
            "PA de retorno"
        ],
        capacidade: 6,
        precoHora: 80
    },

    {
        id: uuidv4(),
        nome: "Sala Echo",
        tipo: 'Gravação / Produção',
        img: '/assets/images/echo.jpg',
        logo: '/assets/images/microfone.png',
        descricao: "Sala focada em gravação vocal e produção musical.",
        equipamentos: [
            "Microfone condensador",
            "Interface de áudio",
            "Monitores de referência",
            "Computador para produção",
            "Controladora MIDI"
        ],
        capacidade: 3,
        precoHora: 100
    },

    {
        id: uuidv4(),
        nome: "Sala Nebula",
        tipo: 'Produção / Composição',
        img: '/assets/images/nebula.jpg',
        logo: '/assets/images/teclado.png',
        descricao: "Ambiente criativo para composição, synths e trilhas sonoras.",
        equipamentos: [
            "Teclado sintetizador",
            "Pads MIDI",
            "Iluminação ambiente",
            "Monitores de áudio"
        ],
        capacidade: 4,
        precoHora: 90
    },

    {
        id: uuidv4(),
        nome: "Sala Pulse",
        tipo: 'Ensaio / Estudos',
        img: '/assets/images/synth.jpg',
        logo: '/assets/images/ondas.png',
        descricao: "Sala compacta para ensaios rápidos e estudos individuais.",
        equipamentos: [
            "Amplificador combo",
            "Bateria eletrônica",
            "Mesa compacta",
            "Caixas de som"
        ],
        capacidade: 4,
        precoHora: 60
    }
]

const roomsModel = {

    getAll: () => rooms,

    getById: id => rooms.find(room => room.id === id)
}

export { roomsModel }