const XIlosc = 20; // wielkość pola
const YIlosc = 20; // wielkość pola
const min = 20; // liczba min
const $ = (n) => document.querySelector(n);
let matryca = [];

function genMin()
{
    if((YIlosc*XIlosc) < min) 
            throw new Error("liczba min jest zbyt wielka");
    let iloscMin = min;
    while(iloscMin>0)
        {
            let x = Math.floor(Math.random()*XIlosc);
            let y = Math.floor(Math.random()*YIlosc);
            if(!matryca[y][x].mina){
                matryca[y][x].mina = true;
                iloscMin--;
            }
        }
}

function wyswielt(){

    matryca.forEach((y)=>{
        y.forEach(x=>{
            let div = x.pole;
            if(x.mina || x.ileMin>0){
                div.classList.remove('hide');
                if(x.mina)
                {
                   div.classList.add('mina')
                } else
                   div.classList.add('mina'+x.ileMin);
            }
        })
    })
}


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
  genMin();
  wyswielt();
}


init()