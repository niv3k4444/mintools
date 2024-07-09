function formatHtml() {
    // Prendi il testo HTML dalla prima textarea
    const inputText = document.getElementById('textIn').value;
    
    // Verifica se il testo di input non è vuoto
    if (!inputText.trim()) {
        document.getElementById('textOut').value = "Inserisci un testo HTML valido.";
        return;
    }

    // Opzioni per la formattazione HTML
    const options = { indent_size: 2, space_in_empty_paren: true };

    // Formatta il testo HTML
    const formattedHtml = html_beautify(inputText, options);

    // Inserisci il testo formattato nella seconda textarea
    document.getElementById('textOut').value = formattedHtml;
}
