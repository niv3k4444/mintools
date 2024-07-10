let light = true; 

function switchmode() {
    light = !light;
    localStorage.setItem("theme", light ? "light" : "dark");
    $("body").toggleClass("dark", !light); // Add or remove the 'dark' class based on the light mode
    updateLogo();
}

function updateLogo() {
    if (light) {
        document.getElementById('logo-light').style.display = 'block';
        document.getElementById('logo-dark').style.display = 'none';
    } else {
        document.getElementById('logo-light').style.display = 'none';
        document.getElementById('logo-dark').style.display = 'block';
    }
}

window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        light = savedTheme === "light";
    }
    document.getElementById('darkmode-toggle').checked = !light;
    $("body").toggleClass("dark", !light);
    updateLogo();
};


$(document).ready(function() {
    light = localStorage.getItem("theme") == "light";
    if (localStorage.getItem("theme") == "dark") {
        $("body").addClass("dark");
        document.getElementById('darkmode-toggle').checked = true;
    } else {
        $("body").removeClass("dark");
        document.getElementById('darkmode-toggle').checked = false;
    }
});

function duplicates() {
    const text = document.getElementById('text-in').value;
    const textArray = text.split("\n");
    const wordCount = {};
    textArray.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    const duplicates = Object.keys(wordCount).filter(word => wordCount[word] > 1);
    const singles = Object.keys(wordCount).filter(word => wordCount[word] === 1);
    document.getElementById('text-out1').value = duplicates;
    document.getElementById('text-out2').value = singles;
}

function encode64(){
    var toencode= document.getElementById('txt-in').value;
    var encoded = btoa(toencode);
    document.getElementById('txt-out').value = encoded;
}
function decode64() {
    var text = document.getElementById('txt-in').value;
    var result = atob(text);
    document.getElementById('txt-out').value = result;
}

function formatHtml() {
    const inputText = document.getElementById('txt-in').value;
    if (!inputText.trim()) {
        document.getElementById('txt-out').value = "Inserisci un testo HTML valido.";
        return;
    }
    const options = { indent_size: 2, space_in_empty_paren: true };
    const formattedHtml = html_beautify(inputText, options);
    document.getElementById('txt-out').value = formattedHtml;
}

function formatJson() {
    try {
        var inputJson = document.getElementById('txt-in').value;
        var json = JSON.parse(inputJson);
        var formatted = JSON.stringify(json, null, 4);
        document.getElementById('txt-out').value = formatted;
    } catch (e) {
        document.getElementById('txt-out').value = "Errore: Inserire JSON valido.";
    }
}

function lowerCase() {
    var text = document.getElementById("txt-in").value;
    var result = text.toLowerCase();
    document.getElementById('txt-out').value = result;
}

function upperCase() {
    var text= document.getElementById('txt-in').value;
    var result = text.toUpperCase();
    document.getElementById('txt-out').value = result;
}

function minJson() {
    var text= document.getElementById('txt-in').value;
    var result =JSON.stringify(JSON.parse(text));
    document.getElementById('textOut').value = result;
}

function minJS() {
    var text = document.getElementById('txt-in').value;
    var result = jsMinify(text);
    document.getElementById('txt-out').value = result;
}

function jsMinify(text) {
    return text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s{2,}/g, ' ').replace(/\n/g, '');
}

function photoViewer64() {
    var text = document.getElementById('txt-in').value;
    var imgElem = document.createElement('img');
    imgElem.setAttribute('src', "data:image/jpg;base64," + text);
    var imageContainer = document.getElementById('img-container');
    imageContainer.innerHTML = '';  
    imageContainer.appendChild(imgElem);
}

function encode3DES(){
    var toencode= document.getElementById('textIn').value;
    var encoded = btoa(toencode);
    document.getElementById('textOut').value = encoded;
}
function decode3DES() {
    var text = document.getElementById('textIn').value;
    var result = atob(text);
    document.getElementById('textOut').value = result;
}


function encodeDes() {
    var key = document.getElementById('key-in').value;
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var message = document.getElementById('txt-in').value;
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    document.getElementById('ext-out').value = encrypted.toString();
}


function decodeDes() {
    var key = document.getElementById('key-in').value;
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encryptedMessage = document.getElementById('txt-in').value;
    var decrypted = CryptoJS.DES.decrypt(encryptedMessage, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById('txt-out').value = plaintext;
}


function decodeJwt() {
    const token = document.getElementById('txt-in').value;

    function decode(token) {
        // Splitta il token per ottenere il payload.
        const base64Url = token.split('.')[1];
        // Rimpiazza i caratteri URL-friendly per ottenere una stringa in Base64 pulita.
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decodifica del base64, poi decodifica il risultato.
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return jsonPayload;
    }
    const decoded = decode(token);
    document.getElementById('txt-out').value = decoded;
}

function rsaEncode(){

}

function rsaDecode(){
    
}


function copyText() {
    var textarea = document.getElementById('txt-out');
    textarea.select();
    textarea.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(textarea.value).then(() => {
        var copybtn = document.querySelector(".btn-copy");
        copybtn.textContent = "Text copied!";
        setTimeout(function() {
            copybtn.textContent = "Copy";
        }, 2000);
    }).catch(err => {
        console.error("Errore durante la copia negli appunti: ", err);
    });
}
function copyText1() {
    var textarea = document.getElementById('txt-out-1');
    textarea.select();
    textarea.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(textarea.value).then(() => {
        var copybtn = document.querySelector(".btn-copy-1");
        copybtn.textContent = "Text copied!";
        setTimeout(function() {
            copybtn.textContent = "Copy";
        }, 2000);
    }).catch(err => {
        console.error("Errore durante la copia negli appunti: ", err);
    });
}
function copyText2() {
    var textarea = document.getElementById('txt-out-2');
    textarea.select();
    textarea.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(textarea.value).then(() => {
        var copybtn = document.querySelector(".btn-copy-2");
        copybtn.textContent = "Text copied!";
        setTimeout(function() {
            copybtn.textContent = "Copy";
        }, 2000);
    }).catch(err => {
        console.error("Errore durante la copia negli appunti: ", err);
    });
}
function beautyJs() {
    const inputText = document.getElementById('txt-in').value;
    try {
      const formattedCode = prettier.format(inputText, {
        parser: 'babel',
        semi: true,
        singleQuote: true
      });
      document.getElementById('txt-out').value = formattedCode;
    } catch (error) {
      console.error('Errore durante la formattazione:', error);
      document.getElementById('txt-out').value = 'Errore durante la formattazione:\n' + error.message;
    }
  }
