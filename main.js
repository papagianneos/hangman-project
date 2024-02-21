(() => {
    let lives = 6, alreadyGivenCharacters = [], secretWord = [];

    const ALLOWED_CHARACTERS = ' ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

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

    let gameLoop = () => {
        switch (true) {
            // Περίπτωση νίκης. (Βρέθηκε η λέξη)
            case !secretWord.includes('_'):
                window.cancelAnimationFrame(gameLoop);
                resetMenu();
                return;

            // Περίπτωση που έχασε ο παίχτης (όχι άλλες ζωές)
            case lives == 0:
                window.cancelAnimationFrame(gameLoop);
                resetMenu();
                return;
        }

        window.requestAnimationFrame(() => gameLoop());
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
    wordInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && !gameStarted) {
            document.getElementById('startButton').click();
        }
    });

    const resetMenu = () => {
        document.getElementById('livesText').className = 'hidden';
        let periexomenoSaved = document.getElementById('boxesHolder').children[1];
        document.getElementById('mainScreen').removeAttribute('style');
        document.getElementById('boxesHolder').replaceChildren(...[periexomenoSaved, hintText]);
        periexomenoSaved.removeAttribute('style');
        addToPage(wordInput);
        addToPage(startButton);
    }

    const setup = () => {
        if (gameStarted) return;

        // Αφαίρεση των διπλών κενών.
        chosenWord = removeRedundantSpaces(document.getElementById('wordInput').value.toLowerCase());

        // Δες για το μήκος ή απλά σκέτο κενό.
        if (chosenWord == '' || chosenWord == ' ' || chosenWord.length < 3) {
            alert('Ρε φίλε πρέπει να δώσεις μία κανονική λέξη..');
            return;
        }

        // Δες αν η λέξη περιέχει χαρακτήρα που δεν επιτρέπεται.
        for (var character_ of chosenWord.split('')) {
            if (!(ALLOWED_CHARACTERS.indexOf(character_) in ALLOWED_CHARACTERS)) {
                alert('Η λέξη πρέπει μόνο να περιέχει γράμματα ή αριθμούς.');
                return;
            }
        }

        chosenWord = chosenWord.split(''); // μετατροπή σε πίνακα/λίστα από string
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
        hangmanImageBox.style.backgroundColor = 'rgba(0, 0, 0, .15)';

        let hangmanImage = document.createElement('img');
        hangmanImage.src = '/hangman frames/hangman0.png';
        hangmanImageBox.appendChild(hangmanImage);

        let lettersThatNotInWordText = document.createElement('span');
        lettersThatNotInWordText.style.position = 'absolute';
        lettersThatNotInWordText.style.bottom = '100px';
        lettersThatNotInWordText.style.fontSize = '50px';
        lettersThatNotInWordText.id = 'notInWordThing';
        lettersThatNotInWordText.style.color = 'red';

        document.getElementById('boxesHolder').style.display = 'flex'; // bug fix
        document.getElementById('boxesHolder').appendChild(hangmanImageBox);

        mainScreen.appendChild(lettersThatNotInWordText);
        // =======================================================================

        // =======================================================================
        // Δες αν το πλήκτρο που πάτησε ο παίχτης είναι γράμμα της λέξης..
        // =======================================================================
        document.addEventListener('keydown', (e) => {
            if (!gameStarted) return;
            var keyNumber;
            if (window.event) {
                keyNumber = e.keyCode;
            }
            else if (e.which) keyNumber = e.which;

            var character = String.fromCharCode(keyNumber).toLowerCase(); // μετατροπή σε string

            // Αν είναι ο ίδιος χαρακτήρας με πριν μην κάνεις τίποτα.
            if (alreadyGivenCharacters.includes(character) || !(ALLOWED_CHARACTERS.indexOf(character) in ALLOWED_CHARACTERS)) return;

            // Αν είναι ο χαρακτήρας στην λέξη
            if (chosenWord.includes(character)) {
                for (var strIndex = 0; strIndex < chosenWord.length; strIndex++) if (character == chosenWord[strIndex]) {
                    secretWord[strIndex] = character;
                    secretWord[0] = secretWord[0].toUpperCase();
                    wordThing.innerText = ''; // reset
                    let word = '';
                    for (var letter of secretWord) word += letter;
                    wordThing.innerText = word;
                }
            }
            else {
                lives -= 1;
                let source;
                switch (lives) {
                    case 5:
                        source = 'hangman1';
                        break;
                    case 4:
                        source = 'hangman2';
                        break;
                    case 3:
                        source = 'hangman3';
                        break;
                    case 2:
                        source = 'hangman4';
                        break;
                    case 1:
                        source = 'hangman5';
                        break;
                    default:
                        source = 'hangman6';
                }
                hangmanImage.src = `/hangman frames/${source}.png`;
                document.getElementById('livesText').innerText = `Lives: ${lives}`;
                document.getElementById('notInWordThing').innerText += ` ${character.toUpperCase()} `;
            }

            alreadyGivenCharacters.push(character);
        });
        // =======================================================================

        let livesText = document.getElementById('livesText');
        livesText.innerText = `Lives: ${lives}`;
        livesText.classList.remove('hidden');

        // Δημιούργησε το μενού με τα κενά
        let wordThing = document.createElement('h2');
        wordThing.style.letterSpacing = '4px';
        wordThing.style.fontSize = '45px';
        wordThing.style.pointerEvents = 'none';

        // Εμφάνισε το πρώτο γράμμα.
        for (var i = 0; i < chosenWord.length; i++) secretWord.push('_');
        secretWord[0] = chosenWord[0].toUpperCase();
        let word = '';
        // Remove spaces
        for (var index2 = 0; index2 < chosenWord.length; index2++) {
            if (chosenWord[index2] == ' ') {
                secretWord[index2] = ' ';
            }
        }
        for (var letter of secretWord) word += letter;
        wordThing.innerText = word;

        removeFromPage(startButton);
        removeFromPage(wordInput);
        document.getElementById('boxesHolder').removeChild(hintText);
        addToPage(wordThing);
        gameStarted = true;
        music.menu.pause();
        music.level.play();
        // ---------------------------------------------------------------------------------------
        let listToShuffle = [];
        let parentDiv = document.getElementById('boxesHolder');

        // Για κάθε "παιδί" που έχει το cardsHolder/parentDiv
        for (var e = 0; e < parentDiv.children.length; e++) listToShuffle.push(parentDiv.children[e]);

        let temp = listToShuffle[0];
        listToShuffle[0] = listToShuffle[1];
        listToShuffle[1] = temp;

        parentDiv.replaceChildren(...listToShuffle);
        // ---------------------------------------------------------------------------------------
        window.requestAnimationFrame(gameLoop);
    } // end of setup
    startButton.onclick = setup; // bug fix

    addToPage(wordInput);
    addToPage(startButton);
    document.getElementById('boxesHolder').appendChild(hintText);
})();
