const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from user'),
    single: id => db.load( `select * from user where ID = ${id}`),
    add: entity => db.add('user',entity),
    del: id =>  db.del('user',{ID: id}),
    singleByUsername: async username =>{
        const rows = await db.load(`select * from user where username = '${username}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];;
      }

}