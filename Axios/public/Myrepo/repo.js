document.addEventListener("DOMContentLoaded", async ()=>{
    const productContainer = document.getElementById('product-container')
    const rightproducts = document.getElementById('rightproducts')
    let points = document.getElementById('points')
    
    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');

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
                    card.className = "card";
                    var cardId = productdetail.data.data._id;
                    card.setAttribute("id", cardId);
                    
                    var img = document.createElement("img");
                    img.src = productdetail.data.data.url; 
                    img.alt = productdetail.data.data.name;
                    img.style.width = "100%"; 
                    img.style.height = "80%";
                    img.style.objectFit="cover";
                    
                    var details = document.createElement("div");
                    details.className = "details";
                    
                    var name = document.createElement("span");
                    name.className = "name";
                    name.textContent = productdetail.data.data.name;
                    
                    var price = document.createElement("div");
                    price.className = "price";
                    
                    var newPrice = document.createElement("span");
                    newPrice.className = "new-price";
                    newPrice.textContent = productdetail.data.data.initial_price;
                    
                    var oldPrice = document.createElement("span");
                    oldPrice.className = "old-price";
                    oldPrice.textContent = productdetail.data.data.normal_price;
          
                    // Append elements to card
                    details.appendChild(name);
                    price.appendChild(newPrice);
                    price.appendChild(oldPrice);
                    details.appendChild(price);
                    card.appendChild(img);
                    card.appendChild(details);
                    rightproducts.appendChild(card);


                    document.getElementById('allProducts').addEventListener('click',()=>{
                        const newpage = '../All-products/all.html'
                        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
                        window.location.href =fullurl
                      })
                  
                  
                      card.addEventListener('click',()=>{
                        const newpage = '../cards/card.html'
                        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
                        window.location.href =fullurl
                      })
                }
                else{
                  console.log("nested if")
                }
            }
          } catch (error) {
            console.log("error in deleting and updating the user products")
            console.log(error)
          }
  
          });
 
    } catch (error) {
        
    }

  
    const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlusername = urlParams.get('username');
   const paymentbutton = document.getElementById("paymentbutton")
  
  
      paymentbutton.addEventListener('click',()=>{
        const newpage = '../1_payment/payment.html'
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl
      })
      
  });