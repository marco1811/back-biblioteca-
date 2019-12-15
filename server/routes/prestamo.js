const express = require('express');
const app = express();
const _ = require('underscore');
const Prestamo = require('../models/prestamo');
const { verificaToken } = require('../middlewares/autenticacion');
app.get('/prestamo', [verificaToken], (req, res) => {
    Prestamo.find()
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.post('/prestamo', [verificaToken], (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        Usuario: body.Usuario,
        Libro: body.Libro,
        FechaPrestamo: body.FechaPrestamo,
        FechaDevolucion: body.FechaDevolucion,
        prestado: body.prestado

    });

    prestamo.save((err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.put('/prestamo/:id', [verificaToken], (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['Usuario', 'Libro', 'FechaPrestamo', 'FechaDevolucion', 'prestado']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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

app.delete('/prestamo/:id', [verificaToken], (req, res) => {
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
    Prestamo.findByIdAndUpdate(id, { prestado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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