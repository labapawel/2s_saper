const XIlosc = 20; // wielkość pola
const YIlosc = 20; // wielkość pola
const min = 40; // liczba min
const $ = (n) => document.querySelector(n);
const offsetMap = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
let matryca=[]

function OblIleMin(x,y){
    offsetMap.forEach(off=>{
        let px=off[1]+x;
        let py=off[0]+y;
        if( px<XIlosc && px>=0 && py<YIlosc && py >= 0 ){
            matryca[py][px].ileMin++;
        }

    })
}

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
                OblIleMin(x,y);
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

function odslonaMin(){
    $('.kontener').classList.add('koniecGry');
    matryca.forEach(y=>{
        y.forEach(e=>{
            if(e.mina && !e.oznaczone){
                e.pole.classList.remove('hide');
                e.pole.classList.add('mina');
            }
        })
    })
}

function odslona(x, y){


    let m = matryca[y][x];
  //  console.log(m);
    if(m.oznaczone){
        return;
    }
    if(m.mina)
        {
            odslonaMin();
            return false;
        }
    else 
    if(m.ileMin==0)
    {
        m.odslona = true;
        m.pole.classList.remove('hide');
        
        offsetMap.forEach(off=>{
            let px=off[1]+x;
            let py=off[0]+y;
            if( px<XIlosc && px>=0 && py<YIlosc && py >= 0 ){
            //    console.log(py, px);
                m = matryca[py][px];
                if(m.ileMin==0 && !m.odslona)
                    odslona(px, py);
                else 
                {
                    m.pole.classList.add("mina"+m.ileMin);
                    m.pole.classList.remove('hide');
                }       
            }
        
        })
   } else {
     m.pole.classList.add("mina"+m.ileMin);
     m.pole.classList.remove('hide');
   }
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
        div.addEventListener('click', (e)=>{
          let x = parseInt(e.target.getAttribute('x')); 
          let y = parseInt(e.target.getAttribute('y'));
          if(!$('.kontener').classList.contains('koniecGry'))
                   odslona(x, y);
        })
        div.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
            let pole = matryca[e.target.getAttribute('y')][e.target.getAttribute('x')];
            pole.oznaczone = !pole.oznaczone;
            if(!pole.oznaczone)
                {
                    e.target.classList.remove('flaga');
                    e.target.classList.add('hide');   
                         
                }
            else {
                    e.target.classList.add('flaga');
                    e.target.classList.remove('hide');
                }

            return false;
        }, false);
        div.setAttribute('x', x);
        div.setAttribute('y', y);
        
        let poleMiny = {mina:false, ileMin:0, pole:div, oznaczone:false, odsloniete: false}
        matryca[y].push(poleMiny);
        k.append(div);
    }
  }
  genMin();
  //wyswielt()
}


init();