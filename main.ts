const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "Nazionale"];

const estrazioni: {[ruota: string]: number[]} = {};

function RNG (min:number, max:number) {
    const rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
}

// function RNGDec(min:number, max:number, precision:number){
//     if(precision < 0){
//         throw new Error(`The precision number (${precision}) is negative`);
//     }
//     if(!Number.isInteger(precision)){
//         throw new Error(`The precision number (${precision}) is not integer`);
//     }
//     return RNG(min, max).toFixed(precision);
// }

function RNGSequence (len: number, min:number, max:number) {
    if (len > max - min){
        throw new Error(`cannot find ${len} numbers betwren ${min} and ${max}`);
    }
    const res: number[] = [];
    while(res.length<len) {
        const rn = RNG(min, max);
        // CONTROLLO SE IL NUMERO RANDOMICO GENERATO è GIà PRESENTE
        // ALL'INTERNO DELL'ARRAY SE è VERO RICOMINCIA IL CICLO WHILE
        // SE è FALSO ESEGUE IL PUSH
        if(res.includes(rn)){
            continue;
        }
        res.push(rn);
    }
    return res;
}

for(const ruotaName of ruote){
        const estrazione = RNGSequence(5, 1, 100);
        estrazioni[ruotaName] = estrazione;
}

function createRuotaCnt (ruotaName: string, estrazioni: number[]) {
    // CREO IL CONTAINER PER OGNI ESTRAZIONE        
    const ruotaDiv = document.createElement("div");
    
    // AGGIUNGO UNA CLASSE AL TAG DIV
    ruotaDiv.className = `ruota ${ruotaName.toLowerCase()}`;
        
    // CREO IL CONTAINER PER IL NOME DELLE ESTRAZIONI
        const nameH2 = document.createElement("h2");

    // AGGIUNGO IL NOME DELLA RUOTA AL TAG H2 CHE HO CREATO PRIMA
        nameH2.innerText = ruotaName;

        // AGGIUNGO UNA CLASSE AL TAG H2
            nameH2.className = "ruota__name";

    // AGGIUNGO IL TAG H2 AL DIV DELLA RUOTA    
        ruotaDiv.appendChild(nameH2);

        for(const num of estrazioni){
            // CREO IL CONTAINER PER IL NUMERO DELLE ESTRAZIONI
                const numP = document.createElement("p");
                
                // AGGIUNGO IL NUMERO ESTRATTO AL TAG P CHE HO CREATO PRIMA
                numP.innerText = "" + num;
                const numDiv = document.createElement("div");

                // AGGIUNGO UNA CLASSE AL TAG H2
                numDiv.className = "ruota__number";
        
            // AGGIUNGO IL TAG P AL DIV DELLA RUOTA    
                numDiv.appendChild(numP);
                ruotaDiv.appendChild(numDiv);
        }
        return ruotaDiv;
}

const container = document.getElementById("estrazioni");
    if(container){    
        for(const ruotaName of ruote){
            const ruotaEstrazioni = estrazioni[ruotaName]
            const ruota = createRuotaCnt(ruotaName, ruotaEstrazioni);
        // AGGIUNGO IL DIV DELLA TUOTA AL DIV CONTAINER
            container.appendChild(ruota);
        }
    }



