const p_wrongusername = document.getElementById("p_wrongusername")
const submit = document.getElementById("loginButton");
const url = "http://localhost:5501/api/v1/details/login"


submit.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    try {
        const response = await axios.post('http://localhost:5501/api/v1/details/login', { name, password });
        // console.log(response)
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
                
                const userResponse  = await axios.post('http://localhost:5501/api/v1/details/getusername', {
                    "email":name
                });

                try {
                    
                    const newpage="./dashboard/dashboard.html"
    
                    let fullurl = `${newpage}?username=${encodeURIComponent(userResponse.data.getusername)}`;
                    window.location.href = fullurl;
                } catch (error) {
                    console.log(error)
                }

            }
    } else {

        p_wrongusername.innerText = "Invalid credentials";
        p_wrongusername.style.color = 'red';
    }
    } catch (error) {
        console.log('An error occurred:', error.message);
    }


});
