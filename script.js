let light = true; 

function switchmode() {
    light = !light;
    localStorage.setItem("theme", light ? "light" : "dark");
    $("body").toggleClass("dark", !light); // Add or remove the 'dark' class based on the light mode
    updateLogo();
}

function updateLogo() {
    if (light) {
        if(document.getElementById('logo-light')!= null){
            document.getElementById('logo-light').style.display = 'block';
        }
        if(document.getElementById('logo-dark')!=null){
            document.getElementById('logo-dark').style.display = 'none';
        }
    } else {
        if(document.getElementById('logo-light')!= null){
            document.getElementById('logo-light').style.display = 'none';
        }
        if(document.getElementById('logo-dark')!=null){
            document.getElementById('logo-dark').style.display = 'block';
        }
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
    const text = document.getElementById('txt-in').value;
    const textArray = text.split("\n");
    const wordCount = {};
    textArray.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    const duplicates = Object.keys(wordCount).filter(word => wordCount[word] > 1);
    const singles = Object.keys(wordCount).filter(word => wordCount[word] === 1);
    document.getElementById('txt-out-1').value = duplicates;
    document.getElementById('txt-out-2').value = singles;
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
    var result = JSON.stringify(JSON.parse(text));
    document.getElementById('txt-out').value = result;
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
    // TODO IF TXT STARTS WITH data:image/jpg;base64, DONT ADD IT
    if (!text.startsWith("data:image/jpg;base64,")){
        imgElem.setAttribute('src', "data:image/jpg;base64," + text);
    }else{
        imgElem.setAttribute('src', text);
    }
    
    var imageContainer = document.getElementById('img-container');
    imageContainer.innerHTML = '';  
    imageContainer.appendChild(imgElem);
}

function encode3DES(){
    var toencode= document.getElementById('txt-in').value;
    var encoded = btoa(toencode);
    document.getElementById('txt-out').value = encoded;
}
function decode3DES() {
    var text = document.getElementById('txt-in').value;
    var result = atob(text);
    document.getElementById('txt-out').value = result;
}


function encodeDes() {
    var key = document.getElementById('key-in').value;
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var message = document.getElementById('txt-in').value;
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    document.getElementById('txt-out').value = encrypted.toString();
}

function decodeDes() {
    var key = document.getElementById('key-in').value;
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encryptedMessage = document.getElementById('txt-in').value;
    
    try {
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(encryptedMessage)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        document.getElementById('txt-out').value = plaintext;
    } catch (e) {
        document.getElementById('txt-out').value = "Decryption failed. Check your key and input.";
    }
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

function rsaEncode() {
    var text = document.getElementById("txt-in").value;
    var publicKey = document.getElementById("public-key").value;

    if (publicKey.length === 0) {
        alert("Public key must not be empty.");
        return;
    }

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    var encrypted = encrypt.encrypt(text);
    if (!encrypted) {
        alert("Encryption failed. Please check the public key.");
        return;
    }

    document.getElementById("txt-out").value = encrypted;
}

function rsaDecode() {
    var text = document.getElementById("txt-in").value;
    var privateKey = document.getElementById("private-key").value;

    if (privateKey.length === 0) {
        alert("La chiave privata non può essere vuota.");
        return;
    }

    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);

    try {
        var decrypted = decrypt.decrypt(text);
        if (!decrypted) {
            alert("Errore durante la decodifica. Verifica la chiave privata.");
            return;
        }
        document.getElementById("txt-out").value = decrypted;
    } catch (error) {
        console.error("Errore durante la decodifica:", error);
        alert("Errore durante la decodifica. Controlla la console per ulteriori dettagli.");
    }
}


function copyText() {
    var textarea = document.getElementById('txt-out');
    textarea.select();
    textarea.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(textarea.value).then(() => {
        var copybtn = document.querySelector(".btn-copy");
        copybtn.textContent = "Copied!";
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
            plugins: prettierPlugins,
            semi: true,
            singleQuote: true
        });
        document.getElementById('txt-out').value = formattedCode;
    } catch (error) {
        console.error('Errore durante la formattazione:', error);
        document.getElementById('txt-out').value = 'Errore durante la formattazione:\n' + error.message;
    }
}

  function encode3DES() {
    var text = document.getElementById("txt-in").value;
    var key = document.getElementById("key-in").value;
    var iv = document.getElementById("iv-in").value;

    if (key.length !== 24 || iv.length !== 8) {
        alert("Key must be 24 characters long and IV must be 8 characters long.");
        return;
    }

    var keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.TripleDES.encrypt(text, keyUtf8, { iv: ivUtf8 });
    document.getElementById("txt-out").value = encrypted.toString();
}

function decode3DES() {
    var text = document.getElementById("txt-in").value;
    var key = document.getElementById("key-in").value;
    var iv = document.getElementById("iv-in").value;

    if (key.length !== 24 || iv.length !== 8) {
        alert("Key must be 24 characters long and IV must be 8 characters long.");
        return;
    }

    var keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

    var decrypted = CryptoJS.TripleDES.decrypt(text, keyUtf8, { iv: ivUtf8 });
    document.getElementById("txt-out").value = decrypted.toString(CryptoJS.enc.Utf8);
}

function encodeAES() {
    var text = document.getElementById("txt-in").value;
    var key = document.getElementById("key-in").value;
    var iv = document.getElementById("iv-in").value;

    if (key.length === 0 || iv.length === 0) {
        alert("Key and IV must not be empty.");
        return;
    }

    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
        alert("Key must be 16, 24, or 32 characters long.");
        return;
    }
    if (iv.length !== 16) {
        alert("IV must be 16 characters long.");
        return;
    }

    var keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(text, keyUtf8, {
        iv: ivUtf8,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    document.getElementById("txt-out").value = encrypted.toString();
}

function decodeAES() {
    var text = document.getElementById("txt-in").value;
    var key = document.getElementById("key-in").value;
    var iv = document.getElementById("iv-in").value;

    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
        alert("Key must be 16, 24, or 32 characters long.");
        return;
    }
    if (iv.length !== 16) {
        alert("IV must be 16 characters long.");
        return;
    }

    if (key.length === 0 || iv.length === 0) {
        alert("Key and IV must not be empty.");
        return;
    }

    try {
        var keyUtf8 = CryptoJS.enc.Utf8.parse(key);
        var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

        var decrypted = CryptoJS.AES.decrypt(text, keyUtf8, {
            iv: ivUtf8,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error("Decryption failed. Please check your input and try again.");
        }

        document.getElementById("txt-out").value = decryptedText;
    } catch (error) {
        alert("Decryption failed: " + error.message);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const base64Output = document.getElementById('txt-out');
    const encodeButton = document.getElementById('encodeButton');

    let selectedFile = null; // Variabile per memorizzare il file selezionato

    if(dropZone != null){
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                selectedFile = fileInput.files[0]; // Memorizza il file selezionato
                dropZone.textContent = selectedFile.name;
            }
        });
    
        dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropZone.classList.add('dragover');
        });
    
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });
    
        dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            dropZone.classList.remove('dragover');
            
            if (event.dataTransfer.files.length > 0) {
                selectedFile = event.dataTransfer.files[0]; // Memorizza il file rilasciato
                fileInput.files = event.dataTransfer.files;
                dropZone.textContent = selectedFile.name;
            }
        });
    
    }
    
    if(encodeButton != null){
        encodeButton.addEventListener('click', () => {
            if (selectedFile) {
                encodeFileToBase64(selectedFile);
            } else {
                alert('Seleziona un file prima di codificarlo.');
            }
        });
    
        function encodeFileToBase64(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; 
                base64Output.textContent = base64String;
            };
            reader.readAsDataURL(file);
        }
    }
    
});

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    xml.split('\r\n').forEach(function(node, index) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

function beautyXml() {
    var inputXml = document.getElementById('txt-in').value;
    var formattedXml = formatXml(inputXml);
    document.getElementById('txt-out').value = formattedXml;
}
function openOverlay() {
    $(".taskbar").addClass("active");
}
  
function closeOverlay() {
    $(".taskbar").removeClass("active");
}