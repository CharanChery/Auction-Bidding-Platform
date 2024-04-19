const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlusername = urlParams.get('username');

const rightproducts = await axios.get('http://localhost:5501/api/v3/getuserproducts',{
    username:urlusername
});


