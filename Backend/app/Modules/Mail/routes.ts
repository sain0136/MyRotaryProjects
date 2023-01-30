import Route from '@ioc:Adonis/Core/Route'

Route.resource('/mail/', 'MailController')

Route.post('mail/contactUs', 'MailController.contactUsFormMail')
