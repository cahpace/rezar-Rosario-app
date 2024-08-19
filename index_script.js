//fazer um fetch gerando um card para cada dia da semana com os dados no json
//fazer um switch para escolher o dia da semana e ir para a pagina do dia
//passar o valor do dia da semana por local storage, na pagina seguinte vai puxar os dados de acordo com o misterio
const daysUl = document.querySelector(".days");

localStorage.clear();
localStorage.setItem('misterio', '');
localStorage.setItem('language', '');

let languageSelection = document.querySelector("#languageSelection");
let language;
    
window.addEventListener('load', carregarDados)
languageSelection.addEventListener("change", carregarDados);

function carregarDados(language){
  language = languageSelection.value;
  localStorage.setItem('language', language);
  console.log(language)

  while (daysUl.firstChild) {
    daysUl.removeChild(daysUl.firstChild);
  }

  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      
      const dados = data[language]
      const diasDaSemana = dados.dias_da_semana;

      //foreach 
      diasDaSemana.forEach((dia) => {

          const li = document.createElement('li');
          const dayBtn = document.createElement('button');
          dayBtn.classList = "diasSemana"

          dayBtn.textContent = dia;

          li.append(dayBtn);

          daysUl.appendChild(li);
          dayBtn.addEventListener("click", () => {goToPray(dia)});
      })
      
      // function goToPray(dia){
      //   if(dia == "Domingo" || dia == "Quarta-feira"){
      //     localStorage.setItem('misterio', 'misterios_gloriosos');
      //     console.log(localStorage);

      //   }else if(dia == "Segunda-feira" || dia == "Sábado"){
      //     localStorage.setItem('misterio', 'misterios_gozosos');
      //     console.log(localStorage);

      //   }else if(dia == "Terça-feira" || dia == "Sexta-feira"){
      //     localStorage.setItem('misterio', 'misterios_dolorosos');
      //     console.log(localStorage);

      //   }else if(dia == "Quinta-feira"){
      //     localStorage.setItem('misterio', 'misterios_luminosos');
      //     console.log(localStorage);
      //   }
        function goToPray(dia){
          if(dia == dados.dias_da_semana[0] || dia == dados.dias_da_semana[3]){
            localStorage.setItem('misterio', 'misterios_gloriosos');
            console.log(localStorage);
  
          }else if(dia == dados.dias_da_semana[1] || dia == dados.dias_da_semana[6]){
            localStorage.setItem('misterio', 'misterios_gozosos');
            console.log(localStorage);
  
          }else if(dia == dados.dias_da_semana[2] || dados.dia == dados.dias_da_semana[5]){
            localStorage.setItem('misterio', 'misterios_dolorosos');
            console.log(localStorage);
  
          }else if(dia == dados.dias_da_semana[4]){
            localStorage.setItem('misterio', 'misterios_luminosos');
            console.log(localStorage);
          }

       // "dias_da_semana": ["Sunday 0", "Monday 1", "Tuesday 2 ", "Wednesday 3 ", "Thursday 4", "Friday5 ", "Saturday 6"],
      /*
misterio_glorioso: domingo, quarta-feira;
misterio_gozoso: segunda-feira, sabado;
misterio_doloroso: terça-feira, sexta-feira;
misterio_luminoso: quinta-feira; 
*/

      window.location.href = './pages/prayer.html';
    }


  })
  .catch(error => {
    console.error('Erro ao processar o arquivo JSON:', error);
  });

}
