const fs = require('fs');
require('log-timestamp');
var file = 'OCRlog.log';
var child_process = require('child_process');


let fsWait = false;
let content;
fs.watch(file, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 2000);
        console.log(`${filename} file Changed`);
        fs.readFile(file, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;

            // Invoke the next step here however you like
            console.log(content);   // Put all of the code here (not the best solution)
            processFile();          // Or put the next step in a function and invoke it
        });

        function processFile() {
            writeHTML();
        }

        /* fs.writeFile(file, '', function(){
             console.log('deleted');
         })*/
    }

    function writeHTML() {
        let stringArray = content.split(';');

        let first_name = stringArray[2];
        let last_name = stringArray[3];
        let ic_number = stringArray[4];
        let birth_date = stringArray[6];
        let sex = stringArray[7];
        let scaned_at = stringArray[0];
        let valid_to = stringArray[5];
        let ic_type = stringArray[12];
        let country_code = stringArray[9];
        let htmlContent = `<b><h1>Hotel Antik</h1></b>Dlouhá 22, Praha 1, 110 00, Czech Republic` +
            `<table border=1 cellpadding=20 cellspacing=0 width=100% rules=groups>` +
            `<colgroup span=4 align=righ2>` +
            `<col align=left width=6%>` +
            `<col align=center width=25%>` +
            `<col align=right width=5%>` +
            `<col align=right2 width=25%>` +
            `<td>Family Name: <br>Příjmení:<td><b><h1>` +
            `${last_name}` +
           `</b></h1></td><td>First Name: <br>Jméno:<td><b><h1>`+
            `${ first_name}` +
        `</b></h1><tr><td>Date of Birth: <br>Datum narození:<td><b><h2>`+
        `${birth_date}`+
        `</b></h1></td><td>Citizenship: <br> Státní občanství:<td><b><h2>`+
        `${country_code}`+
        `</b></h2></td>`+
        `<tr><td>ID No.: <br>Číslo dokladu:<td><b><h2>`+
        `${ic_number}`+
        `</b></h2></td><td>ID Type: <br>Typ dokladu:<td><b><h2>` +
        `${ic_type}`+
        `</b></h2></td>`+
        `<tr><td>Valid No.: <br>Platnost dokladu:<td><b><h2>`+
        `${valid_to}`+
        `</b></h2></td><td>Scaned at: <br>Načteno v:<td><h4>`+
        `${scaned_at}`+
        `</h4></td>`+
        `</table>`+
        `Souhlasím / I agree <br> Se zpracováním osobních údajů pro marketingové účely /`+
`With the processing of personal data for marketing purposes. <br>Veškeré údaje jsou vyžadovány dle zák.č. 565/1990 a 290/2004 Sb. a je s nimi nakládáno v souladu se zák.č. 101/2000 Sb. /`+
 `All information is necessary for our law and all information will be used in compliance with our law.`+
 `<br>Ubytovaný host prohlašuje, že byl seznámen s ubytovacím řádem v dostatečném předstihu před poskytnutím služby. Orgánem vykonávajícím dohled nad ochranou spotřebitele a subjektem mimosoudního řešení spotřebitelských sporů je`+
 `<br> Česká obchodní inspekce, Štěpánská 15, Praha 2, 12000, email: adr@coi.cz, www.coi.cz <br><b>Děkujeme / Thank you</b>`;

        fs.writeFile('OCRlog.html', htmlContent, function () {
            console.log('written');
        })
    }

})
