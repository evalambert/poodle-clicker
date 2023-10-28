(() => {
  let score = parseInt(localStorage.getItem("score"), 10) || 0;
  let priceMultiplicator =
    parseInt(localStorage.getItem("priceMultiplicator"), 10) || 10; // Prix du multiplicator
  let multiplicator = parseInt(localStorage.getItem("multiplicator"), 10) || 0; // Niveau du multiplicator
  let boostActive = false; // Aggiunto flag per gestire il booster
  let countdown; // Variabile per il countdown del booster
  let lvlBooster = parseInt(localStorage.getItem("lvlBooster"), 10) || 0; // Niveau du booster
  let boostPrice = parseInt(localStorage.getItem("boostPrice"), 10) || 50; // Prix du boost
  let priceAutoClicker =
    parseInt(localStorage.getItem("priceAutoClicker"), 10) || 50; // Prix du Auto Click;
  let autoClicker = parseInt(localStorage.getItem("autoClicker"), 10) || 0; // Niveau du Auto Click
  let time = 0;
  let seconds = 30;

  document.getElementById("score").innerHTML = "COOKIE: " + score;
  document.getElementById("cost-multiplicator").innerHTML = priceMultiplicator;
  document.getElementById("lvl-multiplicator").innerHTML = multiplicator;
  document.getElementById("cost-booster").innerHTML = boostPrice;
  document.getElementById("lvl-booster").innerHTML = lvlBooster;
  document.getElementById("cost-autoClicker").innerHTML = priceAutoClicker;
  document.getElementById("lvl-autoClicker").innerHTML = autoClicker;

  // GDPR - Cookies //////////////////////////////////////////////////////////////
  const gdprModal = document.getElementById("gdprModal");
  const overlay = document.getElementById("overlay");
  const acceptButton = document.getElementById("acceptButton");
  // Instructions PopUp //////////////////////////////////////////////////////////
  const instructionModal = document.getElementById("bloc-instruction");
  const instructionClose = document.getElementById("close-instruction");
  // Game Over PopUp /////////////////////////////////////////////////////////////
  const gameOverModal = document.getElementById("bloc-game-over");
  const gameOverClose = document.getElementById("close-GameOver");

  // Check if the user has previously accepted the GDPR
  const hasAcceptedGDPR = localStorage.getItem("gdprAccepted");

  overlay.style.display = "block";
  gdprModal.style.display = "block";

  // Fermer le PopUp Cookie GDPR
  let interval;
  acceptButton.addEventListener("click", () => {
    gdprModal.style.display = "none";
    if (!interval) {
      interval = setInterval(updateTimer, 1000); // Mettre à jour le minuteur toutes les 1000 ms (1 seconde)
    }
    // Afficher le bloc d'instructions
    instructionModal.style.display = "block";
  });

  // Fermer le PopUp Instructions
  instructionClose.addEventListener("click", () => {
    instructionModal.style.display = "none";
    overlay.style.display = "none";
  });
  // COOKIE-CLICKER //////////////////////////////////////////////////////////////
  document
    .getElementById("btn-cookieClicker")
    .addEventListener("click", function () {
      // Condition pour faire en sorte que le multiplicateur fonctionne sur le cookie.
      if (multiplicator > 0) {
        if (boostActive) {
          // Si le multiplicator est déjà activé précédement et que le boost est activé
          updateScorePositive(1 * (multiplicator * 2) * 5);
        } else {
          updateScorePositive(1 * (multiplicator * 2));
        }
      } else if (boostActive) {
        // Boutton Cookie si le boost est activé sans le multiplicator
        updateScorePositive(5);
      } else {
        updateScorePositive(1);
      }

      // Mettez à jour le contenu des éléments
      document.getElementById("score").textContent = "COOKIE: " + score;
    });

  // MULTIPLICATOR //////////////////////////////////////////////////////////////
  document.getElementById("btn-multiplicator").addEventListener("click", () => {
    if (window.innerWidth >= 768) {
      // Code à exécuter lorsque la largeur de l'écran est supérieure ou égale à 768 pixels
      if (score >= priceMultiplicator) {
        updateScoreNegative(priceMultiplicator);
        updateMultiplicator();
      } else {
        alert("Vous n'avez pas assez de crédits");
      }
    } else {
      // Code à exécuter lorsque la largeur de l'écran est inférieure à 768 pixels
      if (score >= priceMultiplicator) {
        updateScoreNegative(priceMultiplicator);
        updateMultiplicatorMobile();
      } else {
        alert("Vous n'avez pas assez de crédits");
      }
    }
  });

  // AUTOCLICK //////////////////////////////////////////////////////////////

  function click() {
    score += autoClicker;
    localStorage.setItem("score", score);
    document.getElementById("score").textContent = "COOKIE: " + score;
  }

  document.getElementById("btn-autoClicker").addEventListener("click", () => {
    if (window.innerWidth >= 768) {
      if (score >= priceAutoClicker) {
        updateScoreNegative(priceAutoClicker);
        updateAutoClicker();
        // Démarre le clic automatique
        setInterval(click, 1000); // 1000 ms = 1 sec.
      } else {
        alert("Vous n'avez pas assez de crédits");
      }
    } else {
      if (score >= priceAutoClicker) {
        updateScoreNegative(priceAutoClicker);
        updateAutoClickerMobile();
        // Démarre le clic automatique
        setInterval(click, 1000); // 1000 ms = 1 sec.
      } else {
        alert("Vous n'avez pas assez de crédits");
      }
    }
  });

  // BOOSTER //////////////////////////////////////////////////////////////
  document.getElementById("btn-booster").addEventListener("click", function () {
    if (window.innerWidth >= 768) {
      if (boostActive) {
        alert("Attendre la fin du compteur");
      } else if (!boostActive && score >= boostPrice) {
        // Vérifie si le booster n'est pas déjà actif et si le score est suffisant
        boostActive = true;
        updateScoreNegative(boostPrice); // Soustrait le coût du booster du score
        UpdateBooster();
        // Active le booster
        document.getElementById("timer-booster").style.display = "block";
        // Lance le compte à rebours
        countdown = setInterval(function () {
          seconds--;

          // Met à jour l'affichage du timer

          document.getElementById("timer-booster").innerHTML = "00:" + seconds;
          if (seconds <= 0) {
            clearInterval(countdown); // Arrête le compte à rebours à la fin
            boostActive = false; // Désactive le booster
            document.getElementById("timer-booster").innerHTML = " "; // Met à jour l'affichage du timer
          }
        }, 1000);
      } else {
        alert("pas assez de credits");
      }
    } else {
      if (boostActive) {
        alert("Attendre la fin du compteur");
      } else if (!boostActive && score >= boostPrice) {
        // Vérifie si le booster n'est pas déjà actif et si le score est suffisant
        boostActive = true;
        updateScoreNegative(boostPrice); // Soustrait le coût du booster du score
        updateBoosterMobile();
        // Active le booster
        let seconds = 30; // Définis le temps du booster à 30 secondes
        // Lance le compte à rebours
        countdown = setInterval(function () {
          seconds--;
          document.getElementById("timer-mobile").innerHTML = "00:" + seconds;
          if (seconds <= 0) {
            clearInterval(countdown); // Arrête le compte à rebours à la fin
            boostActive = false; // Désactive le booster
          }
        }, 1000);
      } else {
        alert("pas assez de credits");
      }
    }
  });

  // RAMDOM COOKIE /////////////////////////////////
  // Fonction pour créer une div aléatoire avec une image
  function createRandomDiv() {
    const div = document.createElement("div");
    div.className = "little-cookie";
    div.style.left = Math.random() * (window.innerWidth - 20) + "px";
    div.style.top = Math.random() * (window.innerHeight - 20) + "px";

    // Supprimer div au click + enlève 1 point au score
    div.addEventListener("click", () => {
      div.remove();
      score -= 1;
      document.getElementById("score").innerHTML = "COOKIE: " + score;
    });

    const img = document.createElement("img");
    img.src = "img/cookie.png";
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);
    document.body.appendChild(div);
  }
  // Fonction pour créer un Cookie Joker
  function createGolden(createRandomDiv) {
    const div = document.createElement("div");
    div.className = "golden-cookie";
    div.style.left = Math.random() * (window.innerWidth - 20) + "px";
    div.style.top = Math.random() * (window.innerHeight - 20) + "px";

    // Supprimer div au click + enlève 1 point au score
    div.addEventListener("click", () => {
      div.remove();
      deleteAllLittleCookie();
      score *= 2;
      document.getElementById("score").innerHTML = "COOKIE: " + score;
    });

    const img = document.createElement("img");
    img.src = "img/dog-biscuit.png";
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);
    document.body.appendChild(div);
  }
  // Fonction pour supprimer tout les div de class little-cookie
  function deleteAllLittleCookie() {
    const littleCookies = document.querySelectorAll(".little-cookie");
    const goldCookies = document.querySelectorAll(".golden-cookie");
    littleCookies.forEach(function (cookie) {
      cookie.remove();
    });
    goldCookies.forEach(function (cookie) {
      cookie.remove();
    });
  }
  // Apparition little cookie et golden cookie
  document
    .getElementById("btn-cookieClicker")
    .addEventListener("click", function () {
      let chance = 7;
      const nombreRandom = Math.floor(Math.random() * 50) + 1; // 1 chance sur 50;
      if (nombreRandom == 7) {
        createGolden();
      } else {
        createRandomDiv();
      }
    });

  /////CURSOR CHANGEMENT////////
  document
    .getElementById("acceptButton")
    .addEventListener("click", function () {
      const cursor = document.querySelector(".custom-cursor");
      cursor.style.display = "block"; // CHANGE LE CURSOR IN DISPLAY BLOCK

      document.addEventListener("mousemove", function (e) {
        cursor.style.left = `${e.clientX - 25}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    });

  //HOVER TEXT////////////////////////
  document.addEventListener("DOMContentLoaded", function () {
    const btnBooster = document.getElementById("btn-booster");
    const scoreSpan = document.getElementById("score");

    btnBooster.addEventListener("mouseover", function () {
      scoreSpan.textContent = "BOOSTER"; // "Changer le contenu de la balise span au survol"
    });

    btnBooster.addEventListener("mouseout", function () {
      scoreSpan.textContent = "COOKIE: " + score; //"Rétablir le contenu d'origine de la balise span à la sortie de la souris"
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const btnBooster = document.getElementById("btn-multiplicator");
    const scoreSpan = document.getElementById("score");

    btnBooster.addEventListener("mouseover", function () {
      scoreSpan.textContent = "MULTIPLICATOR"; //"Changer le contenu de la balise span au survol"
    });

    btnBooster.addEventListener("mouseout", function () {
      scoreSpan.textContent = "COOKIE: " + score; // "Rétablir le contenu d'origine de la balise span à la sortie de la souris"
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const btnBooster = document.getElementById("btn-autoClicker");
    const scoreSpan = document.getElementById("score");

    btnBooster.addEventListener("mouseover", function () {
      scoreSpan.textContent = "AUTOCLICKER"; //"Changer le contenu de la balise span au survol"
    });

    btnBooster.addEventListener("mouseout", function () {
      scoreSpan.textContent = "COOKIE: " + score; // "Rétablir le contenu d'origine de la balise span à la sortie de la souris"
    });
  });

  // Bouton INFO ////////////////
  document.getElementById("btn-info").addEventListener("click", () => {
    overlay.style.display = "block";
    instructionModal.style.display = "block";
  });

  // Bouton Game Over ////////////////
  document.getElementById("btn-reset").addEventListener("click", () => {
    gameOverModal.style.display = "block";
    overlay.style.display = "block";
    document.getElementById("score-final").innerText = score;
    document.getElementById("temps-jeu").innerText = secondsToHMS(time);
    document.getElementById("autoClick-final").innerText = autoClicker;
    document.getElementById("multiplicator-final").innerText = multiplicator;
    document.getElementById("boost-final").innerText = lvlBooster;
    clearInterval(interval);
    interval = null;
  });
  function updateTimer() {
    time++;
  }
  function secondsToHMS(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    if (hours > 0) {
      return (
        heures + " heures " + minutes + " minutes " + seconds + " secondes"
      );
    } else if (minutes > 0) {
      return minutes + " minutes " + seconds + " secondes";
    } else {
      return seconds + " secondes";
    }
  }
  document.getElementById("close-GameOver").addEventListener("click", () => {
    gameOverModal.style.display = "none";
    overlay.style.display = "none";
    score = 0;
    autoClicker = 0;
    lvlBooster = 0;
    multiplicator = 0;
    boostPrice = 50;
    priceMultiplicator = 10;
    priceAutoClicker = 50;
    time = 0;
    boostActive = false;
    deleteAllLittleCookie();
    clearAll();
    if (!interval) {
      interval = setInterval(updateTimer, 1000); // Mettre à jour le minuteur toutes les 1000 ms (1 seconde)
    }
    document.getElementById("timer-booster").style.display = "none";
    document.getElementById("score").innerHTML = "COOKIE: " + score;
    document.getElementById("cost-autoClicker").innerHTML = priceAutoClicker;
    document.getElementById("lvl-autoClicker").innerHTML = autoClicker;
    document.getElementById("cost-multiplicator").innerHTML =
      priceMultiplicator;
    document.getElementById("lvl-multiplicator").innerHTML = multiplicator;
    document.getElementById("cost-booster").innerHTML = boostPrice;
    document.getElementById("lvl-booster").innerHTML = lvlBooster;
    document.getElementById("name-option").innerHTML = "NEW GAME";
    document.getElementById("timer-mobile").innerHTML = "00:00";
    document.getElementById("cost-mobile").innerHTML = "...";
    document.getElementById("lvl-mobile").innerHTML = "...";
  });

  // Score reste au reload de la page
  function updateScorePositive(add) {
    score += add;
    localStorage.setItem("score", score);
    document.getElementById("score").innerHTML = "COOKIE: " + score;
  }
  function updateScoreNegative(add) {
    score -= add;
    localStorage.setItem("score", score);
    document.getElementById("score").innerHTML = "COOKIE: " + score;
  }
  function updateMultiplicator() {
    multiplicator += 1;
    priceMultiplicator *= 2;
    localStorage.setItem("multiplicator", multiplicator);
    localStorage.setItem("priceMultiplicator", priceMultiplicator);
    document.getElementById("cost-multiplicator").innerHTML =
      priceMultiplicator;
    document.getElementById("lvl-multiplicator").innerHTML = multiplicator;
  }
  function updateMultiplicatorMobile() {
    multiplicator += 1;
    priceMultiplicator *= 2;
    localStorage.setItem("multiplicator", multiplicator);
    localStorage.setItem("priceMultiplicator", priceMultiplicator);
    document.getElementById("cost-mobile").innerHTML = priceMultiplicator;
    document.getElementById("lvl-mobile").innerHTML = multiplicator;
    document.getElementById("name-option").innerHTML = "MULTIPLICATOR";
    if (boostActive) {
      document.getElementById("timer-mobile").innerHTML = "00:" + seconds;
    } else {
      document.getElementById("timer-mobile").innerHTML = "00:00";
    }
  }
  function UpdateBooster() {
    lvlBooster += 1;
    boostPrice *= 2;
    localStorage.setItem("lvlBooster", lvlBooster);
    localStorage.setItem("boostPrice", boostPrice);
    document.getElementById("cost-booster").innerHTML = boostPrice;
    document.getElementById("lvl-booster").innerHTML = lvlBooster;
  }
  function updateBoosterMobile() {
    lvlBooster += 1;
    boostPrice *= 2;
    localStorage.setItem("lvlBooster", lvlBooster);
    localStorage.setItem("boostPrice", boostPrice);
    document.getElementById("cost-mobile").innerHTML = boostPrice;
    document.getElementById("lvl-mobile").innerHTML = lvlBooster;
    document.getElementById("name-option").innerHTML = "BOOSTER";
    document.getElementById("timer-mobile").innerHTML = "00:" + seconds;
  }
  function updateAutoClicker() {
    autoClicker += 1;
    priceAutoClicker *= 2;
    localStorage.setItem("autoClicker", autoClicker);
    localStorage.setItem("priceAutoClicker", priceAutoClicker);
    document.getElementById("cost-autoClicker").innerHTML = priceAutoClicker;
    document.getElementById("lvl-autoClicker").innerHTML = autoClicker;
  }
  function updateAutoClickerMobile() {
    autoClicker += 1;
    priceAutoClicker *= 2;
    localStorage.setItem("autoClicker", autoClicker);
    localStorage.setItem("priceAutoClicker", priceAutoClicker);
    document.getElementById("cost-mobile").innerHTML = priceAutoClicker;
    document.getElementById("lvl-mobile").innerHTML = autoClicker;
    document.getElementById("name-option").innerHTML = "Auto Click";
    if (boostActive) {
      document.getElementById("timer-mobile").innerHTML = "00:" + seconds;
    } else {
      document.getElementById("timer-mobile").innerHTML = "00:00";
    }
  }
  function clearAll() {
    localStorage.removeItem("score");
    localStorage.removeItem("multiplicator");
    localStorage.removeItem("priceMultiplicator");
    localStorage.removeItem("lvlBooster");
    localStorage.removeItem("boostPrice");
    localStorage.removeItem("autoClicker");
    localStorage.removeItem("priceAutoClicker");
  }
})();
