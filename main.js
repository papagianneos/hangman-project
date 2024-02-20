(() => {
    // Συνάρτηση αφαίρεσης άχρηστων κενών
    const removeRedundantSpaces = str => {
        const searchTerm2 = "   ", // Triple spaces.
            searchTerm = "  ", // Double spaces.
            replaceTerm = " "; // Single space.
        let tmpStr = str,
            index = tmpStr.indexOf(searchTerm);

        while (index >= 0) {
            tmpStr = tmpStr.replace(searchTerm, replaceTerm);
            index = tmpStr.indexOf(searchTerm);
        }

        return tmpStr;
    };

    const space = '_';

    let chosenWord;

    let wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.style.width = '100%';
    wordInput.placeholder = 'Εισάγετε μία λέξη εδώ..';
    wordInput.addEventListener('keypress', (e) => {
        if (e.keyCode == 27) {
            chosenWord = wordInput.value;
        }
    })

    // Δες αν ο χρήστης έδωσε λέξη
    switch (true) {
        case chosenWord == '' || chosenWord == ' ':
            alert('Ρε φίλε πρέπει να δώσεις και μία κανονική λέξη..');
            break;
    }

    // Δημιούργησε το μενού με τα κενά
    let wordThing = document.createElement('h2');
    wordThing.style.letterSpacing = '4px';
    wordThing.style.pointerEvents = 'none';

    for (var i = 0; i < chosenWord.length; i++) {
        wordThing.innerText += space;
    }



    document.getElementById('periexomeno').appendChild(wordThing);
})();
