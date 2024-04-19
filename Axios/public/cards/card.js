document.addEventListener('DOMContentLoaded',async ()=>{
    const bidInput = document.getElementById("bid-amount");
    //left
    let right_img = document.getElementById("left-img");
    //middle
    let middle_product_name = document.getElementById("middle_product_name");
    const middle_product_description = document.getElementById("middle_product_description");
    //right
    const right_span_daysleft = document.getElementById("right-span-days");
    let right_auction_price = document.getElementById('right-auction-price');
    let right_bidding_price = document.getElementById('right-bidding-price');
    const right_bidding_updateprice = document.getElementById('right-bidding-update');
    let bidbutton = document.getElementById('bid')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlusername = urlParams.get('username');
    const url_product_id = urlParams.get('id')


   
    let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail', {
        params: {
            productid: url_product_id
        }
    });
    function showTime(){

        let deadlineDate = new Date(productdetail.data.data.bid_end_date);
        let currentDate = new Date();
        const timeDifference = deadlineDate.getTime() - currentDate.getTime();
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('MyClockDisplay').innerHTML = `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
        setTimeout(showTime, 1000);


        // if (timeDifference > 0) {
        // } else {
        //     document.getElementById('MyClockDisplay').innerHTML = 'Bid has ended';
        // }

        // var date = new Date();
        // var h = 12; // 0 - 23
        // var m = date.getMinutes(); // 0 - 59
        // var s = date.getSeconds(); // 0 - 59


        
        // if(h == 0){
        //     h = 12;
        // }
        
        // if(h > 12){
        //     h = h - 12;
        //     session = "PM";
        // }
        
        // h = (h < 10) ? "0" + h : h;
        // m = (m < 10) ? "0" + m : m;
        // s = (s < 10) ? "0" + s : s;
        
        // var time = h + ":" + m + ":" + s + " " ;
        // document.getElementById("MyClockDisplay").innerText = time;
        // document.getElementById("MyClockDisplay").textContent = time;

        
        //setTimeout(showTime, 1000);
        
    }
    
    showTime();

    document.getElementById('incrementbutton').addEventListener('click',()=>{
        const currentAmount = parseInt(bidInput.value);
        bidInput.value = currentAmount + 5; // Increase the bid amount by 5
    })
    document.getElementById('decrementbutton').addEventListener('click',()=>{
        let price = parseInt(bidInput.value)-5
        if( price<= parseInt(right_bidding_price.textContent)){
            document.getElementById('decrementbutton').disabled=true
        }
        else{
            const currentAmount = parseInt(bidInput.value);
            bidInput.value = currentAmount - 5; // Increase the bid amount by 5
        }
    })

    
    
    


    try {
        let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail' , {
          params: {
            productid: url_product_id
        }
        })

        

        // // Display the countdown
        // console.log(`The bid ends in ${daysRemaining} days, ${hoursRemaining} hours ${minutesRemaining} minutes`);








        right_img.src  = productdetail.data.data.url; 
        middle_product_name = productdetail.data.data.name
        right_auction_price.textContent   = productdetail.data.data.initial_price;
        right_bidding_price.textContent  = productdetail.data.data.normal_price;
        bidInput.value= productdetail.data.data.normal_price + 10
        let  points = document.getElementById('points')
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');
        const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
  
  
      //console.log("checking email", getcoins.data.data)
      points.textContent = getcoins.data.data
        if (productdetail.data.data.userID === urlusername) {
            bidbutton.disabled = true;
        } 
        else if(parseInt(points)<parseInt(bidInput.value)){
            bidbutton.disabled = true;
            const p1 = document.createElement('p')
            const p2 = document.createElement('p')
            p1.className='msg'
            p2.className='msg'
            p1.innerText="You dont have enough coins to place the Bid . "
            p2.innerText="Please Make 'Payment', to add Coins"
            document.getElementById('right-card').appendChild(p1).appendChild(p2)
        }
        else {
            bidbutton.disabled = false;
            bidbutton.addEventListener('click',async(e)=>{
                e.preventDefault()
                const currentAmount = parseInt(bidInput.value);
                try {
                    const response = await axios.post('http://localhost:5501/api/v3/adduserProducts',{urlusername, url_product_id,currentAmount})
                    if(response.data.data === 'notfound'){
                        console.log("product is added")
                    }
                    if(response.data.data === 'found'){
                        console.log('updated');
                    }
                    bidbutton.disabled = true;
            
                } catch (error) {
                    console.log("eroor in sending the data")
                    console.log(error)
                }
            })
            
        }

        document.getElementById("payment").addEventListener('click',()=>{
            const newpage = '../1_payment/demopaymen.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })

        

    } catch (error) {
        console.log(error)
    }  
})

