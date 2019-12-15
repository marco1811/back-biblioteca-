const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Libro = require('../models/libro');
const { verificaToken } = require('../middlewares/autenticacion');

app.get('/libro', [verificaToken], (req, res) => {
    Libro.find()
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            })
        });
});

app.post('/libro', [verificaToken], (req, res) => {
    let body = req.body;

    let libro = new Libro({

        nombreDeLibro: body.nombreDeLibro,
        editorial: body.editorial,
        autor: body.autor,
        precioDeRenta: body.precioDeRenta,
        categoria: body.categoria



    });

    libro.save((err, libroDB) => {
        if (err) {
            return res.status(400).json({
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
app.put('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombreDeLibro', 'editorial', 'autor', 'precioDeRenta', 'categoria', 'disponible', ]);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usrDB
            });
        }
    });
});

app.delete('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    // Usuario.deleteOne({ _id: id }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (resp.deletedCount === 0) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 id,
    //                 msg: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });

    // });
    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});


module.exports = app;