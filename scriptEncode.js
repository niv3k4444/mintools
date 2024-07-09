function encode(){
    var toencode= document.getElementById('textIn').value;
    var encoded = btoa(toencode);
    document.getElementById('textOut').value = encoded;
}
