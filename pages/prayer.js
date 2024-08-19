/*
O localStorage salva os dados no formato de string, então se você precisar armazenar objetos ou arrays, 
é necessário converter para JSON usando JSON.stringify() e, ao recuperar, usar JSON.parse().
*/

//recebe o valor do dia da semana pelo localstorage  
//puxa de acordo com o dia da semana escolhido

//pega valor do local storage
//fetch
//faz switch e puxa dados
//para achar o valor no objeto, fazer comparação com um pedaço string
const conts = document.querySelectorAll(".cont");
const biggerCont = document.querySelectorAll(".biggerCont");

//TODO: uma variavel para a lingua, assim a variavel recebe o valor que o usuario escolheu para a lingua

// const misterio = localStorage.getItem("misterio");
// console.log(misterio + " " + typeof(misterio));

fetch('../data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(data => {
    // const textoMisterio = document.querySelectorAll(".textoMisterio");
    // console.log(textoMisterio);
    // textoMisterio.textContent = data.pt.misterios.gozosos[0];
    // console.log(data.pt.misterios.gozosos[0])

        const misterio = localStorage.getItem("misterio");
        const language = localStorage.getItem('language');
        //console.log(misterio)
        //console.log("teste " + data[language].misterios[misterio])
        //let nome1 = "misterios";
        //TODO colocar language ao invez de pt
        //let um = data.pt.misterios[misterio];
        let um = data[language].misterios[misterio];
        //console.log("teste" + um);

        //percorrer o objeto para procurar o misterio
        // if (data.pt.misterios[gozosos]) {
            
        //     data.pt.misterios[gozosos].forEach((item) => {
        //         console.log(item);
        //     });
        // } else {
        //     console.log(`Chave "${gozosos}" não encontrada no objeto.`);
        // };
        


         um.forEach( mist => {
            console.log(mist);

            const contas = document.querySelector(".contas");
            criarContasMaiores(contas, mist);
            criarContasMenores(contas);
            

            // const textoMisterio = document.querySelectorAll(".textoMisterio");
            // textoMisterio.textContent = mist;
         })
        
        //let misteriosDoDia = //filtrar agora o misterio para comparar   

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

/*
misterio_glorioso: domingo, quarta-feira;
misterio_gozoso: segunda-feira, sabado;
misterio_doloroso: terça-feira, sexta-feira;
misterio_luminoso: quinta-feira; 
*/