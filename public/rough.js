var bcrypt = require('bcryptjs');
var saltRounds = 10;
bcrypt.hash(password, saltRounds, function(err, hash) {
    
})