//oggetto App che conterrà tutte le funzioni e le variabili necessarie per interagire con lo smart contract
App = {
  loading: false,
  web3Provider: null,
  account: null,
  lampContract: null,

  //chiamo le funzioni di caricamento
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  //inizializzo la connessione a Web3 (la libreria JavaScript per interagire con la blockchain Ethereum)
  //tramite Metamask e ottenere l'account dell'utente
  loadWeb3: async () => {
    if (typeof window.ethereum !== 'undefined') {
      App.web3Provider = window.ethereum;
      window.web3 = new Web3(window.ethereum);
    } else if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please install MetaMask extension.");
    }

    if (App.web3Provider) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        App.account = accounts[0];
      } catch (error) {
        console.error("Access to accounts denied by the user...");
      }
    } else {
      console.log('Non-Ethereum browser detected. Consider using MetaMask!');
    }
  },

  //ottenere l'account Ethereum dell'utente
  loadAccount: async () => {
    const accounts = await web3.eth.getAccounts();
    App.account = accounts[0];
    console.log(App.account);
  },

  //leggo il file JSON associato allo smart contract LampController, che viene inizializzato e collegato alla connessione Web3 fornita da MetaMask
  loadContract: async () => {
    const response = await fetch('LampController.json');
    const lampControllerJSON = await response.json();

    const LampControllerContract = TruffleContract(lampControllerJSON);
    LampControllerContract.setProvider(App.web3Provider);

    App.lampContract = await LampControllerContract.deployed();
  },

  //funzione per cambiare il colore della lampadina
  changeColor: async (lampJSON) => {
    const roundButton = document.querySelector(".round-button");

    if(lampJSON.isOn === true){
      roundButton.style.background = "yellow"
    } else {
      roundButton.style.background = "grey";
    }
  },

  //funzione per aggiornare lo stato della lampadina
  updateStatus: async (lampJSON) => {
    const textbox = document.querySelector(".textbox");

    if(lampJSON.isOn === true){
      textbox.value = "Lampadina accesa"
    } else {
      textbox.value = "Lampadina spenta";
    }
  },

  //funzione per visualizzare le attività nella pagina
  //viene evitato il double rendering tramite controllo della variabile loading
  render: async () => {
    if (App.loading) {
      return;
    }

    App.setLoading(true);

    console.log(App.account);
    $('#account').html(App.account);

    await App.renderWindow();

    App.setLoading(false);
  },

  //funzione per visualizzare i singoli oggetti
  renderWindow: async () => {
    const retrievedLamp = await App.lampContract.lamp(); //in retrievedLamp ho la lamp come oggetto fornito dallo smart contract
    const retrievedLampJSON = retrieveJSON(retrievedLamp); //chiamata alla mia funzione, che ritorna in retrievedLampJSON una versione JSON dell'oggetto lamp
    console.log(retrievedLamp);
    console.log(retrievedLampJSON);

    App.changeColor(retrievedLampJSON); //invoco la funzione per cambiare il colore passandogli il JSON della lampadina
    App.updateStatus(retrievedLampJSON); //invoco la funzione per mostrare lo stato della lampadina passandogli il JSON della lampadina
    //ora posso sfruttare retrievedLampJSON per farne leggere la proprietà "isOn" da una funzione che ne mostra lo stato
  },

  //funzione per visualizzare a schermo lo stato della lampadina
  changeLampState: async () => {
    App.setLoading(true);
  
    try {
      await App.lampContract.setLampState({ from: App.account }); // Passa l'indirizzo dell'account mittente
      window.location.reload();
    } catch (error) {
      console.error(error);
      App.setLoading(false);
    }
  },
  
  //gestione dello Stato di caricamento
  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

//utilizzo jQuery per eseguire azioni dopo il caricamento della pagina, attendo il completamento del caricamento dell'App, 
//e collego una funzione all'evento di clic su un bottone per cambiare lo stato della lampadina
$(() => {
  $(window).on('load', async () => {
    await App.load();
    $('#pulsante').on('click', App.changeLampState);
  });
});
