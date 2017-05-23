if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceMonk.js', {scope: "."})
        .then(function(reg){
            console.log("Troubadour: Hello there! I'm Troubadour, your service worker of today. [Scope= '"+ reg.scope+"']");
        }).catch(function (error) {
            console.log("Troubadour: I'm not home, sorry! Try again later. [Error = '"+ error+"']");
        });
}