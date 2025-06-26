const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back'); // Redireciona a pagina para a anterior
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado seu sucesso');
        req.session.save(function () {
            return res.redirect('back'); // Redireciona a pagina para a anterior
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};