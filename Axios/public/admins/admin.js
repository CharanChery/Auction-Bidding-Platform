document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.createElement('h1')
    h1.textContent = 'WELCOME ADMIN'
    document.querySelector('.main-content').appendChild(h1)
    document.getElementById("Users").addEventListener('click', async() => {

        document.getElementById('allusers').style.display ='grid';
        document.getElementById('allproducts').style.display='none';
        document.querySelector('.main-content').innerHTML=''
        const h1 = document.createElement('h1')
        h1.textContent = 'USER DETAILS'
        const input = document.createElement('input')
        input.type= 'text'
        input.id = 'searchInput'
        input.placeholder = 'Search by Name / ID / Email'
        document.querySelector('.main-content').appendChild(h1)
        document.querySelector('.main-content').appendChild(input)

        const response = await axios.get('http://localhost:5501/api/v5/admin/getallusersinfo')
        //console.log(response.data.msg)
        const data = response.data.msg
        //console.log(data)
        displayallusers(data)
        //displayallitems(data)

        input.addEventListener('input', () => {
            const searchText = input.value.toLowerCase();
            document.getElementById('allusers').innerHTML='';
            if (searchText.trim() === '') {
                displayallusers(data);
            } else {
                const results = usersSearch(searchText , data);
                displayallusers(results);
            }
        });

        
    });

    document.getElementById("products").addEventListener('click', async()=>{
        document.getElementById('allproducts').style.display='grid';
        document.getElementById('allusers').style.display ='none';
        document.querySelector('.main-content').innerHTML=''
        const h1 = document.createElement('h1')
        h1.textContent = 'PRODUCT DETAILS'
        const input = document.createElement('input')
        input.type= 'text'
        input.id = 'searchInput'
        input.placeholder = 'Search by Name / ID'
        document.querySelector('.main-content').appendChild(h1)
        document.querySelector('.main-content').appendChild(input)


        const response = await axios.get('http://localhost:5501/api/v5/admin/getallitemsinfo')
        const data= response.data.msg
        //console.log(data)
        displayallitems(data)

        input.addEventListener('input', () => {
            const searchText = input.value.toLowerCase();
            //console.log("input value..",searchText)
            document.getElementById('allproducts').innerHTML='';
            if (searchText.trim() === '') {
                displayallitems(data);
            } else {
                const results = performSearch(searchText , data);
                displayallitems(results);
            }
        });
    })
    document.getElementById('ALL').addEventListener('click',()=>{
        const newpage = '../senddatatoDatabase/index.html'
        window.location.href =newpage
      })

});





function usersSearch(text,data){
    let itemsbyid = data.filter(item => (item._id).toLowerCase().includes(text))
    let itemsbyname = data.filter(item => (item.username).toLowerCase().includes(text))
    let items = itemsbyid.concat(itemsbyname)
        return items
}

function performSearch(text, data){
    let itemsbyid = data.filter(item => (item._id).toLowerCase().includes(text))
    let itemsbyname = data.filter(item => (item.name).toLowerCase().includes(text))
    let items = itemsbyid.concat(itemsbyname)
        return items
}

function displayallusers(data){
    const users = document.getElementById('allusers');
    data.forEach(item => {
        const table = createTable();
        const thead = createTableHead(item.username);
        const tbody = createTableBody();
        const card = createUserCard();
        card.id =item._id;
        const tableContainer = createUserTableContainer();
        const button = createbutton(item._id)
        const deldiv = createdeldiv()
        deldiv.appendChild(button)

        const tr = createTableRow("BidderID", item._id)
        tbody.appendChild(tr);
        const tr1 = createTableRow("Bidder Status", "Verified")
        tbody.appendChild(tr1);
        const tr2 = createTableRow("Username", item.username)
        tbody.appendChild(tr2);
        const tr3 = createTableRow("Email", item.email)
        tbody.appendChild(tr3);
        const tr4 = createTableRow("Coins", item.coins)
        tbody.appendChild(tr4);

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        card.appendChild(tableContainer);
        card.appendChild(deldiv)
        users.appendChild(card);



        button.addEventListener('click',async()=>{
            document.getElementById(item._id).style.display = 'none'
            const delproduct = await axios.post('http://localhost:5501/api/v5/admin/deleteuser',{url_user_id: item._id});
            console.log(delproduct.data.msg)

        })
    });

}

function displayallitems(data){
    const products = document.getElementById('allproducts')
    //let n=0;
    data.forEach(item=>{
        //console.log(n++);
        const table = createTable();
        const thead = createTableHead(item.name);
        const tbody = createTableBody();
        const card = createUserCard();
        card.id =item._id;
        const tableContainer = createUserTableContainer();
        const button = createbutton(item._id)
        const deldiv = createdeldiv()
        deldiv.appendChild(button)

        const tr = createTableRow("IMAGE", item.url)
        tbody.appendChild(tr);
        const tr01 = createTableRow("Item ID", item._id)
        tbody.appendChild(tr01);
        const tr1 = createTableRow("Bidder Status", "Verified")
        tbody.appendChild(tr1);
        const tr2 = createTableRow("Auction Price", item.initial_price)
        tbody.appendChild(tr2);
        const tr3 = createTableRow("Bidding Price", item.normal_price)
        tbody.appendChild(tr3);
        const tr4 = createTableRow("Bidder", item.userID)
        tbody.appendChild(tr4);
        const tr5 = createTableRow("Expires", item.bid_end_date)
        tbody.appendChild(tr5);
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        card.appendChild(tableContainer);
        card.appendChild(deldiv)
        products.appendChild(card);

        button.addEventListener('click',async()=>{
            document.getElementById(item._id).style.display = 'none'
            const delproduct = await axios.post('http://localhost:5501/api/v5/admin/deleteproducts',{url_product_id: item._id});
            console.log(delproduct.data.msg)
        })
    })

}









function createbutton(id){
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.id = id;
    button.textContent = 'Delete USER';
    return button;
}

function createdeldiv(){
    const div = document.createElement('div');
    div.className = 'del-user';
    return div;
}

function createTableRow(status, bidder) {
    const tr = document.createElement('tr');
    if(status=="IMAGE"){
        const img= document.createElement('img')
        img.style.height="70px"
        img.style.width='70px'
        img.src = bidder;
        img.alt="item"
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = status;
        td2.appendChild(img);
        tr.appendChild(td1);
        tr.appendChild(td2);
    }
    else{
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = status;
        if (bidder==='something') {
            td2.textContent = "-";
        }else if(status==='Expires'){

            let deadlineDate = new Date(bidder);
            let currentDate = new Date();
            const timeDifference = deadlineDate.getTime() - currentDate.getTime();

            // Convert the time difference to days, hours, and minutes
            const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            td2.textContent = `${daysRemaining}D, ${hoursRemaining}Hr`;
        }
         else {
            td2.textContent = bidder;
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
    }
    return tr;
}




function createUserCard() {
    const card = document.createElement('div');
    card.className = 'card';
    return card;
}

function createUserTableContainer() {
    const tableContainer = document.createElement('div');
    tableContainer.id = 'user-table';
    tableContainer.className = 'user-table';
    return tableContainer;
}

function createTable() {
    return document.createElement('table');
}

function createTableHead(username) {
    const thead = document.createElement('thead');
    const th = document.createElement('th');
    th.textContent = username;
    th.colSpan = "2";
    thead.appendChild(th);
    return thead;
}

function createTableBody() {
    return document.createElement('tbody');
}


