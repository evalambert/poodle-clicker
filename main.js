(() => {
    let clicks = 0;
    let priceMultiplicator = 10; // Prix du multiplicateur début de partie 
    let multiplicator = 0; // Niveau du multiplicateur début de partie

    // Sélectionnez les éléments par leur ID, pas par leur classe
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("costMultiplicator").innerHTML = priceMultiplicator;

    //JS CODE COOKIE CLIKER
    document.querySelector('.btn-cookieClicker').addEventListener('click', function () {
        // A COMPLETER ! 
        // Condition pour faire en sorte que le multiplicator fonctionne sur le cookie.

        if(multiplicator>0){
            clicks += 1*(multiplicator*2);
        }
        else{
            clicks += 1;
        }
        // Réaliser les deux autres conditions en fonction de votre cas
        document.querySelector('.score').textContent = clicks;
    });

    // Fonctionnement Multiplicator
    document.getElementById("multiplicator").addEventListener("click", () => {
        if (clicks >= priceMultiplicator) {
            clicks -= priceMultiplicator;
            priceMultiplicator *= 2;
            multiplicator +=1;
            // Historique de console
            console.log("clicks : " + clicks + ", price : " + priceMultiplicator + " lvl : " + multiplicator);

            // Mettez à jour le contenu des éléments
            document.getElementById("clicks").innerHTML = clicks;
            document.getElementById("costMultiplicator").innerHTML = priceMultiplicator;
        } else {
            // Message d'erreur
            alert("Vous n'avez pas assez de crédits");
        }
    });

})();

