const express = require('express'); //freamwork
const fileUpload = require('express-fileupload'); //para subir archivos es un middleware
const uniqid = require('uniqid'); //genera un id hexatridecimal
const path = require('path'); //es el camino o ruta
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const libro = require('../models/libro');

app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha selccionado ningun archivo'
            }
        });
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg']
    if (!validExtensions.includes(archivo.mimetype)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Solo las extenciones <png, jpg, gif, jpeg> son validas'
            }
        })
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    });

    switch (ruta) {
        case 'libro':
            imagenlibro(id, res, nombre);
            break;
        case 'usuario':
            imagenUsuario(id, res, nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ruta no Valida'
                }
            })
            break;
    }

});

function imagenUsuario(id, res, nombreImagen) { //para acyualizar el campo de usuario

    Usuario.findById(id, (err, usr) => {
        if (err) {
            borrarArchivo(nombreImagen, `usuario`)
            return res.status(400).json({ //consulta que haya un error
                ok: false,
                err
            });
        }
        if (!usr) {
            borrarArchivo(nombreImagen, `usuario`)
            return res.status(400).json({ //si no hay resultados en la consulta
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }
        usr.img = nombreImagen;

        usr.save((err, usrDB) => {
            if (err) {
                borrarArchivo(nombreImagen, `usuario`)
                return res.status(400).json({ //consulta que haya un error
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                usrDB
            });
        });
    });
}

function imagenlibro(id, res, nombreImagen) { //para acyualizar el campo de usuario
    libro.findById(id, (err, prd) => {
        if (err) {
            borrarArchivo(nombreImagen, `libro`)
            return res.status(400).json({ //consulta que haya un error
                ok: false,
                err
            });
        }
        if (!prd) {
            borrarArchivo(nombreImagen, `libro`)
            return res.status(400).json({ //si no hay resultados en la consulta
                ok: false,
                err: {
                    message: 'libro no existe'
                }
            });
        }
        prd.img = nombreImagen;

        prd.save((err, libroDB) => {
            if (err) {
                borrarArchivo(nombreImagen, `libro`)
                return res.status(400).json({ //consulta que haya un error
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                libroDB
            });
        });
    });
}

function borrarArchivo(nombreImagen, ruta) {
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
    console.log('Imagen borrada con exito');
}

module.exports = app;