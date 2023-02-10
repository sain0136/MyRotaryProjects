import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import CustomReponse from 'Contracts/util/backend/classes/CustomReponse'

export default class MailController {
    /**
     * @desc Sends an email with sender's details (name, email and message body) 
     * from a contact form to a recipient's email address. Returns a JSON 
     * response indicating the status of the email delivery.
     * @param  {} {request
     * @param  {HttpContextContract} response}
     */
    public async contactUsFormMail({ request, response }: HttpContextContract) {
        const senderEmail: string = request.input('sender_email')
        const senderName: string = request.input('sender_name')
        const body: string = request.input('body')
        try {
          await Mail.send((message) => {
            message
              .from('jssr26@gmail.com')
              .to('jssr26@gmail.com')
              .replyTo(senderEmail)
              .subject('Rotary Enquiry from Guest: ' + senderName)
              .html(
                'Click link to reply or just click reply to reply to the actual sender: \n' +
                  senderEmail +
                  '. ' +
                  body
              )
          })
          return response.json(true)
        } catch (error) {
          return response.json(new CustomReponse('your email failed'))
        }
      }
}
