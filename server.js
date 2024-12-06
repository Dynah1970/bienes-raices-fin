const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-correo@gmail.com', // Reemplaza con tu correo de envío
    pass: 'Sema19ir' // Reemplaza con tu contraseña
  }
});

app.post('/enviar-correo', (req, res) => {
  const { nombre, email, telefono, mensaje, opciones, presupuesto, contacto, fecha, hora } = req.body;

  const mailOptions = {
    from: 'tu-correo@gmail.com', // Reemplaza con tu correo de envío
    to: 'juridico019recuperacion@gmail.com', // Correo de destino
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}\nOpción: ${opciones}\nPresupuesto: ${presupuesto}\nContacto: ${contacto}\nFecha: ${fecha}\nHora: ${hora}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error al enviar el correo');
    }
    res.status(200).send('Correo enviado');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
