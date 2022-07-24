import Cors from 'cors'

// Initializing the cors middleware
// https://github.com/expressjs/cors#configuration-options
export const cors = Cors({ methods: ['POST', 'GET', 'HEAD'] })
