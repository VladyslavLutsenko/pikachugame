import Pokemon from "./pokemon.js";
import random from "./utils.js";
import pokemons from "./pokemons.js";

const $control=document.querySelector('.control');

let level=1;

let player1PokemonId=random(6);
let player1Pokemon = pokemons.find(item => item.id === player1PokemonId);

let player2PokemonId=player1PokemonId;
while (player2PokemonId==player1PokemonId){
  player2PokemonId=random(6);
}

let player2Pokemon = pokemons.find(item => item.id === player2PokemonId);

let player1 = new Pokemon({
    ...player1Pokemon,
    selectors: 'player1'
});
console.log(player1);

let player2 = new Pokemon({
  ...player2Pokemon,
  selectors: 'player2'
});
console.log(player2);


player1.attacks.forEach(item => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = item.name;
  const pressCount = initCount(item.maxCount, $btn);
  $btn.addEventListener('click', ()=>{
    console.log('Click button', $btn.innerText)
    pressCount();
    var status=true;
    player1.changeHP(random(20), function(count, hp) {
      //console.log("some change after change HP", count);
      if (status) {
        const log = generateLog(player1, player2, count)
        console.log(log);
        const $p = document.createElement("p");
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
      }
      if (hp==0) {
        renderStartNewGameButton();
        status=false;
      }
    });
    player2.changeHP(random(20), function(count, hp) {
      //console.log("some change after change HP", count);
      if (status) {
        const log = generateLog(player2, player1, count)
        console.log(log);
        const $p = document.createElement("p");
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
      }
      if (hp==0) {
        renderNewEnemyButton();
        status=false;
      }
    });

  })
  $control.appendChild($btn);
});


function startGame() {
  location.reload();
}

function renderStartNewGameButton() {
  const allButtons = document.querySelectorAll('.control .button');
  allButtons.forEach(item => item.remove());


  const allLogs = document.querySelectorAll('#logs p');
  allLogs.forEach(item => item.remove());


  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = "Start New Game";
  $btn.addEventListener('click', ()=>{
    startGame();
  })
  $control.appendChild($btn);
}

function renderNewEnemyButton() {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = "New Enemy";
  $btn.addEventListener('click', ()=>{
    renderEnemy();
    $btn.remove();
  })
  $control.appendChild($btn);
}

function renderEnemy() {
  level++;
  player2PokemonId=random(6);
  player2Pokemon = pokemons.find(item => item.id === player2PokemonId);

  player2 = new Pokemon({
    ...player2Pokemon,
    selectors: 'player2'
  });
  console.log(player2);
  let lvl=document.getElementById(`lvl`);
  lvl.innerText=`Lv. ${level}`






}


function initCount(c, btn){
    var count=c;
    return function (){
      if (count>1) {
        count -= 1;
        console.log(`Осталось ${count} нажатий`);
      }
      else if(count=1){
        count -= 1;
        btn.disabled=true;
        alert("количество попыток закончилось")
      }
    }
}



const $logs = document.querySelector("#logs");

const generateLog= (firstPerson, secondPerson) => {
    const { name: name1, hp: {current, total} } = firstPerson;
    const { name: name2 } = secondPerson;
  
    const logs = [
      `${name1} вспомнил что-то важное, но неожиданно ${name2}, не помня себя от испуга, ударил в предплечье врага.[${current} / ${total} ]  `,
      `${name1} поперхнулся, и за это ${name2} с испугу приложил прямой удар коленом в лоб врага. [${current} / ${total} ]`,
      `${name1} забылся, но в это время наглый ${name2}, приняв волевое решение, неслышно подойдя сзади, ударил. [${current} / ${total} ]`,
      `${name1} пришел в себя, но неожиданно ${name2} случайно нанес мощнейший удар. [${current} / ${total} ]`,
      `${name1} поперхнулся, но в это время ${name2} нехотя раздробил кулаком <вырезанно цензурой> противника. [${current} / ${total} ]`,
      `${name1} удивился, а ${name2} пошатнувшись влепил подлый удар. [${current} / ${total} ]`,
      `${name1} высморкался, но неожиданно ${name2} провел дробящий удар. [${current} / ${total} ] `,
      `${name1} пошатнулся, и внезапно наглый ${name2} беспричинно ударил в ногу противника [${current} / ${total} ]`,
      `${name1} расстроился, как вдруг, неожиданно ${name2} случайно влепил стопой в живот соперника. [${current} / ${total} ]`,
      `${name1} пытался что-то сказать, но вдруг, неожиданно ${name2} со скуки, разбил бровь сопернику. [${current} / ${total} ]`,
    ];
    return logs[random(logs.length) - 1];
}

