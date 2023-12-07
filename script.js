let container = document.querySelector('.main');
let modal = document.querySelector('.modalWrap');
let updInput = document.querySelector('#updateName');
let imageUpd = document.querySelector('#imageUpdate');
let updateButton = document.querySelector('#update');
let updFile = document.querySelector('#updateFile')

modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none'
    }
})

const update = (id) => {

    modal.style.display = "flex";

    fetch(`http://localhost:3000/api/${id}`)
        .then(res => res.json())
        .then(data => {
            updInput.value = data.name;

            imageUpd.src = data.photo;
        })

        updFile.addEventListener('input',(e)=>{
            imageUpd.src = e.target.value;
        })

    updateButton.addEventListener('click', () => {
        let name = updInput.value;
        let file = updFile.files[0];

        let obj = {name};


  
        if (file) {
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = function () {

                if (reader.result) {
                    obj.photo = reader.result;
                    
                }


              
         

                fetch(`http://localhost:3000/api/${id}`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(obj)
                    }).then(res => res.json()).then(data => console.log(data))

                // axios.patch(`http://localhost:3000/api/${id}`,obj)
                // .then(res=> console.log(res.data))
            }
        }else{
            fetch(`http://localhost:3000/api/${id}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            }).then(res => res.json()).then(data => console.log(data))
        }
    })


}



const getAllData = () => {
    fetch('http://localhost:3000/api').then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                container.innerHTML += `
        <div class="card">
        <p>${element.name}</p>
        <img src="${element.photo}" width="200" height="200">
        <button onclick='update(${element.id})'> UPDATE </button>
    </div>
        `
            });
        })
}

getAllData();