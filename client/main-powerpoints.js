// Declare a new function named search
async function search() {

    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;

    // empty the input field
    document.forms.searchForm.term.value = '';

    // read the json
    let rawData = await fetch('/api/powerpoints/' + searchTerm);

    // convert json to a javascript data structure
    let powerpoints = await rawData.json();

    // create a variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${powerpoints.length} results.</p>
    `;

    // loop through the powerpoint
    for (let powerpoint of powerpoints) {
      let meta = powerpoint.description;
      console.log(meta.original)
      let site = meta.original.includes('http') ? meta.original.split('//')[1].split('/')[0]:meta.original;
      let link = 'https://' + site;
      html += `
        <section>
          <h2>${(powerpoint.description.title + '').slice(0,50)}</h2>
          
          <p><b>Company:</b>${powerpoint.description.company}</p>

          <p><b>Date of Creation:</b>${powerpoint.description.creation_date.split('T')[0]}</p>

          <p><a href="powerpoints/${powerpoint.name}">Download the PowerPoint</a>.</p>
          
        </section>
      `;
    }
    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');

    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }
  