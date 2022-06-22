const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'tcvcivyxzbaqil',
        host: 'ec2-54-157-16-196.compute-1.amazonaws.com',
        database: 'd27tkorq20vmht',
        password: 'e9edfa92322217059a94143c2f0885e5cc3570d24d470d048aedd5718f0a7f0c',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex;