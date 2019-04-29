const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

//FEATURE: render toy objects
const toyCollection = document.getElementById('toy-collection')
  //make div class='card' for each toy and add to toy div

  function renderToy(toy){
      let toyDiv = document.createElement('div');
      toyDiv.setAttribute('class', 'card');

      toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      Likes: <p>${toy.likes}</p>
      <button id=${toy.id} class="like-btn">Like <3</button>
      `;
      toyCollection.appendChild(toyDiv);
    };


  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => data.forEach((toy) => {
      renderToy(toy)
    }));


//FEATURE: add new toy
  const input = document.getElementsByClassName('input-text');
  const addForm = document.querySelector('.add-toy-form');
  //conditionally render to page?? VALIDATION???
  //render toy from input values
  addForm.addEventListener('submit',(e) => {
    let toyName = input[0].value;
    let toyImage = input[1].value;
    console.log(toyImage)

    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(data => renderToy(data));
  });

//FEATURE: add likes to a toy
  //conditionally increase toy like count: patch request to toys/:id
  const likeBtns = document.getElementsByClassName('like-btn')

  toyCollection.addEventListener('click',(e) => {
    if(e.target.className === 'like-btn'){
      console.log(e)
      let like = e.target.previousElementSibling
      let likeCount = parseInt(like.innerText)
      like.innerText = `${++likeCount}`

      fetch(`http://localhost:3000/toys/${e.target.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: likeCount
        })
      })
    }
  })


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
