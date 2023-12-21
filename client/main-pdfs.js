// Declare a new function named search
async function search() {
    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;
    // empty the input field
    document.forms.searchForm.term.value = '';
    // read the json
    let rawData = await fetch('/api/pdfs/' + searchTerm);
    // convert json to a javascript data structure
    let pdfs = await rawData.json();
    // create an variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${pdfs.length} results.</p>
    `;
    // loop through the pdfs
    for (let pdf of pdfs) {
      let meta = pdf.pdfsDescription.info;
      console.log(pdf.pdfsName);
      html += `
        <section>
          <h2>${meta.Title}</h2>
          <p><b>Author:</b>${meta.Author}</p>
          <p><b>Creator:</b>${meta.Creator}</p>
            <a href="pdfs/${pdf.pdfsName}">Download the PDF</a>.
        </section>
      `;
    }
    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');
    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }
  