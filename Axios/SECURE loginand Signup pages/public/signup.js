//usernam , password1, password2 ,p_wrongusername

const username = document.getElementById("username")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const p_wrongusername = document.getElementById("p_wrongusername")
const signupButton = document.getElementById("signupButton")

signupButton.addEventListener('click', async(e)=>{
    e.preventDefault()
    if(password1.value != password2.value){
        p_wrongusername.innerText = "PLease enter the same password twice"
        p_wrongusername.style.color="red";
        password1.style.border="1px solid red";
        password2.style.border="1px solid red";
    }
    if(password1.value === password2.value){
        try {
            await axios.post('http://localhost:5500/api/v1/details/signup', {
            "name": username.value,
            "password": password1.value
        })
        p_wrongusername.innerText = "Signup successful,Please Login"
        p_wrongusername.style.color="green";
        password1.style.border="1px solid green";
        password2.style.border="1px solid green";
        }
         catch (error) {
            console.log(error)
        }
    }
    
})