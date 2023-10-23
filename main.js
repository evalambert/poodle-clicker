(() => {
    let clicks = 100000;
    let priceMultiplicator = 200;

    // Sélectionnez les éléments par leur ID, pas par leur classe
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("costMultiplicator").innerHTML = priceMultiplicator;

    document.getElementById("multiplicator").addEventListener("click", () => {
        if (clicks >= priceMultiplicator) {
            clicks -= priceMultiplicator;
            priceMultiplicator *= 2;
            console.log("clicks : " + clicks + ", price : " + priceMultiplicator);

            // Mettez à jour le contenu des éléments
            document.getElementById("clicks").innerHTML = clicks;
            document.getElementById("costMultiplicator").innerHTML = priceMultiplicator;
        } else {
            alert("Vous n'avez pas assez de crédits");
        }
    });

})();