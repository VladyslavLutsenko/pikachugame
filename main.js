function $getElementById(id) {
  return document.getElementById(id);
}

const $btn = $getElementById("btn-kick");
const $bts = document.getElementById('btn-kill');

const character = {
  name: "Pikachu",
  defaultHp: 100,
  damageHP: 100,
  elHP: $getElementById("health-character"),
  elProgressBar: $getElementById("progressbar-character"),
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBarHp: renderProgressBarHp,
  changeHP: changeHP,
};
const enemy = {
  name: "Charmander",
  defaultHp: 100,
  damageHP: 100,
  elHP: $getElementById("health-enemy"),
  elProgressBar: $getElementById("progressbar-enemy"),
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBarHp: renderProgressBarHp,
  changeHP: changeHP,
};
$btn.addEventListener("click", function () {
  character.changeHP(random(20));
  enemy.changeHP(random(20));
});

$bts.addEventListener('click',function(){   
    enemy.changeHP(100);
})

function init() {
  console.log("Start Game");
  character.renderHP();
  enemy.renderHP();
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressBarHp();
}

function renderHPLife() {
  this.elHP.innerText = this.damageHP + " / " + this.defaultHp;
}

function renderProgressBarHp() {
  const { damageHP, defaultHp } = this;

  this.elProgressBar.style.width = (damageHP / defaultHp) * 100 + "%";
}

const $logs = document.querySelector("#logs");

function changeHP(count) {
  const { name } = this;
  if (this.damageHP <= count) {
    this.damageHP = 0;
    alert("Бедный  " + name + " проиграл Бой");
    $btn.disabled = true;
    $bts.disabled = true;
  } else {
    this.damageHP -= count;
  }
  this.renderHP();
  const log =
    this === enemy ? generateLog(this, character) : generateLog(this, enemy);
  console.log(log);
  const $p = document.createElement("p");
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson) {
    const { name: name1, damageHP, defaultHp } = firstPerson;
    const { name: name2 } = secondPerson;
  
    const logs = [
      `${name1} вспомнил что-то важное, но неожиданно ${name2}, не помня себя от испуга, ударил в предплечье врага.[${damageHP} / ${defaultHp} ]  `,
      `${name1} поперхнулся, и за это ${name2} с испугу приложил прямой удар коленом в лоб врага. [${damageHP} / ${defaultHp} ]`,
      `${name1} забылся, но в это время наглый ${name2}, приняв волевое решение, неслышно подойдя сзади, ударил. [${damageHP} / ${defaultHp} ]`,
      `${name1} пришел в себя, но неожиданно ${name2} случайно нанес мощнейший удар. [${damageHP} / ${defaultHp} ]`,
      `${name1} поперхнулся, но в это время ${name2} нехотя раздробил кулаком <вырезанно цензурой> противника. [${damageHP} / ${defaultHp} ]`,
      `${name1} удивился, а ${name2} пошатнувшись влепил подлый удар. [${damageHP} / ${defaultHp} ]`,
      `${name1} высморкался, но неожиданно ${name2} провел дробящий удар. [${damageHP} / ${defaultHp} ] `,
      `${name1} пошатнулся, и внезапно наглый ${name2} беспричинно ударил в ногу противника [${damageHP} / ${defaultHp} ]`,
      `${name1} расстроился, как вдруг, неожиданно ${name2} случайно влепил стопой в живот соперника. [${damageHP} / ${defaultHp} ]`,
      `${name1} пытался что-то сказать, но вдруг, неожиданно ${name2} со скуки, разбил бровь сопернику. [${damageHP} / ${defaultHp} ]`,
    ];
    return logs[random(logs.length) - 1];
}

init();