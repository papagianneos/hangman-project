(() => {
  const space = '_';
  
  let chosenWord = prompt('Πληκτρολογίστε μία λέξη για την κρεμάλα: ');
  switch (true) {
    case chosenWord == '' || chosenWord == ' ':
        alert('Ρε φίλε πρέπει να δώσεις και μία κανονική λέξη..');
        break;
  }

  let wordThing = document.createElement('h2');
  wordThing.style.letterSpacing = '4px';
  wordThing.style.pointerEvents = 'none';

  for (var i = 0; i < chosenWord.length; i++) {
    wordThing.innerText += space;
  }

  document.getElementById('periexomeno').appendChild(wordThing);
})();
