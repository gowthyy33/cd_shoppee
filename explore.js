let shop = document.getElementById("shop")





let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop =() => {

    return (shop.innerHTML = productItemsData
        .map((x)=>{
            let {id,name,price,rating,img}=x;
            let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="product" id="product-id-${id}">
            <div class="product-pic">
                <img src="${img}" alt="">
            </div>
            <div class="product-details">
                <h3>${name}</h3>
                
            </div>
            <div class="p">
                <p>Rs.${price}</p>
                <p>${rating} <i class="fa-solid fa-star"></i></p>
            </div>
            
            <div class="product-btns">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                
                <button class="buy-now" onclick="window.location.href='cart.html'">Buy Now</button>
                
                
            </div>
        </div>
        `
    }).join(""))

}
generateShop()

let increment = (id) =>{
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
        id: selectedItem.id,
        item: 1,
        })
    } else {
        search.item += 1
    }

    
    
    update(selectedItem.id)

    localStorage.setItem("data",JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }
    update(selectedItem.id)
    basket =basket.filter((x)=> x.item !== 0);
    localStorage.setItem("data",JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)    
    document.getElementById(id).innerHTML = search.item
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x , y) => x + y , 0)
}

calculation()