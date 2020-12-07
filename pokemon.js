class Selectors{
    constructor(name) {
        this.elHP=document.getElementById(`health-${name}`);
        //this.elProgressbar=document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors}) {
        super(selectors);
        this.selectors=selectors;
        this.name=name;
        this.hp={
            current: hp,
            total: hp
        };
        this.type=type;
        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current-=count;
        if (this.hp.current <= 0) {
          this.hp.current = 0;
          alert("Бедный  " + name + " проиграл Бой");
        } 
        this.renderHP();
        cb && cb(count);
        /* const log =
          this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        console.log(log);
        const $p = document.createElement("p");
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]); */
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHp();
    }
    
    renderHPLife = () => {
    this.elHP.innerText = this.hp.current + " / " + this.hp.total;
    }
    
    renderProgressBarHp = () => {
        const { hp: {current, total} } = this;
        var bar=document.getElementById(`progressbar-${this.selectors}`);
        bar.style.width = (current / total) * 100 + "%";
    }
}

export default Pokemon;