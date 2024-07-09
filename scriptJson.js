function json() {
    try {
        var inputJson = document.getElementById('textIn').value;
        var json = JSON.parse(inputJson);
        var formatted = JSON.stringify(json, null, 4);
        document.getElementById('textOut').value = formatted;
    } catch (e) {
        document.getElementById('textOut').value = "Errore: Inserire JSON valido.";
    }
}
