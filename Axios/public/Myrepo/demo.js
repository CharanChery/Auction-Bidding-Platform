document.addEventListener("DOMContentLoaded", async () => {
  const productContainer = document.getElementById("product-container");
  const rightproducts = document.getElementById("rightproducts");

  // Array of product data (name, image URL, new price, old price)
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlusername = urlParams.get("username");
    let points = document.getElementById("points");

    const getrightproducts = await axios.get(
      "http://localhost:5501/api/v3/getUserProducts",
      {
        params: {
          username: urlusername,
        },
      }
    );

    const demoproducts = getrightproducts.data.data;

    demoproducts.forEach(async (productId) => {
      try {
        const deleteresponse = await axios.post(
          "http://localhost:5501/api/v3/deleteProducts",
          { urlusername: urlusername, productId: productId }
        );

        //updating coins
        const getcoins = await axios.post(
          "http://localhost:5501/api/v2/getcoins",
          { urlusername: urlusername }
        );
        points.textContent = getcoins.data.data;

        if (deleteresponse.data.msg === "matched") {
          let productdetail = await axios.get(
            "http://localhost:5501/api/v2/getproductdetail",
            {
              params: {
                productid: productId,
              },
            }
          );

          if (productdetail.data.data.userID === urlusername) {
            var card = document.createElement("div");
            card.className = "right-card";
            var cardId = productId._id;
            card.setAttribute("id", cardId);

            var img = document.createElement("img");
            img.src = productdetail.data.data.url;
            img.alt = productdetail.data.data.name;
            img.style.width = "100%";
            img.style.height = "80%";
            img.style.objectFit = "cover";

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
            productContainer.appendChild(card);
          } else {
            console.log("nested if");
          }
        }
      } catch (error) {
        console.log("error in deleting and updating the user products");
        console.log(error);
      }
    });

    document.getElementById("allProducts").addEventListener("click", () => {
      const newpage = "../All-products/all.html";
      let fullurl = newpage + "?username=" + encodeURIComponent(urlusername);
      window.location.href = fullurl;
    });
    document.getElementById("myRepo").addEventListener("click", () => {
      const newpage = "../Myrepo/repo.html";
      // C:\Users\chokk\OneDrive\Desktop\axios\public\notificatiofolder\notif.html
      let fullurl = newpage + "?username=" + encodeURIComponent(urlusername);
      window.location.href = fullurl;
    });

    card.addEventListener("click", () => {
      const newpage = "../cards/card.html";
      let fullurl =
        newpage +
        "?username=" +
        encodeURIComponent(urlusername) +
        "&id=" +
        encodeURIComponent(cardId);
      window.location.href = fullurl;
    });

    //let points = document.getElementById('points')

    //const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});

    //console.log("checking email", getcoins.data.data)

    //const demoproducts = getrightproducts.data.data

    //console.log("demoproducts")
    //console.log(demoproducts)
    //console.log(getrightproducts.data.datacredits)

    // demoproducts.forEach(async(productId)=> {

    //   try {
    //     const deleteresponse = await axios.post('http://localhost:5501/api/v3/deleteProducts',{urlusername: urlusername,
    //     productId: productId})

    //     //updating coins
    //     const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
    //     points.textContent = getcoins.data.data

    //   if(deleteresponse.data.msg === 'matched'){
    //       let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail' , {
    //         params: {
    //         productid: productId
    //       }
    //       })

    //       if(productdetail.data.data.userID === urlusername){
    //           var card = document.createElement("div");
    //           card.className = "right-card";

    //           var img = document.createElement("img");
    //           img.src = productdetail.data.data.url;
    //           img.alt = productdetail.data.data.name;
    //           img.style.width = "100%";
    //           img.style.height = "80%";
    //           img.style.objectFit="cover";

    //           var details = document.createElement("div");
    //           details.className = "right-details";

    //           var name = document.createElement("span");
    //           name.className = "right-name";
    //           name.textContent = productdetail.data.data.name;

    //           var price = document.createElement("div");
    //           price.className = "right-price";

    //           var newPrice = document.createElement("span");
    //           newPrice.className = "right-new-price";
    //           newPrice.textContent = productdetail.data.data.initial_price;

    //           var oldPrice = document.createElement("span");
    //           oldPrice.className = "right-old-price";
    //           oldPrice.textContent = productdetail.data.data.normal_price;

    //           // Append elements to card
    //           details.appendChild(name);
    //           price.appendChild(newPrice);
    //           price.appendChild(oldPrice);
    //           details.appendChild(price);
    //           card.appendChild(img);
    //           card.appendChild(details);
    //           rightproducts.appendChild(card);
    //       }
    //       else{
    //         console.log("nested if")
    //       }
    //   }
    // } catch (error) {
    //   console.log("error in deleting and updating the user products")
    //   console.log(error)
    // }

    // });
  } catch (error) {
    console.log("error in dashboard");
    console.log(error);
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlusername = urlParams.get("username");
  const paymentbutton = document.getElementById("paymentbutton");

  paymentbutton.addEventListener("click", () => {
    const newpage = "../1_payment/demo.html";
    let fullurl = newpage + "?username=" + encodeURIComponent(urlusername);
    window.location.href = fullurl;
  });
});
