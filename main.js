(() => {
  const space = '_';
  
  let chosenWord = prompt('Πληκτρολογίστε μία λέξη για την κρεμάλα: ');

  let wordThing = document.createElement('h2');

  for (var i = 0; i < chosenWord.length; i++) {
    wordThing.innerText += space;
    alert('done');
  }

  documnent.getElementById('periexomeno').appendChild(wordThing);
})();
