import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 100,
    selectors: 'character'
});
console.log(player1);

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 100,
    selectors: 'enemy'
});
console.log(player2);

function $getElementById(id) {
  return document.getElementById(id);
}

const $btn = $getElementById("btn-kick");
const $bts = $getElementById('btn-kill');


function initCount(){
    var c=0;
    return function (){
        c+= 1;
        if (c<6) {
            console.log(c);
            console.log(`Осталось ${6-c} нажатий`);
        }
        else {
            $btn.disabled = true;
            $bts.disabled = true;
            alert("количество попыток закончилось")
        }
    }
}
const pressCount = initCount();

$btn.addEventListener("click",  () =>{
  player1.changeHP(random(20), function(count) {
    console.log("some change after change HP", count);
    const log = generateLog(player1, player2, count)
    console.log(log);
    const $p = document.createElement("p");
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);

  });
  player2.changeHP(random(20), function(count) {
    console.log("some change after change HP", count);
    const log = generateLog(player2, player1, count)
    console.log(log);
    const $p = document.createElement("p");
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);
  
  });
  
  pressCount();
});

$bts.addEventListener('click',() =>{   
    player2.changeHP(100);
})

const init = () => {
  console.log("Start Game");
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

init();