const mongoose = require('mongoose');
const faker = require('faker');
const Doctor = require("../../models/doctor");
const Patient = require("../../models/patient")

mongoose.connect('mongodb://localhost/healthcareapp', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true 
});

const createPatients = (howManyPatientsToCreate) => {
  for(let i = 0; i < howManyPatientsToCreate; i++){
    const patient = new Patient({
        ssn: faker.datatype.uuid(), 
        full_name: faker.name.firstName() + faker.name.lastName(),
        age: faker.datatype.number(100),
        phone_number: faker.phone.phoneNumber(),
        city: faker.address.city()
    })
    patient.save()
};
}

const createDoctors = (howManyDoctorsToCreate) => {
  for(let i = 0; i < howManyDoctorsToCreate; i++){
    const doctor = new Doctor({
      full_name: faker.name.firstName() + faker.name.lastName(),
      licence_number: faker.datatype.uuid(), 
      city: faker.address.city(),
      specialization: faker.name.jobTitle()
    })
    doctor.save()
  }
}

createPatients(10);
createDoctors(8);