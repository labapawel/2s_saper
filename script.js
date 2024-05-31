const XIlosc = 20; // wielkość pola
const YIlosc = 20; // wielkość pola
const min = 20; // liczba min
const $ = (n) => document.querySelector(n);
let matryca = [];

function init() {
  console.log("---------- init -----------");
  let k = $(".kontener");
  k.style.gridTemplateColumns = `repeat(${XIlosc}, 1fr)`;
  k.style.gridTemplateRows = `repeat(${YIlosc}, 1fr)`;
  matryca = [];
  for (let y = 0; y < YIlosc; y++)
   {
       matryca.push([]); 
       for (let x = 0; x < XIlosc; x++) {
        let div = document.createElement('div');
        div.className = 'poleminy hide';
        //div.innerHTML = "0";
        div.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
            if(e.target.classList.contains('flaga'))
                {
                    e.target.classList.remove('flaga');
                    e.target.classList.add('hide');        
                }
            else if(e.target.classList.contains('hide'))
                {
                    e.target.classList.add('flaga');
                    e.target.classList.remove('hide');
                }

            return false;
        }, false);
        
        let poleMiny = {mina:false, ileMin:0, pole:div}
        matryca[y].push(poleMiny);
        k.append(div);
    }
  }
}

init();
