const bcrypt = require('bcrypt');

const password = 'Marianny19'; 

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hash generado:', hash);
  }
});
