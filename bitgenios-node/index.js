const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: 'mail.bitgenios.com',
  port: 465, // O 25
  secure: true, // Para SSL
  auth: {
    user: 'contacto@bitgenios.com',
    pass: 'c0nt4c70-bg%c0m.'
  }
});


// Ruta para enviar formulario de contacto
app.post('/send-email', async (req, res) => {
  console.log("Recibido formulario");
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'contacto@bitgenios.com', // Usa siempre el remitente autenticado
    to: 'contacto@bitgenios.com',
    subject: `Contacto desde la página web - ${name}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Información: ${message}
    `
  };

  const mailOptions2 = {
    from: 'contacto@bitgenios.com', // Usa siempre el remitente autenticado
    to: email,
    subject: 'Gracias por ponerte en contacto',
    text: `Hola ${name},\n\nGracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido correctamente. Nos pondremos en contacto contigo lo antes posible.\n\nSaludos,\nEl equipo de BITGENIOS`
  };

  try {
    // Enviar correo de agradecimiento
    await transporter.sendMail(mailOptions2);
    console.log('Correo de agradecimiento enviado');

    // Enviar correo principal
    await transporter.sendMail(mailOptions);
    console.log('Correo principal enviado');
    res.status(200).send('Email enviado');
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).send('Error enviando email');
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
