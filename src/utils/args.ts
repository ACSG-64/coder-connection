import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Access parameters passed from the command line
 */
export default yargs(hideBin(process.argv)).argv
