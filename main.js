(() => {
    let clicks = 100000;
    let priceMultiplicator = 100;
    let lvlMultiplicator = 0;
    let priceAutoClick = 50;
    let lvlAutoClick = 0;
    let priceBoost = 500;
    let lvlBoost = 0;
    document.getElementById("target").innerHTML = clicks;
    document.getElementById("price").innerHTML = price;

    document.getElementById("multiplicator").addEventListener("click", () => {
        if(clicks >= priceMultiplicator){
            clicks -= price;
            price *= 2;
            lvl += 1;
            document.getElementById("target").innerHTML = clicks;
            document.getElementById("priceMultiplicator").innerHTML = price;
            document.getElementById("lvlMultiplicator").innerHTML = lvl;
        }
        else{
            alert("Vous n'avez pas assez de crédits");
        }
    });
    document.getElementById("autoClick").addEventListener("click", () => {
        if(clicks >= priceAutoClick){
            clicks -= price;
            price *= 2;
            lvl += 1;
            document.getElementById("target").innerHTML = clicks;
            document.getElementById("priceMultiplicator").innerHTML = price;
            document.getElementById("lvlMultiplicator").innerHTML = lvl;
        }
        else{
            alert("Vous n'avez pas assez de crédits");
        }
    });

})();