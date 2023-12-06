let inpName = document.querySelector('#name');
let inpFile = document.querySelector('#file');
let sendButton = document.querySelector('#send');

sendButton.addEventListener('click', () => {

    let name = inpName.value;
    let file = inpFile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

        console.log(reader);
        let obj = {
            name: name,
            photo: reader.result
        };

        fetch('http://localhost:3000/api',
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json()).then(data=>console.log(data))
    }







})