import { v4 as uuidv4 } from 'uuid'

let users = [
    {
        nome: 'luiz',
        email: 'whisk@gmail.com',
        senha: 'sss'
    }
]

const userModel = {
    getById: (id) => users.find(user => user.id === id),

    getByEmail: (email) => users.find(user => user.email === email),

    create: (nome, email, senha) => {
        const user = { id: uuidv4(), nome: nome, email: email, senha: senha }
        users.push(user)
        return user
    }

}

export { userModel }