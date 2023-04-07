const { User } = require('../db.js')
const { compare } = require('../utils/bcrypt.js')

const getDbUsersByName = async (name) => {
    try {
        let find = await User.findOne({ where: { name } })
        return find
    } catch (error) {

        throw error
    }
}



const authUser = async (name, pass) => {
    try {
        let user = await getDbUsersByName(name)
        if (user) return compare(pass, user.password) ? user : null
        return null
    } catch (error) {

        throw error
    }
}

module.exports = { getDbUsersByName, authUser }