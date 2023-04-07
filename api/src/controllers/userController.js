const { authUser, getDbUsersByName } = require('../handlers/getDbUser.js')
const { saveDbUser } = require('../handlers/saveDb.js')



const login = async (req, res) => {
    try {
        let { username, password } = req.body
        if (!username || !password) return res.status(400).send({ message: 'Complete all fields' })
        username = username.toLowerCase()
        let userData = await authUser(username, password)
        if (userData) return res.status(200).send(userData.name)
        else return res.status(400).send({ message: 'Invalid Credentials' })
    } catch (error) {
        res.status(404).send({ error })
    }
}


const register = async (req, res) => {
    try {
        let { username, password } = req.body

        if (!username || !password) return res.status(400).send({ message: 'Complete all fields' })
        username = username.toLowerCase()
        if (await getDbUsersByName(username)) return res.status(400).send({ message: 'User already registered' })
        else {
            let newUser = await saveDbUser({ name: username, password })
            return res.status(201).send(newUser.name)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}



module.exports = { login, register }

