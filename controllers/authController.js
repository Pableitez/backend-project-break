const loginPage = require('../views/pages/login');

const showLogin = (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  const html = loginPage('');
  res.send(html);
};

const login = (req, res) => {
  const user = (process.env.ADMIN_USER || '').trim().replace(/\r/g, '');
  const password = (process.env.ADMIN_PASSWORD || '').replace(/\r/g, '');
  if (!user || !password) {
    const html = loginPage('Configura ADMIN_USER y ADMIN_PASSWORD en .env');
    return res.status(500).send(html);
  }
  const sentUser = (req.body.user || '').trim();
  const sentPassword = (req.body.password || '').replace(/\r/g, '');
  if (sentUser === user && sentPassword === password) {
    req.session.user = sentUser;
    return res.redirect('/dashboard');
  }
  const html = loginPage('Usuario o contraseña incorrectos');
  res.status(401).send(html);
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/products');
  });
};

module.exports = {
  showLogin,
  login,
  logout
};
