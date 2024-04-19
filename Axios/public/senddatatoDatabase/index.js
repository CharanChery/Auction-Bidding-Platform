const pname = document.getElementById('Pname')
const pprice = document.getElementById('Pprice')
const pdescription = document.getElementById('Pdescription')
const pcategory = document.getElementById('Pcategory')
const purl = document.getElementById('Purl')
const sendbutton = document.getElementById('Sendbutton')
const textConformation = document.getElementById('conformation')
const form =document.getElementById('product_form')
const ptime = document.getElementById('Ptime')

sendbutton.addEventListener('click',async(e)=>{
    e.preventDefault()
    
    if (!pname.value || !pprice.value || !pdescription.value || !pcategory.value || !purl.value || !ptime.value) {
        textConformation.innerText = 'Please fill in all required fields.';
        textConformation.style.color = 'red';
        textConformation.style.cursor='default'
    }
    else{
        
        try {
            const currentDate = new Date();

            // Add 2 days to the current date
            //console.log(currentDate.toLocaleString());

            const futureDate = new Date(currentDate);
            futureDate.setDate(currentDate.getDate() + parseInt(ptime.value) );

            // Set the time to 12:00 PM for the future date
            futureDate.setHours(12, 0, 0, 0);
            const response = await axios.post('http://localhost:5501/api/v2/addProducts',{
                "name":pname.value,
                "description": pdescription.value,
                "initial_price":pprice.value,
                "category":pcategory.value,
                "url" : purl.value,
                "bid_end_date":futureDate
            })
            setTimeout(()=>{
                    textConformation.innerText="Data is added tp database";
                    textConformation.style.color='Green';
                    textConformation.style.cursor='default'
                },2000)
                textConformation.style.color='white';
                textConformation.style.cursor='default'
        } catch (error) {
            setTimeout(()=>{
                textConformation.innerText="Error in entering into database";
                textConformation.style.color='red';
                textConformation.style.cursor='default'
            },2000)
            console.log(error)
            textConformation.style.color='white';
            textConformation.style.cursor='default'
        }
    }

    form.reset()
})

