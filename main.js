(() => {

    let music = {
        menu: new Howl({
            src: ['/hangman_menu.mp3'],
            loop: true
        }),
        level: new Howl({
            src: ['/hangman_theme.mp3'],
            loop: true
        })
    }

    // Global μεταβλητές
    let gameStarted = false;
    music.menu.play();

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
        music.menu.pause();

        // Δες αν ο χρήστης έδωσε λέξη
        chosenWord = removeRedundantSpaces(document.getElementById('wordInput').value);
        switch (true) {
            case chosenWord == '' || chosenWord == ' ':
                alert('Ρε φίλε πρέπει να δώσεις και μία κανονική λέξη..');
                return;
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
        music.level.play();
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
