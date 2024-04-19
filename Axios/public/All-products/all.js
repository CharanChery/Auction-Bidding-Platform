document.addEventListener("DOMContentLoaded", async ()=>{

    const productContainer = document.getElementById('product-container')
    
    // Array of product data (name, image URL, new price, old price)
    try {
      const leftproducts = await axios.get('http://localhost:5501/api/v2/dashboard');
      const products = leftproducts.data.data

      products.forEach(function(product) {
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
    
        // Append elements to card
        details.appendChild(name);
        price.appendChild(newPrice);
        price.appendChild(oldPrice);
        details.appendChild(price);
        card.appendChild(img);
        card.appendChild(details);
        productContainer.appendChild(card);
    
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');

        document.getElementById('myRepo').addEventListener('click',()=>{
          const newpage = '../Myrepo/repo.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })
        
        let points = document.getElementById('points')
    
        // points.addEventListener('click',()=>{
        //     const newpage = '../cards/card.html'
        //     let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
        //     window.location.href =fullurl
        // })
        card.addEventListener('click',()=>{
            const newpage = '../cards/card.html'
            let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
            window.location.href =fullurl
          })
      });
  
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlusername = urlParams.get('username');
  
      const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
  
  
      //console.log("checking email", getcoins.data.data)
      points.textContent = getcoins.data.data
  
    } catch (error) {
      console.log("error in All products");
      console.log(error)
    }
  
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlusername = urlParams.get('username');
      const paymentbutton = document.getElementById("paymentbutton")
  });