/*
O localStorage salva os dados no formato de string, então se você precisar armazenar objetos ou arrays, 
é necessário converter para JSON usando JSON.stringify() e, ao recuperar, usar JSON.parse().
*/

//para achar o valor no objeto, fazer comparação com um pedaço string
const conts = document.querySelectorAll(".cont");
const biggerCont = document.querySelectorAll(".biggerCont");

//TODO: pensar onde coloca as oraçoes por escrito no terço

fetch('../data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(data => {

        const misterio = localStorage.getItem("misterio");
        const language = localStorage.getItem('language');
        
        let um = data[language].misterios[misterio];

         um.forEach( mist => {
            //console.log(mist);

            const contas = document.querySelector(".contas");
            criarContasMaiores(contas, mist);
            criarContasMenores(contas);
            
         })  
    });
    

conts.forEach(cont => {
    let i = 0; // Define uma variável `i` para cada `div`
    
    // Adiciona um evento de clique a cada `div`
    cont.addEventListener("click", () => {
        if (i === 0) {
            cont.classList.remove('ball');
            cont.classList.add('done');
            i = 1;
        } else if (i === 1) {
            cont.classList.remove('done');
            cont.classList.add('ball');
            i = 0;
        }
    });
});

biggerCont.forEach(conts => {
    let i = 0;

    conts.addEventListener("click", () => {
        if (i === 0) {
            conts.classList.remove('ball');
            conts.classList.add('done');
            i = 1;
        } else if (i === 1) {
            conts.classList.remove('done');
            conts.classList.add('ball');
            i = 0;
        }
    });
})

function criarContasMenores(contas){
    for(let i = 0; i < 10; i++){
        const conta = document.createElement("div");
        conta.classList.add('cont', 'ball');
        conta.addEventListener("click", done);
        conta.setAttribute("data-clicked", "0");
        contas.appendChild(conta);
    }
}

function criarContasMaiores(contas, mist){
    //div com a conta maior e o texto do misterio
    const div = document.createElement("div");
    div.classList.add('class', 'misterio');


    //conta maior
    const contaMaior = document.createElement("div");
    contaMaior.classList.add('contaMaior', 'ball');
    contaMaior.addEventListener("click", done);
    contaMaior.setAttribute("data-clicked", "0");

    //texto misterio
    const p = document.createElement('p');
    p.textContent = mist;
    
    div.appendChild(contaMaior);
    div.appendChild(p);
    contas.appendChild(div);
}

//marca as contas já rezadas
function done(){
    let clicked = this.getAttribute("data-clicked");
    if (clicked === "0") {
        this.classList.remove('ball');
        this.classList.add('done');
        this.setAttribute("data-clicked", "1");
    } else {
        this.classList.remove('done');
        this.classList.add('ball');
        this.setAttribute("data-clicked", "0");
    }   
}
