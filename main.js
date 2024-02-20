(() => {
  const space = '_';
  let contentsOfWord = '';
  
  let chosenWord = prompt('Πληκτρολογίστε μία λέξη για την κρεμάλα: ');

  let wordThing = document.createElement('h2');

  for (var i = 0; i < chosenWord.length; i++) {
    contentsOfWord += space;
  }

  wordThing.appendChild(document.createTextNode(contentsOfWord));
  documnent.getElementById('periexomeno').appendChild(wordThing);
})();
