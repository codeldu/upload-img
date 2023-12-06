let container = document.querySelector('.main');

fetch('http://localhost:3000/api').then(res => res.json())
.then(data=>{console.log(data);
   data.forEach(element => {
        container.innerHTML +=`
        <div class="card">
        <p>${element.name}</p>
        <img src="${element.photo}" width="200" height="200">
    </div>
        `
   });
})