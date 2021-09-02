// variable declaration /////
const booksFound = document.getElementById('books-found');
const searchbooks = document.getElementById('display-books');

// searching books 
const searchButton = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    if(searchText === ''){
        // searching without inserting any value //
        booksFound.innerText = "Search Field Can Not Be Empty";
        searchbooks.textContent = '';
    }
   
    else{
        booksFound.innerText = "";
        // load data ////
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
    }
}


// display books/////////

const displayBooks = (books) => {
    // console.log(books);

    searchbooks.textContent = '';
   
    if(books.length === 0){
        //  no books available with the inserted keyword 
        booksFound.innerText = 'No Result Found';
    }
    else{
        // number of books found with the inserted keyword 
        booksFound.innerText=`Number of Results: ${books.length}`; 
    };
    
    books.forEach(book => {
        // console.log(book);
        // creating Element 
        const div = document.createElement('div');        
        div.classList.add('col');
        // elements value insertion 
        div.innerHTML= `
        <div class="card shadow-lg h-100" >
        <div class="card-body">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="image Not Found">
        <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">Author Name: ${book.author_name ? book.author_name: "Author Details Not Available"}</p>
                      <p class="card-text">First Publish Year: ${book.first_publish_year ? book.first_publish_year: "Publish Year Details Not Available"}</p>
                      <p class="card-text">Publisher: ${book.publisher ? book.publisher: "Publisher Details Not Available"}</p>
                    </div>
                  </div>
        `;
        searchbooks.appendChild(div);
    });

}
