//usernam , password1, password2 ,p_wrongusername
const username = document.getElementById("username")
const email = document.getElementById('email')
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const p_wrongusername = document.getElementById("p_wrongusername")
const signupButton = document.getElementById("signupButton")
const otpbutton = document.getElementById("otp_generator")
const otp_input = document.getElementById("otp_input")
const message = document.getElementById('username-message');
let temp=0;


username.addEventListener('input',async(event)=>{
    const Username = event.target.value
    try {
        const response = await axios.post('http://localhost:5501/api/v1/details/checkUsername',{
            "username":Username
        })
        if(response.data.msg === 'exits'){
            username.classList.add('glow-border');
            username.style.border='2px solid red';
            username.style.boxShadow="0 0 5px red"
            message.textContent = 'Username already taken';
            message.style.color = 'red';
        }
        else{
            username.style.border='2px solid green';
            username.style.boxShadow="0 0 5px green"
            message.textContent = 'Username is available';
            message.style.color = 'green';
        }
    } catch (error) {
        console.log("check username error in frontend")
        console.log(error)
    }
})


email.addEventListener('input',async(event)=>{
    const Email = event.target.value

    try {
        const response = await axios.post('http://localhost:5501/api/v1/details/checkEmail',{
            "email":Email
        })
        if(response.data.msg === 'exits'){
            email.classList.add('glow-border');
            email.style.border='2px solid red';
            email.style.boxShadow="0 0 5px red"
            message.textContent = 'email Already exits';
            message.style.color = 'red';
        }
        else{
            message.textContent=""
        }
    } catch (error) {
        console.log("check email error in frontend")
        console.log(error)
    }
})



otpbutton.addEventListener('click',async (e)=>{
    e.preventDefault()
    try {
        const response= await axios.post('http://localhost:5501/api/v1/details/verify-otp', {
            "email": email.value
        });
        if (response.status === 200) {
                temp=response.data.dataa
                p_wrongusername.innerText = "OTP SEND";
                p_wrongusername.style.color = 'green';
            }
    } catch (error) {
        console.log("otpbutton errorrrrr in frontend")
        console.log(error);
        p_wrongusername.innerText = "Error sending OTP";
        p_wrongusername.style.color = "red";
    }
})

signupButton.addEventListener('click', async(e)=>{
    e.preventDefault()
    if(password1.value != password2.value ){
        p_wrongusername.innerText = "PLease enter the same password twice"
        p_wrongusername.style.color="red";
        password1.style.border="1px solid red";
        password2.style.border="1px solid red";
    }
    else if(!otp_input.value){
        p_wrongusername.innerText = "PLease enter the OTP"
        p_wrongusername.style.color="red";
        otpbutton.style.border="1px solid red";
    }
    else if(password1.value === password2.value ){
        try {
            const response = await axios.post('http://localhost:5501/api/v1/details/signup', {
            "username": username.value,
            "email":email.value,
            "password": password1.value,
            "otp": otp_input.value,
            "data":temp
        })
        if(response.data.msg==="User already exists"){
            p_wrongusername.innerText = response.data.msg
            p_wrongusername.style.color="red";
        }
        else{

            p_wrongusername.innerText = "Signup successful,Please Login"
            p_wrongusername.style.color="green";
            password1.style.border="1px solid green";
            password2.style.border="1px solid green";
        }
        }
         catch (error) {
            console.log(error)
        }
    } 
})

//   kickfacts0718@gmail.com

