var express = require("express");
var router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const doctorsController = require('../controllers/doctors');
const patientsController = require('../controllers/patients');
const prescriptionController = require('../controllers/prescription');


router
  .get("/", (req, res) => {
    res.render("index", { title: "Express" });
  })
  .get("/doctors", doctorsController.getAll)
  .get("/doctors/create", doctorsController.create)
  .get("/doctors/:id", doctorsController.getOne)
  .post("/doctors", doctorsController.postCreate)
  .post("/doctors/:id", doctorsController.postUpdate)
  .delete("/doctors/:id", doctorsController.delete)
  
  .get("/patients", patientsController.getAll)
  // .get("/patients", patientsController.getBySearch)
  .get("/patients/create", patientsController.create)
  .get("/patients/:id", patientsController.getOne)
  .post("/patients", patientsController.postCreate)
  .post("/patients/:id", patientsController.postUpdate)
  .delete("/patients/:id", patientsController.delete)
  .get('/doctors/:id/patients', patientsController.patients)

  .get("/allPatients", async (req, res) => {
    const patients = await Patient.find();
    res.send({patients:patients})
  })
  .get("/allDoctors", async(req, res) => {
    const doctors = await Doctor.find();
    res.send({doctors:doctors})
  } )
  .get("/doctor/:id/patients", async(req, res) => {
      const doctor = await Doctor.findById(req.params.id)
      const patient = await Patient.find()
      res.send("doctors/patients", {
        patients: patient,
        doctors: doctor,
      });
  })
  .get("/prescriptions", prescriptionController.getAll)
  .get("/prescriptions/create", prescriptionController.create)
  .get("/prescriptions/:id", prescriptionController.getOne)
  .post("/prescriptions", prescriptionController.postCreate)
  .post("/prescriptions/:id", prescriptionController.postUpdate)
  .delete("/prescriptions/:id", prescriptionController.delete)

  
module.exports = router;