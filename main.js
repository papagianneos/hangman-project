(() => {
    let lives = 5;

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

    const removeFromPage = (element) => {
        document.getElementById('periexomeno').removeChild(element);
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

    let hintText = document.createElement('span');
    hintText.appendChild(document.createTextNode('Πατήστε το κουμπί «Play» ή πατήστε το πλήκτρο «Enter» για να αρχίσετε το παιχνίδι.'))

    const setup = () => {
        if (gameStarted) return;

        // Δες αν ο χρήστης έδωσε λέξη
        chosenWord = removeRedundantSpaces(document.getElementById('wordInput').value);
        switch (true) {
            case chosenWord == '' || chosenWord == ' ':
                alert('Ρε φίλε πρέπει να δώσεις και μία κανονική λέξη..');
                return;
        }

        // TO DO: Lives code
        let livesText = document.createElement('span');
        livesText.innerText = `Lives: ${lives}`;

        // Δημιούργησε το μενού με τα κενά
        let wordThing = document.createElement('h2');
        wordThing.style.letterSpacing = '4px';
        wordThing.style.fontSize = '45px';
        wordThing.style.pointerEvents = 'none';

        for (var i = 0; i < chosenWord.length; i++) {
            wordThing.innerText += '_';
        }

        removeFromPage(startButton);
        removeFromPage(wordInput);
        document.getElementById('mainScreen').removeChild(hintText);
        addToPage(livesText);
        addToPage(wordThing);
        gameStarted = true;
        music.menu.pause();
        music.level.play();
    }

    // Πλαίσιο για να εισάγεται η λέξη στην αρχή.
    let chosenWord;

    let wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.id = 'wordInput';
    wordInput.placeholder = 'Εισάγετε μία λέξη εδώ..';
    wordInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) document.getElementById('startButton').click();
    });

    // Play Button
    let startButton = document.createElement('button');
    startButton.appendChild(document.createTextNode('Play'));
    startButton.id = 'startButton';
    startButton.onclick = setup;

    addToPage(wordInput);
    addToPage(startButton);
    document.getElementById('mainScreen').appendChild(hintText);
})();
