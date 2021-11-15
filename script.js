window.onload = () =>{
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(result =>{
        var list =document.querySelector("#pays");
            for(let option of result){
                let options = document.createElement("option");
                options.value= option.name.common;          
                list.appendChild(options);
              }
        })
        .catch(error => console.log('error', error));
        let valider = document.querySelector(".btn");
        valider.addEventListener("click", () =>{
        let pays= document.querySelector("#countries");
        if(pays.value !==""){       
            fetch(`https://restcountries.com/v3.1/name/${pays.value}?fullText=true`)
            .then(response => response.json())
            .then(json =>{ 
               let details = document.querySelector("#details");
                if(json.status === 404){
                    details.textContent = json.message;
                }else{
                    let country = json[0];
                    details.textContent="";
                    let capitale = document.createElement("p");
                    let population = document.createElement("p");
                    capitale.textContent = (country.capital) ? "Capitale: " + country.capital[0] : "pas de capitale";
                    population.textContent = (country.population) ? "Population: " + country.population : "pas de population";
                    details.appendChild(capitale);
                    details.appendChild(population);
                    let drapeau = document.createElement("p");
                    drapeau.innerHTML =`Drapeau : <img src ="${country.flags.svg}" alt="Drapeau de ${country.name.common}" width=100>`;
                    details.appendChild(drapeau);
                }   
            })
            .catch(error => console.log('error', error));
        }
        });
}

