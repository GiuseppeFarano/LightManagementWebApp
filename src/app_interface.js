//nuovo modulo, in cui trasformo in formato json le strutture dati passate dalla blockchain

function retrieveJSON(lamp) {
    //salvo le proprietà della lampadina in una variabile temporanea
    const lampState = lamp[0];
    const colorOfLamp = lamp[1];

    //salvo le variabili temporanee come proprietà di un oggetto json, che poi ritorno
    return {
    isOn: lampState,
    lampColor: colorOfLamp,
    };
}