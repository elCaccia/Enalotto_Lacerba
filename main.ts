import { resourceLimits } from "node:worker_threads";

function RNG(min:number, max:number){
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

function RNGSequence (len: number, min:number, max:number){
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

const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "Nazionale"];

const estrazioni: {[ruota: string]: number[]} = {};

for(const ruota of ruote){
    const estrazione = RNGSequence(5, 1, 100);
    estrazioni[ruota] = estrazione;
}
console.log(JSON.stringify(estrazioni, null, 2))
// console.log(myArr);