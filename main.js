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

let recepe = [];
let bottomMargin = 0;
let burger = [];


/* R E C E P T A S */

/* nukopijuoju ingridientus i temp variable */
let ingridientsForRecepe = ingridients.slice();
recepe.push(ingridientsForRecepe[0]);
ingridientsForRecepe.shift();
console.log(recepe);
/* pasiimu random skaiciu atsizvelgiant i ilgi ingridientu */
let randomIteration = Math.floor(Math.random() * (ingridientsForRecepe.length-1) + 2);

/* pasiimtu atsitiktini recepta pagal ilgi, pushinu ir isiimu is temp */
let randomIngridient = () => {
    let tempIngridient = ingridientsForRecepe[Math.floor(ingridientsForRecepe.length * Math.random())];
    recepe.push(tempIngridient);
    ingridientsForRecepe.splice(ingridientsForRecepe.indexOf(tempIngridient), 1);
}

/* paleidziu cikla */
for (let i = 0; i < randomIteration; i++){
    randomIngridient();
}

/* RECEPTO PABAIGA */






const recepeContainer = document.querySelector('.recepe');
const burgerContainer = document.querySelector('.burger');
const ingridientsContainer = document.querySelectorAll('.ingridient');

ingridients.forEach((ingridient, index) => {
    let newNode = document.createElement('div');
    newNode.className = ingridient;
    ingridientsContainer[index].appendChild(newNode);
})

recepe.forEach((ingridient, index) => {
    let newNode = document.createElement('li');
    newNode.innerText = `${index+1}. ${ingridient}`;
    recepeContainer.appendChild(newNode);
})

let removeIngridient = (element) => {
    classname = element.target.className.split(" ");
    burger = burger.filter(item => item !== classname[0]);
    
    element.target.remove();
    
        for (let ingridients of ingridientsContainer){
        if (!ingridients.hasChildNodes()){  
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

    
    
}

let takeIngridient = (element) => {
    //console.log(element.target.className);
    burger.push(element.target.className);
    compare(recepe);
    element.target.remove();
    
    burgerDraw();

}

ingridientsContainer.forEach(ingridients => {
    if (ingridients.hasChildNodes()){  
        ingridients.firstChild.addEventListener("click", takeIngridient);
    }
})




let compare = (element) => {
    if (burger.length == element.length){
        for (let i = 0; i < element.length; i++){
            if (burger[i] != element[i]){
                return;
               
            } 
        } 
    }else {
        console.log("neatitinka ilgis");
        return;
    }
    
    alert("You WON!");
}
