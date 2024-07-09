function duplicates() {
    const text = document.getElementById('text-in').value;
    const textArray = text.split("\n");
    const wordCount = {};
    textArray.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    const duplicates = Object.keys(wordCount).filter(word => wordCount[word] > 1);
    const singles = Object.keys(wordCount).filter(word => wordCount[word] === 1);
    document.getElementById('text-out1').value = 'Le parole ripetute sono: ' + duplicates.join(", ");
    document.getElementById('text-out2').value = 'Le parole non ripetuti sono: ' + singles.join(", ");
}
