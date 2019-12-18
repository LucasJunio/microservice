let extension = 'ts'

if (process.env.NODE_ENV === 'production') {
  extension = 'js'
}

const config = () => require(`./env/${process.env.NODE_ENV}.env.${extension}`)

export default config
