document.getElementById("btnBuscador").addEventListener("click", () => {
  const pokemonName = document.getElementById("buscador").value.toLowerCase();
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; 

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Pokémon no encontrado");
          }
          return response.json();
      })
      .then(data => {
          mostrarPokemon(data, resultadoDiv);
      })
      .catch(error => {
          console.error("Error:", error);
          resultadoDiv.innerHTML = "<p>Pokémon no encontrado.</p>";
      });
});

function mostrarPokemon(data, container) {
  // Generamos el contenido del Pokémon en HTML
  const pokemonHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; text-align: center; max-width: 300px; margin: auto;">
          <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}" style="width: 150px; height: 150px;">
          <p><strong>Altura:</strong> ${data.height / 10} m</p>
          <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
          <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
      </div>
  `;

  container.innerHTML = pokemonHTML;
}
