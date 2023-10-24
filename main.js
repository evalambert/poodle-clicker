(() => {
    let score = 0;
    let priceMultiplicator = 10; // Prix du multiplicateur début de partie 
    let multiplicator = 0; // Niveau du multiplicateur début de partie

    document.getElementById("score").innerHTML = score;
    document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;

    //COOKIE-CLICKER //////////////////////////////////////////////////////////////
    document.getElementById('btn-cookieClicker').addEventListener('click', function () {
        // A COMPLETER ! 
        // Condition pour faire en sorte que le multiplicator fonctionne sur le cookie.

        if(multiplicator>0){
             score += 1*(multiplicator*2);
        }
        else{
            score += 1;
        }
        // Réaliser les deux autres conditions en fonction de votre cas
        document.getElementById('score').textContent = score;
    });

    // MULTIPLICATOR //////////////////////////////////////////////////////////////
    document.getElementById("btn-multiplicator").addEventListener("click", () => {
        if (score >= priceMultiplicator) {
            score -= priceMultiplicator;
            priceMultiplicator *= 2;
            multiplicator +=1;
            // Historique de console
            console.log("clicks : " + score + ", price : " + priceMultiplicator + " lvl : " + multiplicator);

            // Mettez à jour le contenu des éléments
            document.getElementById("score").innerHTML = score;
            document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;
            document.getElementById("lvl-multiplicator").innerHTML = multiplicator;
        } else {
            // Message d'erreur
            alert("Vous n'avez pas assez de crédits");
        }
    });

    // AUTOCLICK //////////////////////////////////////////////////////////////

    let priceAutoClicker = 50
    let autoClicker = 0 // 1 clic par seconde
    let lvlAutoClicker = 0;

    document.getElementById('cost-autoClicker').innerHTML = priceAutoClicker

    function click() {
        score += autoClicker
        document.getElementById('score').textContent = score
    }

    document.getElementById('btn-autoClicker').addEventListener('click', () => {
        if (score >= priceAutoClicker) {
            score -= priceAutoClicker
            priceAutoClicker *= 3 // Augmente le coût 
            autoClicker++

            // Démarre le clic automatique
            setInterval(click, 1000) // 1000 ms = 1 sec.

            // Mettez à jour le contenu des éléments
            document.getElementById('score').innerHTML = score
            document.getElementById('cost-autoClicker').innerHTML = priceAutoClicker
            document.getElementById("lvl-autoClicker").innerHTML = autoClicker;
        } else {
            // Message d'erreur
            alert("Vous n'avez pas assez de crédits")
        }
    });


    

})();


  