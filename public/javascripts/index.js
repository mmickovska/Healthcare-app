  function deleteDoctor(id) {
  fetch(`http://localhost:3000/doctors/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.error) {
        location.reload();
      }
    })
    .catch((err) => {
      console.log("Doctor delete error: ", err);
    });
}

function deletePatient(id) {
  fetch(`http://localhost:3000/patients/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.error) {
        location.reload();
      }
    })
    .catch((err) => {
      console.log("Patient delete error: ", err);
    });
}

function deletePrescription(id) {
  fetch(`http://localhost:3000/prescriptions/${id}`, {
    method: "DELETE"
  })
  .then((res) => {
    if(!res.error) {
      location.reload();
    }
  })
  .catch((err) => {
    console.log("Prescription delete error: ", err)
  })
}

// For https://select2.org
$(document).ready(function () {
  $(".select-doctor").select2({
    placeholder: "Choose a doctor",
    allowClear: true,
  });
  $(".select-patient").select2({
    placeholder: "Choose a patient",
    allowClear: true
  })
});

// FOR CHART JS

window.onload = async function () {
  getAllPatients();
  getAllDoctors();
  getAgeRange();
};

// FUNCTIONS FOR CHARTS

// function charts
async function getAllPatients() {
  let struga = [];
  let skopje = [];
  let bitola = [];
  let ohrid = [];
  let ostanati = [];

  try {
    const res = await fetch("http://localhost:3000/allPatients");
    const patients = await res.json();
    const patientsArray = patients.patients;

    patientsArray.map((patient) => {
      if (patient.city === "Struga" || patient.city === "struga") {
        struga.push(patient.city);
      } else if (patient.city === "Bitola" || patient.city === "bitola") {
        bitola.push(patient.city);
      } else if (patient.city === "Ohrid" || patient.city === "ohrid") {
        ohrid.push(patient.city);
      } else if (patient.city === "Skopje" || patient.city === "Skopje") {
        skopje.push(patient.city);
      } else {
        ostanati.push(patient.city);
      }
    });
    charts(
      struga.length,
      skopje.length,
      bitola.length,
      ohrid.length,
      ostanati.length
    );
  } catch (err) {
    return console.log(err);
  }
}
//function pie chart
async function getAllDoctors() {
  const specializationArray = [];
  const neuro = [];
  const general = [];
  const internalMedicine = [];
  const pediatrics = [];
  const anesthesiology = [];
  const dermatology = [];
  const surgery = [];
  const urology = [];

  try {
    const response = await fetch("http://localhost:3000/allDoctors");
    const doctors = await response.json();
    const doctorsArray = doctors.doctors;
    // console.log(doctorsArray);
    // loop for labels
    doctorsArray.map((doctor) => {
      specializationArray.push(doctor.specialization);
    });
    // loop for data
    doctorsArray.map((doctor) => {
      if (doctor.specialization.toLowerCase() === "neuro") {
        neuro.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "general") {
        general.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "internal medicine") {
        internalMedicine.push(doctor.internalMedicine);
      } else if (doctor.specialization.toLowerCase() === "pediatrics") {
        pediatrics.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "anesthesiology") {
        anesthesiology.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "dermatology") {
        dermatology.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "surgery") {
        surgery.push(doctor.specialization);
      } else if (doctor.specialization.toLowerCase() === "urology") {
        urology.push(doctor.specialization);
      }
    });

    pieChart(
      [...new Set(specializationArray)],
      neuro.length,
      general.length,
      internalMedicine.length,
      pediatrics.length,
      anesthesiology.length,
      dermatology.length,
      surgery.length,
      urology.length
    );
  } catch (error) {
    return console.log(error);
  }
}
// function line chart
async function getAgeRange() {
  try {
    const baby = [];
    const youngAdults = [];
    const middleAgedAdults = [];
    const oldAdults = [];

    const res = await fetch("http://localhost:3000/allPatients");
    const patients = await res.json();
    const patientsArray = patients.patients;
    

    patientsArray.map(patient => {
      const age = patient.age;
      if(age >= 60){
       oldAdults.push(age)
      }else if(age >= 40 && age <= 59){
        middleAgedAdults.push(age)
      }else if(age >= 3 && age <= 39){
        youngAdults.push(age)
      }else{
        baby.push(age)
      }
    })
    lineChart(baby.length, youngAdults.length, middleAgedAdults.length, oldAdults.length) 

  } catch (err) {
    return console.log(err);
  }
}
//CHARTS
function charts(city1, city2, city3, city4, city5) {
  var ctx = document.getElementById("byCity").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Struga", "Skopje", "Bitola", "Ohrid", "Ostanati"],
      datasets: [
        {
          label: "Statistic of patients by City",
          data: [city1, city2, city3, city4, city5],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function pieChart(
  specialization,
  neuro,
  general,
  internalMedicine,
  pediatrics,
  anesthesiology,
  dermatology,
  surgery,
  urology
) {
  var canvas = document.getElementById("byDoctor");
  var ctx = canvas.getContext("2d");

  var data = {
    labels: specialization,
    datasets: [
      {
        fill: true,
        backgroundColor: [
          "#1e61a8",
          "#e35979",
          "#e359c7",
          "#bbf760",
          "#7974b3",
          "#e6c985",
        ],
        data: [
          neuro,
          general,
          internalMedicine,
          pediatrics,
          anesthesiology,
          dermatology,
          surgery,
          urology,
        ],
        borderWidth: [3, 3],
      },
    ],
  };

  var options = {
    title: {
      display: true,
      text: "",
      position: "top",
    },
    rotation: -0.7 * Math.PI,
  };

  var myBarChart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });
}
function lineChart(baby, youngAdults, middleAgedAdults, oldAdults) {
  var ctx = document.getElementById('byAge').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ["Baby", "Young Adults", "Middle-aged Adults", "Old Adults"],
            datasets: [{ 
                data: [baby,youngAdults,middleAgedAdults,oldAdults],
                label: "Total",
                borderColor: "#3e95cd",
                backgroundColor: "#7bb6dd",
                fill: true,
              }
            ]
          },
        });
}
