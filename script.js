const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    if(amount.value <= 0 || amount.value === ""){
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let jsn = await response.json();
    const exRate = jsn[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amount.value * exRate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


for(let select of dropdowns){
    for (currCode in country_list){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}


const updateFlag = (el)=>{
    let currCode = el.value;
    let url = `https://flagsapi.com/${country_list[currCode]}/flat/64.png`;
    let img = el.parentElement.querySelector("img");
    img.src = url;

}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})