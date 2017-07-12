var bookArray = document.getElementsByClassName("book");

var settings = {
    distractionProbability: 1.0,
    distractionDistributionTop: 1,
    targetDistributionTop: 1,
    targetIdentity: 0.5,
};

placeBooks();

function placeBooks() {

    for (var i = 0; i < bookArray.length; i++) {
        bookArray[i].innerHTML = "|";
    }

    var target = Math.floor(Math.random() * bookArray.length);

    if (Math.random() < settings.targetDistributionTop) {
        target = Math.floor(Math.random() * 6);
    } else {
        target = 6 + Math.floor(Math.random() * 6);
    }

    if (Math.random() < settings.targetIdentity) {
        bookArray[target].innerHTML = "/";
    } else {
        bookArray[target].innerHTML = "\\";
    }

    if (Math.random() < settings.distractionProbability) {

        var distraction;

        if (Math.random() < settings.distractionDistributionTop) {
            // top
            distraction = Math.floor(Math.random() * 6);
            while (distraction == target) {
                distraction = Math.floor(Math.random() * 6);
            }
            bookArray[distraction].innerHTML = "-";
        } else {
            // bottom
            distraction = 6 + Math.floor(Math.random() * 6);
            while (distraction == target) {
                distraction = 6 + Math.floor(Math.random() * 6);
            }

            bookArray[distraction].innerHTML = "-";
        }

    }
}
