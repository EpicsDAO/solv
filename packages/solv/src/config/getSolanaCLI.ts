const AGAVE_CLI = 'agave-validator'

const getSolanaCLI = () => {
  try {
    return AGAVE_CLI
  } catch (error) {
    console.error(error)
    return AGAVE_CLI
  }
}
export default getSolanaCLI
