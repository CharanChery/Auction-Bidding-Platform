document.addEventListener('DOMContentLoaded',async()=>{
    try {
        let points = document.getElementById('points')
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');
        const notifNum = document.getElementById("notif-num")
        const notification = await axios.post('http://localhost:5501/api/v3/notificationProducts',{
          urlusername:urlusername
        })
        const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
        points.textContent = getcoins.data.data

        const content = document.getElementById('content') //whole content


        // const card = document.getElementById('card')
        // const contetext_cardnt = document.getElementById('text-card')
        // const text = document.getElementById('text')
        // const img_card = document.getElementById('img-card')
        // const img = document.getElementById('img')
        // const time_card = document.getElementById('time-card')
        // const time = document.getElementById('time')



        //console.log("count ",notification.data.data)
        if (notification.data.msg === 'yes') {
            const demonotification = notification.data.data
            demonotification.forEach(element => {

                var card = document.createElement("div");
                if(element.status){
                    card.className = "card-off";
                }
                else{
                    card.className = "card-off"
                }
                if(element.new_username === "payment"){
                  var textcard = document.createElement("div")
                  textcard.className ="text-card"
                  var text = document.createElement("p")
                  text.className='text'
                  text.innerText=`${element.new_price}/- Payment Success : ${element.index}coins added to your account`
                  textcard.appendChild(text)

                  var timecard = document.createElement("div")
                  timecard.className ="time-card"
                  var time = document.createElement("p")
                  time.className='time'
                  time.innerText=element.time
                  timecard.appendChild(time)

                  card.appendChild(textcard)
                  card.appendChild(timecard)

                  content.insertBefore(card, content.firstChild);
                }
                else{

                  var cardId = element.productId;
                  card.setAttribute("id", cardId);
  
  
                  var textcard = document.createElement("div")
                  textcard.className ="text-card"
                  var text = document.createElement("p")
                  text.className='text'
                  text.innerText="'Outbid Alert: You've been outbid on your item"
                  textcard.appendChild(text)
  
                  var imgcard = document.createElement("div")
                  imgcard.className ="image-card"
                  var img = document.createElement("img")
                  img.src = element.url
                  img.alt="painting"
                  imgcard.appendChild(img)
  
                  var timecard = document.createElement("div")
                  timecard.className ="time-card"
                  var time = document.createElement("p")
                  time.className='time'
                  time.innerText=element.time
                  timecard.appendChild(time)
  
                  card.appendChild(textcard)
                  card.appendChild(imgcard)
                  card.appendChild(timecard)
  
                  content.insertBefore(card, content.firstChild);

                  card.addEventListener('click',()=>{
                      const newpage = '../cards/card.html'
                      let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
                      window.location.href =fullurl
                    })
                }
                // content.appendChild(card)
                // console.log(element.new_username)

            });
        } else {
          notifNum.textContent = 0;
        }
        
      } catch (error) {
        console.log("error in notification....")
        console.log(error)
      }
})