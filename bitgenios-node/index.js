const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jlurquieta1@gmail.com', // tu correo electrónico
    pass: 'xufi ofky hnti nsrp' // la contraseña de aplicación generada
  }
});

// Ruta para enviar formulario de contacto
app.post('/send-email', (req, res) => {
  console.log("hola")
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'jlurquieta1@gmail.com',
    subject: `Contacto desde la página web - ${name}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Información: ${message}
    `
  };
  const mailOptions2 = {
    from: 'jlurquieta1@gmail.com',
    to: email,
    subject: 'Gracias por ponerte en contacto',
    text: `Hola ${name},\n\nGracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido correctamente. Nos pondremos en contacto contigo lo antes posible.\n\nSaludos,\nEl equipo de BITGENIOS`
  };

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      console.error('Error enviando correo de agradecimiento:', error);
    } else {
      console.log('Correo de agradecimiento enviado:', info.response);
    }
  });
  // Envío del correo principal
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error enviando email');

    } else {
      console.log('Email enviado:', info.response);
      // Envío del correo de agradecimiento

      res.status(200).send('Email enviado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});