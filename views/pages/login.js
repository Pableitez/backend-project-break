const layout = require('../layout');

function loginPage(errorMsg) {
  let errorHtml = '';
  if (errorMsg) {
    errorHtml = '<p class="flash flash-error">' + errorMsg + '</p>';
  }
  return layout('Login') +
    '<main class="login-page"><h1>Acceso al dashboard</h1>' + errorHtml +
    '<form action="/login" method="POST">' +
    '<label for="user">Usuario</label><input type="text" id="user" name="user" required autocomplete="username">' +
    '<label for="password">Contraseña</label><input type="password" id="password" name="password" required autocomplete="current-password">' +
    '<button type="submit">Entrar</button></form></main>' + layout.close();
}

module.exports = loginPage;
