(() => {
    let lives = 5;

    const music = {
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
    hintText.appendChild(document.createTextNode('Πατήστε το κουμπί «Play» ή πατήστε το πλήκτρο «Enter» για να αρχίσετε το παιχνίδι.'));

    const setup = () => {
        if (gameStarted) return;

        // Δες αν ο χρήστης έδωσε λέξη
        chosenWord = removeRedundantSpaces(document.getElementById('wordInput').value);
        if (chosenWord == '' || chosenWord == ' ' || chosenWord.length < 3) {
            alert('Ρε φίλε πρέπει να δώσεις μία κανονική λέξη..');
            return;
        }

        // ----------------------------------------------------------------------------------

        // =======================================================================
        // ANIMATION
        // =======================================================================
        let mainScreen = document.getElementById('mainScreen');
        mainScreen.style.transition = '1s';
        mainScreen.style.width = '100%';
        mainScreen.style.height = '100%';
        mainScreen.style.borderRadius = '0';

        let wordContentBox = document.getElementById('periexomeno');
        wordContentBox.style.transition = '1s';
        wordContentBox.style.width = '50%';
        wordContentBox.style.margin = '5px';
        wordContentBox.style.borderRadius = '5px';
        wordContentBox.style.backgroundColor = 'rgba(0, 0, 0, .15)';

        let hangmanImageBox = document.createElement('div');
        hangmanImageBox.id = 'hangmanImageBox';
        hangmanImageBox.className = 'box';
        hangmanImageBox.style.width = '50%';
        hangmanImageBox.style.margin = '5px';
        hangmanImageBox.style.borderRadius = '5px';
        hangmanImageBox.style.backgroundColor = 'black';

        document.getElementById('boxesHolder').style.display = 'flex'; // bug fix
        document.getElementById('boxesHolder').appendChild(hangmanImageBox);
        // =======================================================================

        // TO DO: Lives code
        let livesText = document.getElementById('livesText');
        livesText.innerText = `Lives: ${lives}`;
        livesText.classList.remove('hidden');

        // Δημιούργησε το μενού με τα κενά
        let wordThing = document.createElement('h2');
        wordThing.style.letterSpacing = '4px';
        wordThing.style.fontSize = '45px';
        wordThing.style.pointerEvents = 'none';

        // Εμφάνισε το πρώτο γράμμα.
        wordThing.innerText += chosenWord[0].toUpperCase();
        for (var i = 0; i < (chosenWord.length - 1); i++) {
            wordThing.innerText += '_';
        }

        removeFromPage(startButton);
        removeFromPage(wordInput);
        document.getElementById('boxesHolder').removeChild(hintText);
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
    // Play Button
    let startButton = document.createElement('button');
    startButton.appendChild(document.createTextNode('Play'));
    startButton.id = 'startButton';
    startButton.onclick = setup;
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) document.getElementById('startButton').click();
    });

    addToPage(wordInput);
    addToPage(startButton);
    document.getElementById('boxesHolder').appendChild(hintText);
})();
