(() => {
    let score = 0;
    // Multiplicato
    let priceMultiplicator = 10; // Prix du multiplicateur début de partie 
    let multiplicator = 0; // Niveau du multiplicateur début de partie

    document.getElementById("score").innerHTML = score;
    document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;

    //COOKIE-CLICKER
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

    // MULTIPLICATOR
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
        } else {
            // Message d'erreur
            alert("Vous n'avez pas assez de crédits");
        }
    });



    // AUTOCLICK
/* 
    const scoreDisplay = document.querySelector('.score')
    const btnAutoClick = document.getElementsByClassName('btn-autoClicker')
    
    let priceAutoClick = 50
    let rateAutoClick = 1 // 1 clic par seconde


    function updateScore() {
        scoreDisplay.textContent = score;
        autoClickButton.textContent = `Clic automatique (Coût : ${autoClickCost} points)`;
    }

    function autoClick() {
        if (score >= priceAutoClick) {
            score -= priceAutoClick
            priceAutoClick *= 3 // Augmenter coût
            rateAutoClick++
            updateScore();
            
            // Démarre le clic automatique
            setInterval(click, 1000) // 1000 ms = 1 sec.
        }
    }

    autoClickButton.addEventListener("click", autoClick);

    updateScore();

 */

})();

