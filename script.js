// documentação da biblioteca: https://maykbrito.github.io/libs/NLWSetup/documentation/NLWSetup.html

const form = document.querySelector("#formHabits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")

button.addEventListener("click", add) // Já que a const button é igual ao botão do header, ao clicar no botão "Registrar o meu dia" ele vai executar a função add abaixo.
form.addEventListener("change", save) // ou seja, quando tiver uma modificação na constante formulário, que se refere ao formulário #formHabits (no caso ao clicar em um dos checkbox do formulário) ele irá ativar a função save abaixo.

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  // - new Date().toLocaleDateString(): no console (f12) essa informação mostra automaticamente a data de acordo com o dia que você está no presente momento.
  // o "pt-br" serve para a ordem ficar (DD/MM/YYYY)
  // o .slice( , ) serve para remover os 5 últimos caracteres, pois no momento só queremos que apareça "DD/MM".
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert("Dia já incluso")
    return // com isso ele para de executar a função
  }
  alert("Dia adicionado com sucesso")
  nlwSetup.addDay(today)
}
function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
  /*
    - localStorage: é as informações guardadas no navegador, ou seja, se eu abrir essa mesma página no navegador Mozilla, ele não vai ter as mesmas informações que estão guardadas no Chrome.
    - .setItem('chave, valor'): Aqui preciso colocar o nome da chave (qualquer nome que quiser). No valor colocamos os dados que quero que fiquem salvos.
    - Para salvar as informações, elas não podem estar em formato de objeto, precisam estar em formato de STRING. Por isso, é usado o JSON.stringify()
    - Com isso eu ainda não mantive os dados na página, mas eles estão salvos no localStorage (é só entrar no console e verificar)    */
}

/* Preenchimento feito manualmente:
const data = {
    exercise: ["01-01","01-06"],
    sleep: ["01-02","01-04","01-06"],
    studyItalian: ["01-03"],
    read: ["01-07","01-08","01-09"],
    diet: ["01-05"],
} */

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
/*  - JSON.parse: serve para converter a string em objeto novamente, para conseguir ler o dado no "nlwSetup.setData(data) e aparecer na tela em formato de checkbox novamente. 
    - .getItem: Serve para buscar o dado que está salvo no localStorage no nome da chave que determinamos anteriormente.
    - || {} : Se não houver nenhum dado salvo, colocaremos um objeto vazio no lugar para não dar erro.*/
nlwSetup.setData(data)
nlwSetup.load()
