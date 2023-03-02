import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {
        let message = error.message
        let status = error.status
        let code = error.code
        const errorObject = { message, status, code }
        ctx.response.status(401).send(JSON.stringify(errorObject))
      }
}
