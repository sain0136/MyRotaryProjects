 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assets from '../../Models/Assets'

export default class AssetsController {
    /**
     * @param  {HttpContextContract} {response}
     */
    public async index({ response }: HttpContextContract) {
        const assets = await Assets.findOrFail(1)
        return response.json(assets)
      }
}
