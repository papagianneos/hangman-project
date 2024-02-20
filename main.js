(() => {
    // Global μεταβλητές
    let gameStarted = false;

    const addToPage = (element) => {
        document.getElementById('periexomeno').appendChild(element);
    }

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

    const setup = () => {
        if (gameStarted) return;

        // Δες αν ο χρήστης έδωσε λέξη
        chosenWord = removeRedundantSpaces(document.getElementById('wordInput').value);
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
            wordThing.innerText += '_';
        }

        addToPage(wordThing);
        gameStarted = true;
    }

    // Πλαίσιο για να εισάγεται η λέξη στην αρχή.
    let chosenWord;

    let wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.id = 'wordInput';
    wordInput.placeholder = 'Εισάγετε μία λέξη εδώ..';
    wordInput.addEventListener('keypress', (e) => {
        if (e.keyCode == 27) document.getElementById('startButton').click();
    });

    // Play Button
    let startButton = document.createElement('button');
    startButton.appendChild(document.createTextNode('Play'));
    startButton.id = 'startButton';
    startButton.onclick = setup;

    addToPage(wordInput);
    addToPage(startButton);
})();
