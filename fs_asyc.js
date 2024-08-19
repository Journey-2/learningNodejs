const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const first = data;
    console.log("First file read")

    readFile('./content/second.txt', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const second = data;
        console.log("Second file read");
        

        writeFile('./content/second.txt', 'Naya', (err) => { 
            if (err) {
                console.error(err);
                return;
            }
            console.log(first.toString())
            console.log('File written successfully');
        });
    });
});
