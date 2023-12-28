// Declare a new function named search
async function search() {

    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;

    // empty the input field
    document.forms.searchForm.term.value = '';

    // read the json
    let rawData = await fetch('/api/photos/' + searchTerm);

    // convert json to a javascript data structure
    let photos = await rawData.json();

    // create a variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${photos.length} results.</p>
    `;

    // loop through the photos
    for (let photo of photos) {
        let meta = photo.description;
      html += `
        <section>

         <h2>${photo.name}</h2>

         <a href="https://maps.google.com/?q=${photo.description.latitude},${photo.description.longitude}" target="_blank"><img src="/images/${photo.name}"></a>

         <p><b>Source:</b> ${meta.FileSource}</p>

         <p><b>Picture Taken:</b> ${meta.CreateDate.split('T')[0]}</p> 

         <p><b>Longitude:</b> ${meta.longitude}</p>

         <p><b>Latitude:</b> ${meta.latitude}</p>
         
      </section>
      `;
    }

    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');
    
    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }
  


  