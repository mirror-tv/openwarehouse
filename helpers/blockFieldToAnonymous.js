const blockFieldToAnonymous = (args) => {
    const { gateFieldName, fieldPassValue } = args

    return ({ authentication: { item } }) => {
        // if request is from keystone itself,
        // item will have logged-in user data
        // otherwise not only nuxt, but just normal post request will have undefined
        const role = item ? item.role : 'anonymous'

        if (role === 'anonymous') {
            const accessControl = {}
            const key = `${gateFieldName}_in`
            accessControl[key] = fieldPassValue

            return accessControl
        } else {
            return {}
        }
    }
}

module.exports = { blockFieldToAnonymous }
