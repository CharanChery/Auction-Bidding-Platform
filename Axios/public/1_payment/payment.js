document.addEventListener('DOMContentLoaded', function() {
    // Code to execute after the HTML document has been fully loaded
    let img = document.getElementById('qrcode');
    let upi_id = document.getElementById('upi_id')
    document.getElementById("paymentMethod").addEventListener("change", function() {
        if(this.value === 'Phonepe'){
            img.src = './QR-codes/PhonePe.png';
            upi_id.placeholder = 'Enter PhonePe transaction Id'
        }
        else if (this.value === 'Patym') {
            img.src = './QR-codes/Paytm.jpg';
            upi_id.placeholder = 'Enter Paytm transaction Id'
        }
        else if (this.value === 'Gpay') {
            img.src = './QR-codes/GPay.jpg';
            upi_id.placeholder = 'Enter Gpay transaction Id'
        }
    });

    document.getElementById('send_id').addEventListener('click',async(e)=>{
        //validateTransaction
        e.preventDefault()
        const tid = document.getElementById("upi_id").value;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');
        const textedit = document.querySelector('.textin');
        const h2 = document.createElement('h2')
        h2.innerText=""
        //console.log(urlusername , tid)
        try {
            console.log(urlusername , tid);
            const response = await axios.post('http://localhost:5501/api/v4/sendvalidateTransaction',{
                username: urlusername,
                Transaction_Id: tid
        })
                h2.innerText='Your transaction is added into Queue, This may take upto 10mins'
                textedit.appendChild(h2)
        } catch (error) {
                h2.innerText ='Your transaction is not added into Queue, please check'
                textedit.appendChild(h2)
            console.log("Error in the transaction action");
            console.log(error)
        }
    })
});

