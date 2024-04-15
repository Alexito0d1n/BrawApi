from telegram.ext import Updater, CommandHandler

# Token de tu bot de Telegram
TOKEN = '6707517310:AAEUBgnRGICrPFbwjRIRmQWdHccIHdFGHME'

# Manejador del comando /hola
def hola(update, context):
    # Responder al usuario con "holi"
    update.message.reply_text('holi')

# Crear el updater y el dispatcher
updater = Updater(token=TOKEN, use_context=True)
dispatcher = updater.dispatcher

# Agregar el manejador del comando /hola
dispatcher.add_handler(CommandHandler('hola', hola))

# Iniciar el bot
updater.start_polling()
updater.idle()
