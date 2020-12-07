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
  const $p = document.createElement("p");
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

init();