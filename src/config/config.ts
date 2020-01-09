let extension = 'ts'

if (process.env.NODE_ENV === 'production') {
  extension = 'js'
}

module.exports = () => require(`./env/${process.env.NODE_ENV}.env.${extension}`)
