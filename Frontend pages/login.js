const p_wrongusername = document.getElementById("p_wrongusername")
const submit = document.getElementById("loginButton");
const url="http://localhost:5500/api/v1/details/login"
submit.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    try {
        const response = await axios.post('http://localhost:5500/api/v1/details/login', { name, password });
        console.log(response)
        if (response.status === 200) {
            if(response.data.msg==="Username_notfound"){
                p_wrongusername.innerText = "Invalid username";
                p_wrongusername.style.color = 'red';
            }
            else if(response.data.msg ==="Password_notfound"){
                p_wrongusername.innerText = "Incorrect Password";
                p_wrongusername.style.color = 'red';
            }
            else if(response.data.msg ==="LOGGED IN"){
                p_wrongusername.innerText = "WELCOME";
                p_wrongusername.style.color = 'green';
                window.location.href = 'newpage.html';
            }
    } else {

        p_wrongusername.innerText = "Invalid credentials";
        p_wrongusername.style.color = 'red';
    }
    } catch (error) {
        console.log('An error occurred:', error.message);
    }


});
