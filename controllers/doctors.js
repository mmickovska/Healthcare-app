const Doctor = require("../models/doctor");

module.exports = {
  // getAll: async (req, res) => {
  //   const doctors = await Doctor.find();

  //   res.render('doctors/index', { doctors: doctors });
  // },
  getAll: function (req, res) {
    if (req.query) {
      const regex = new RegExp(req.query.search, "gi");
      if (req.query.select === "city") {
        Doctor.find({ city: regex }, function (err, allDoctors) {
          if (err) {
            console.log(err);
          } else {
            res.render("doctors/index", { doctors: allDoctors });
          }
        });
      } else if (req.query.select === "doctorName") {
        Doctor.find(
          {full_name: regex},
          function (err, allDoctors) {
            if (err) {
              console.log(err);
            } else {
              res.render("doctors/index", { doctors: allDoctors });
            }
          }
        );
      } else if (req.query.select === "specialization") {
        Doctor.find(
          { specialization: regex },
          function (err, allDoctors) {
            if (err) {
              console.log(err);
            } else {
              res.render("doctors/index", { doctors: allDoctors });
            }
          }
        );
      } else {
        Doctor.find(
          { $or: [{ full_name: regex }, { city: regex }, { specialization: regex}] },
          function (err, allDoctors) {
            if (err) {
              console.log(err);
            } else {
              res.render("doctors/index", { doctors: allDoctors });
            }
          }
        );
      }
    } else {
      Doctor.find({}, function (err, allDoctors) {
        if (err) {
          console.log(err);
        } else {
          res.render("doctors/index", { doctors: allDoctors });
        }
      });
    }
  },
  getOne: async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    res.render("doctors/update", doctor);
  },
  create: (req, res) => {
    res.render("doctors/create");
  },
  postCreate: async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      await doctor.save();

      res.redirect("/doctors");
    } catch (error) {
      res.render("doctors/create", {
        ...req.body,
        error: error.message,
      });
    }
  },
  postUpdate: async (req, res) => {
    try {
      await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      res.redirect("/doctors");
    } catch (error) {
      res.render("doctors/update", {
        ...req.body,
        _id: req.params.id,
        error: error.message,
      });
    }
  },
  delete: async (req, res) => {
    // TODO: try catch
    await Doctor.findByIdAndRemove(req.params.id);

    res.send({
      error: false,
      message: `Doctor with id #${req.params.id} removed`,
    });
  },
};
