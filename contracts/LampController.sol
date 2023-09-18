//contratto per gestire l'accensione e lo spegnimento da remoto di una lampadina

pragma solidity ^0.5.0;

contract LampController {
    
    struct Lamp {
        bool isOn;
        string lampColor;
    }    

    Lamp public lamp;

    constructor() public {
        lamp = Lamp(true, "giallo");
    }

    //funzione per invertire lo stato della proprietà isOn che indica se la lampadina sia accesa o spenta
    function setLampState() external {
        lamp.isOn = !lamp.isOn;
    }

    function getLampState() external view returns (bool) {
        return (lamp.isOn);
    }

}