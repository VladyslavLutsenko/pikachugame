class Selectors{
    constructor(name) {
        this.elHP=document.getElementById(`health-${name}`);
        this.elIMG=document.getElementById(`sprite-${name}`);
        this.elNAME=document.getElementById(`name-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors, img, attacks=[]}) {
        super(selectors);
        this.selectors=selectors;
        this.name=name;
        this.hp={
            current: hp,
            total: hp
        };
        this.type=type;
        this.attacks=attacks;
        this.img=img;
        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current-=count;
        if (this.hp.current <= 0) {
          this.hp.current = 0;
          alert("Бедный " + this.name + " проиграл Бой");
        } 
        this.renderHP();
        //cb && cb(count);
        cb(count, this.hp.current);
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHp();
        this.renderIMG();
        this.renderNAME();
    }
    
    renderHPLife = () => {
    this.elHP.innerText = this.hp.current + " / " + this.hp.total;
    }

    renderIMG = () => {
        this.elIMG.src = this.img;
    }

    renderNAME = () => {
        this.elNAME.innerText = this.name;
    }
    
    
    renderProgressBarHp = () => {
        const { hp: {current, total} } = this;
        var bar=document.getElementById(`progressbar-${this.selectors}`);
        bar.style.width = (current / total) * 100 + "%";
        if (current<60 && current>20) {
            bar.classList.add("low")
        }
        else if (current<=20) {
            bar.classList.add("critical")
        }
        else {
            bar.className="";
            bar.classList.add("health");
        }
    }
}

export default Pokemon;