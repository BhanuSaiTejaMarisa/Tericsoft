const { faker } = require('@faker-js/faker');
const myData = require('./server.json');
var database = { employees: []};

for (var i = 1; i<= 5; i++) {
  database.employees.push({
    id: i,
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    dob: faker.datatype.datetime(),
    gender: faker.name.gender()
  });
}
console.log(myData);
console.log(JSON.stringify(database));