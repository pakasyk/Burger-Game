const ingridients = [
    "bun-bottom",
    "bun-top",
    "meat",
    "cheese",
    "lettuce",
    "tomato",
    "meat",
    "cheese"
];

let recepe = [
    [],
    [],
    [],
    []
];
let bottomMargin = 0;
let burger = [];
let ingridientsCount = 3;
let ingridientsForRecepe;

const recepeContainer = document.querySelectorAll('.recepe');
const burgerContainer = document.querySelector('.burger');
const ingridientsContainer = document.querySelectorAll('.ingridient');


/* R E C E P T A S */



for (let j = 0; j < 4; j++) {
    /* nukopijuoju ingridientus i temp variable */
    ingridientsForRecepe = ingridients.slice();
    recepe[j].push(ingridientsForRecepe[0]);
    ingridientsForRecepe.shift();

    /* pasiimtu atsitiktini recepta pagal ilgi, pushinu ir isiimu is temp */
    let randomIngridient = () => {
        let tempIngridient = ingridientsForRecepe[Math.floor(ingridientsForRecepe.length * Math.random())];
        recepe[j].push(tempIngridient);
        ingridientsForRecepe.splice(ingridientsForRecepe.indexOf(tempIngridient), 1);
    }

    for (let i = 1; i < ingridientsCount; i++) {
        randomIngridient();
    }

    recepe[j].forEach((ingridient, index) => {
        let newNode = document.createElement('li');
        newNode.innerText = `${index+1}. ${ingridient}`;
        recepeContainer[j].appendChild(newNode);
    })

}

let generateNewRecepe = () => {

}


/* pasiimu random skaiciu atsizvelgiant i ilgi ingridientu */
// let randomIteration = Math.floor(Math.random() * (ingridientsForRecepe.length-1) + 2);
/* paleidziu cikla */
// for (let i = 0; i < randomIteration; i++){
//     randomIngridient();
// }




/* RECEPTO PABAIGA */










let removeIngridient = (element) => {
    classname = element.target.className.split(" ");
    burger = burger.filter(item => item !== classname[0]);

    element.target.remove();

    for (let ingridients of ingridientsContainer) {
        if (!ingridients.hasChildNodes()) {
            let newNode = document.createElement('div');
            newNode.className = classname[0];
            ingridients.appendChild(newNode).addEventListener("click", takeIngridient);
            return burgerDraw();


        }
    }
    burgerDraw();
}

let burgerDraw = () => {
    bottomMargin = 0;
    burgerContainer.innerHTML = "";
    burger.forEach((ingridient) => {
        let newNode = document.createElement('div');
        newNode.className = `${ingridient} on-plate`;
        newNode.style = `bottom: ${bottomMargin}%`;
        burgerContainer.appendChild(newNode).addEventListener("click", removeIngridient);
        bottomMargin += 7;

    })

    for (let j = 0; j < recepe.length; j++) {
        compare(recepe[j], j);
    }
}

let takeIngridient = (element) => {
    //console.log(element.target.className);
    burger.push(element.target.className);
    element.target.remove();

    burgerDraw();

}

ingridientsContainer.forEach(ingridients => {
    if (ingridients.hasChildNodes()) {
        ingridients.firstChild.addEventListener("click", takeIngridient);
    }
})




let compare = (element, j) => {
    console.log(recepeContainer[j], j);
    if (burger.length == element.length) {
        for (let i = 0; i < element.length; i++) {

            if (burger[i] != element[i]) {
                //recepeContainer[j].childNodes[i].style.color = "black";
                return;

            }
            

        }

        console.log(recepeContainer[j], j);
            recepeContainer[j].style = "background-color: red;";
            recepe.splice(j, 1);
            recepe.push(["bun", "bun", "bun"]);
            console.log(recepe);
            burger = [];
            burgerDraw();
            initIngridients();
            alert("You WON!");
            return;
            
    } else if (burger.length > 0){
        if (burger[burger.length-1] == element[burger.length-1]) {
            recepeContainer[j].childNodes[burger.length-1].style.color = "green";
        } else {
            recepeContainer[j].childNodes[burger.length-1].style.color = "black";
        }
    }
}

let initIngridients = () => {
    ingridients.forEach((ingridient, index) => {
        ingridientsContainer[index].innerHTML = "";
        let newNode = document.createElement('div');
        newNode.className = ingridient;
        ingridientsContainer[index].appendChild(newNode).addEventListener("click", takeIngridient);
    })
}

initIngridients();