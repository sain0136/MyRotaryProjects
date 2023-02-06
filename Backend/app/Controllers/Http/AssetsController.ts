 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assets from 'App/Models/Assets'

export default class AssetsController {
    public async index({ response }: HttpContextContract) {
        const assets = await Assets.findOrFail(1)
        return response.json(assets)
      }
}
