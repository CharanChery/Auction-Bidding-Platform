document.addEventListener("DOMContentLoaded", async ()=>{
  const productContainer = document.getElementById('product-container')
  const rightproducts = document.getElementById('rightproducts')
  
  // Array of product data (name, image URL, new price, old price)
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlusername = urlParams.get('username');

    const leftproducts = await axios.get('http://localhost:5501/api/v2/dashboard');
    //console.log("leftproducts , ",leftproducts)
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlusername = urlParams.get('username');
      const notifNum = document.getElementById("notif-num")
      const notification = await axios.post('http://localhost:5501/api/v3/notificationProducts',{
        urlusername:urlusername
      })

      //console.log("count",notification.data.datacount)
      if (notification.data.msg === 'yes') {
        notifNum.textContent = notification.data.datacount;
      } else {
        notifNum.textContent = 0;
      }
      
    } catch (error) {
      console.log("error in notification....")
      console.log(error)
    }




    const products = leftproducts.data.data
    //console.log(products)
    products.forEach(function(product) {
      //console.log(product.status)
      if (product.status === true) {
        //console.log(product)
      } else {
        //console.log(product.bid_end_date)
        let deadlineDate = new Date(product.bid_end_date);
        let currentDate = new Date();
        const timeDifference = deadlineDate.getTime() - currentDate.getTime();

        // Convert the time difference to days, hours, and minutes
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Display the countdown
        //console.log(`The bid ends in ${daysRemaining} days, ${hoursRemaining} hours ${minutesRemaining} minutes`);

        var card = document.createElement("div");
        card.className = "card";
        var cardId = product._id;
        card.setAttribute("id", cardId);

        var img = document.createElement("img");
        img.src = product.url; 
        img.alt = product.name;
        img.style.width = "100%"; 
        img.style.height = "80%";
        img.style.objectFit="cover";

        var details = document.createElement("div");
        details.className = "details";

        var name = document.createElement("span");
        name.className = "name";
        name.textContent = product.name;

        var price = document.createElement("div");
        price.className = "price";

        var newPrice = document.createElement("span");
        newPrice.className = "new-price";
        newPrice.textContent = product.initial_price;

        var oldPrice = document.createElement("span");
        oldPrice.className = "old-price";
        oldPrice.textContent = product.normal_price;

        var time =document.createElement('div');
        time.className='time-class'
        var h3 = document.createElement('h3')
        h3.innerText = `Bid ends in ${daysRemaining}D, ${hoursRemaining} hrs`
        time.appendChild(h3)

        // Append elements to card
        details.appendChild(name);
        price.appendChild(newPrice);
        price.appendChild(oldPrice);
        details.appendChild(price);
        //details.appendChild(time)
        card.appendChild(img);
        card.appendChild(details);
        card.appendChild(time)
        productContainer.appendChild(card);
        
        card.addEventListener('click',()=>{
          const newpage = '../cards/card.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
          window.location.href =fullurl
        })

      }

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');
        
        document.getElementById('allProducts').addEventListener('click',()=>{
          const newpage = '../All-products/all.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })
        // myRepo

        document.getElementById('myRepo').addEventListener('click',()=>{
          const newpage = '../Myrepo/repo.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })
        document.getElementById('paymentGateway').addEventListener('click',()=>{
          const newpage = '../1_payment/demo.html'  
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })

        document.getElementById('notificationbell').addEventListener('click',()=>{
          const newpage = '../notificationfolder/notif.html'
          // C:\Users\chokk\OneDrive\Desktop\axios\public\notificatiofolder\notif.html
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl 
        })


    });

    
    let points = document.getElementById('points')

    const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});


    //console.log("checking email", getcoins.data.data)
    points.textContent = getcoins.data.data

    const getrightproducts = await axios.get('http://localhost:5501/api/v3/getUserProducts',{
      params: {
        username: urlusername}
    })

        const demoproducts = getrightproducts.data.data
        
        demoproducts.forEach(async(productId)=> {
          
          try {

            const deleteresponse = await axios.post('http://localhost:5501/api/v3/deleteProducts',{urlusername: urlusername,
            productId: productId})

            //updating coins
            const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
            points.textContent = getcoins.data.data
          if(deleteresponse.data.msg === 'matched'){
              let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail' , {
                params: {
                productid: productId
              }
              })
              
            
              if(productdetail.data.data.userID === urlusername){
                  var card = document.createElement("div");
                  card.className = "right-card";
                  
                  var img = document.createElement("img");
                  img.src = productdetail.data.data.url; 
                  img.alt = productdetail.data.data.name;
                  img.style.width = "100%"; 
                  img.style.height = "80%";
                  img.style.objectFit="cover";
                  
                  var details = document.createElement("div");
                  details.className = "right-details";
                  
                  var name = document.createElement("span");
                  name.className = "right-name";
                  name.textContent = productdetail.data.data.name;
                  
                  var price = document.createElement("div");
                  price.className = "right-price";
                  
                  var newPrice = document.createElement("span");
                  newPrice.className = "right-new-price";
                  newPrice.textContent = productdetail.data.data.initial_price;
                  
                  var oldPrice = document.createElement("span");
                  oldPrice.className = "right-old-price";
                  oldPrice.textContent = productdetail.data.data.normal_price;
        
                  // Append elements to card
                  details.appendChild(name);
                  price.appendChild(newPrice);
                  price.appendChild(oldPrice);
                  details.appendChild(price);
                  card.appendChild(img);
                  card.appendChild(details);
                  rightproducts.appendChild(card);
              }
              else{
                console.log("nested if")
              }
          }
          else{
            //notifNum.textContent = parseInt(notifNum.textContent) + 1;
          }
        } catch (error) {
          console.log("error in deleting and updating the user products")
          console.log(error)
        }

        });
  } catch (error) {
    console.log("error in dashboard");
    console.log(error)
  }


    
});