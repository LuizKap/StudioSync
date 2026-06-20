import bcrypt from "bcryptjs"
import { userModel } from "../models/userModel.js"
import { createAuthToken } from "../utils/createAuth.js"


const authController = {
    register: (req, res) => {
        const { nome, email, senha } = req.body
        if (!nome || !email || !senha) return res.status(400).send('Dados em falta')
        const userExists = userModel.getByEmail(email)
        if (userExists) return res.status(400).send('Email já existente')

        const cryptSenha = bcrypt.hashSync(senha, 10)
        const user = userModel.create(nome, email, cryptSenha)

        const token = createAuthToken(user.id)
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        return res.redirect('/')
    },

    login: (req, res) => {
        const { email, senha } = req.body
        if (!email || !senha) return res.status(400).send('Dados em falta')

        const user = userModel.getByEmail(email)
        if (!user) return res.status(404).send('Esse email não existe no nosso banco de dados')

        const isPasswordValid = bcrypt.compareSync(senha, user.senha)
        /*if (!isPasswordValid) return res.status(401).send('Senha incorreta')*/

        const token = createAuthToken(user.id)
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        return res.redirect('/')
    }
}

export { authController }