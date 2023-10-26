(() => {

    let score = 0; 
    let priceMultiplicator = 10; // Prix du multiplicator
    let multiplicator = 0; // Niveau du multiplicator
    let boostActive = false; // Aggiunto flag per gestire il booster
    let countdown; // Variabile per il countdown del booster
    let lvlBooster = 0; // Niveau du booster
    let boostPrice = 50; // Prix du boost

    document.getElementById("score").innerHTML = score;
    document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;
    document.getElementById("cost-booster").innerHTML = boostPrice;

    // GDPR - Cookies //////////////////////////////////////////////////////////////
    const gdprModal = document.getElementById("gdprModal");
    const overlay = document.getElementById("overlay");
    const acceptButton = document.getElementById("acceptButton");

    // Check if the user has previously accepted the GDPR
    const hasAcceptedGDPR = localStorage.getItem("gdprAccepted");

    overlay.style.display = "block";
    gdprModal.style.display = "block";

    acceptButton.addEventListener("click", () => {
        // Hide the modal and overlay
        gdprModal.style.display = "none";
        overlay.style.display = "none";

        // Set a local storage flag to remember the user's consent
        localStorage.setItem("gdprAccepted", "true");
    });
    // COOKIE-CLICKER //////////////////////////////////////////////////////////////
    document.getElementById('btn-cookieClicker').addEventListener('click', function () {
        // Condition pour faire en sorte que le multiplicateur fonctionne sur le cookie.
        if (multiplicator > 0) {
            if(boostActive){
                // Si le multiplicator est déjà activé précédement et que le boost est activé
                score += 1 * (multiplicator * 2)*5;

            }
            else{
                score += 1 * (multiplicator * 2);
            }
            
        }
        else if(boostActive){
            // Boutton Cookie si le boost est activé sans le multiplicator
            score += 5;
        }
        else {
            score += 1;
        }

        // Mettez à jour le contenu des éléments
        document.getElementById('score').textContent = score;
    });

    // MULTIPLICATOR //////////////////////////////////////////////////////////////
    document.getElementById("btn-multiplicator").addEventListener("click", () => {
        if (score >= priceMultiplicator) {
            score -= priceMultiplicator;
            priceMultiplicator *= 2;
            multiplicator +=1;

            // Mettez à jour le contenu des éléments
            document.getElementById("score").innerHTML = score;
            document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;
            document.getElementById("lvl-multiplicator").innerHTML = multiplicator;
        } else {
            alert("Vous n'avez pas assez de crédits");
        }
    });

    // AUTOCLICK //////////////////////////////////////////////////////////////
    let priceAutoClicker = 50;
    let autoClicker = 0; // 1 clic par seconde
    let lvlAutoClicker = 0;

    document.getElementById('cost-autoClicker').innerHTML = priceAutoClicker;

    function click() {
        score += autoClicker;
        document.getElementById('score').textContent = score;
    }

    document.getElementById('btn-autoClicker').addEventListener('click', () => {
        if (score >= priceAutoClicker) {
            score -= priceAutoClicker;
            priceAutoClicker *= 3; // Augmente le coût 
            autoClicker++;

            // Démarre le clic automatique
            setInterval(click, 1000); // 1000 ms = 1 sec.

            // Mettez à jour le contenu des éléments
            document.getElementById('score').innerHTML = score;
            document.getElementById('cost-autoClicker').innerHTML = priceAutoClicker;
            document.getElementById("lvl-autoClicker").innerHTML = autoClicker;
        } else {
            alert("Vous n'avez pas assez de crédits");
        }
    });

    // BOOSTER //////////////////////////////////////////////////////////////
    document.getElementById('btn-booster').addEventListener('click', function() {
        if (!boostActive && score >= boostPrice) { // Vérifie si le booster n'est pas déjà actif et si le score est suffisant
            boostActive = true;
            score -= boostPrice; // Soustrait le coût du booster du score
            boostPrice *= 2;
            lvlBooster++;
            document.getElementById("cost-booster").innerHTML = boostPrice;
            document.getElementById("lvl-booster").innerHTML = lvlBooster;
            document.getElementById("score").innerHTML = score;
            // Active le booster
            let seconds = 30; // Définis le temps du booster à 30 secondes

            // Lance le compte à rebours
            countdown = setInterval(function() {
                seconds--;

                // Met à jour l'affichage du timer
                document.getElementById("timer-booster").innerHTML = seconds;

                if (seconds <= 0) {
                    clearInterval(countdown); // Arrête le compte à rebours à la fin
                    boostActive = false; // Désactive le booster
                    document.getElementById("timer-booster").innerHTML = 0; // Met à jour l'affichage du timer à 0
                }
            }, 1000);
        } 
        else{
            alert("pas assez de credits")
        }
    });

    // RAMDOM COOKIE /////////////////////////////////
    // Fonction pour créer une div aléatoire avec une image
    function createRandomDiv() {
        const div = document.createElement('div');
        div.className = 'little-cookie';
        div.style.left = Math.random() * (window.innerWidth - 20) + 'px';
        div.style.top = Math.random() * (window.innerHeight - 20) + 'px';
  
        // Supprimer div au click + enlève 1 point au score
        div.addEventListener('click', () => {
          div.remove();
          score -= 1;
          document.getElementById('score').innerHTML = score;

        });
  
        const img = document.createElement('img');
        img.src = "img/cookie.png"; 
        img.style.width = '100%';
        img.style.height = '100%';
        div.appendChild(img);
        document.body.appendChild(div);
        
    }
    // Fonction pour créer un Cookie Joker
    function createGolden(createRandomDiv) {
        const div = document.createElement('div');
        div.className = 'golden-cookie';
        div.style.left = Math.random() * (window.innerWidth - 20) + 'px';
        div.style.top = Math.random() * (window.innerHeight - 20) + 'px';
  
        // Supprimer div au click + enlève 1 point au score
        div.addEventListener('click', () => {
          div.remove();
          deleteAllLittleCookie();
          score *= 2;
          document.getElementById('score').innerHTML = score;
        });
  
        const img = document.createElement('img');
        img.src = "img/dog-biscuit.png";
        img.style.width = '100%';
        img.style.height = '100%';
        div.appendChild(img);
        document.body.appendChild(div);
    }
    // Fonction pour supprimer tout les div de class little-cookie
    function deleteAllLittleCookie() {
        const littleCookies = document.querySelectorAll('.little-cookie');
        littleCookies.forEach(function (cookie) {
          cookie.remove();
        });
    }
    // Apparition little cookie et golden cookie 
    document.getElementById('btn-cookieClicker').addEventListener('click', function() {
        let chance = 7;
        const nombreRandom = Math.floor(Math.random() * 50) + 1; // 1 chance sur 50;
        if(nombreRandom == 7){
            createGolden();
        }
        else{
            createRandomDiv();
        }
    });


    /////CURSOR CHANGEMENT////////
    document.getElementById('acceptButton').addEventListener('click', function() {
        const cursor = document.querySelector('.custom-cursor');
        cursor.style.display = "block"; // CHANGE LE CURSOR IN DISPLAY BLOCK 

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = `${e.clientX - 25}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    //HOVER TEXT////////////////////////
    document.addEventListener('DOMContentLoaded', function() {
        const btnBooster = document.getElementById('btn-booster');
        const scoreSpan = document.getElementById('score');

        btnBooster.addEventListener('mouseover', function() {
          scoreSpan.textContent = 'Nuovo Contenuto'; // "Changer le contenu de la balise span au survol"
        });

        btnBooster.addEventListener('mouseout', function() {
          scoreSpan.textContent = score ; //"Rétablir le contenu d'origine de la balise span à la sortie de la souris"
        });
      });
      document.addEventListener('DOMContentLoaded', function() {
        const btnBooster = document.getElementById('btn-multiplicator');
        const scoreSpan = document.getElementById('score');

        btnBooster.addEventListener('mouseover', function() {
          scoreSpan.textContent = 'contenuto due ';//"Changer le contenu de la balise span au survol"
        });

        btnBooster.addEventListener('mouseout', function() {
          scoreSpan.textContent = score; // "Rétablir le contenu d'origine de la balise span à la sortie de la souris"
        });

      });

      document.addEventListener('DOMContentLoaded', function() {
        const btnBooster = document.getElementById('btn-autoClicker');
        const scoreSpan = document.getElementById('score');

        btnBooster.addEventListener('mouseover', function() {
          scoreSpan.textContent = 'contenuto tre '; //"Changer le contenu de la balise span au survol"
        });

        btnBooster.addEventListener('mouseout', function() {
          scoreSpan.textContent = score; // "Rétablir le contenu d'origine de la balise span à la sortie de la souris"
        });
      });


})();