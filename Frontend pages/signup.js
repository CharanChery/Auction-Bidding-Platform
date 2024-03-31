//usernam , password1, password2 ,p_wrongusername

const username = document.getElementById("username");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const p_wrongusername = document.getElementById("p_wrongusername");
const signupButton = document.getElementById("signupButton");
const otpbutton = document.getElementById("otp_generator");
const otp_input = document.getElementById("otp_input");
let temp = 0;

otpbutton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:5500/api/v1/details/verify-otp",
      {
        name: username.value,
      }
    );
    if (response.status === 200) {
      temp = response.data.dataa;
      p_wrongusername.innerText = "OTP SEND";
      p_wrongusername.style.color = "green";
    }
  } catch (error) {
    console.log("errorrrrr");
    console.log(error);
    p_wrongusername.innerText = "Error sending OTP";
    p_wrongusername.style.color = "red";
  }
});

signupButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (password1.value != password2.value) {
    p_wrongusername.innerText = "PLease enter the same password twice";
    p_wrongusername.style.color = "red";
    password1.style.border = "1px solid red";
    password2.style.border = "1px solid red";
  } else if (!otp_input.value) {
    p_wrongusername.innerText = "PLease enter the OTP";
    p_wrongusername.style.color = "red";
    otpbutton.style.border = "1px solid red";
  } else if (password1.value === password2.value) {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/details/signup",
        {
          name: username.value,
          password: password1.value,
          otp: otp_input.value,
          data: temp,
        }
      );
      if (response.data.msg === "User already exists") {
        p_wrongusername.innerText = response.data.msg;
        p_wrongusername.style.color = "red";
      } else {
        p_wrongusername.innerText = "Signup successful,Please Login";
        p_wrongusername.style.color = "green";
        password1.style.border = "1px solid green";
        password2.style.border = "1px solid green";
      }
    } catch (error) {
      console.log(error);
    }
  }
});

//   kickfacts0718@gmail.com
