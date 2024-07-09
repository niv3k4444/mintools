function decode() {
    var text = document.getElementById('text-in').value;
    var result = atob(text);
    document.getElementById('text-out').value = result;
}