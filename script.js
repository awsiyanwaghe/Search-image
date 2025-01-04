const acceskey = "xmXPG9DCDAG2navWkCAiPJ762m7A_782GFKKZVU6wDc"

const formel = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchresults = document.querySelector(".search-results")
const showmore = document.getElementById("show-more-button")

let inputdata = ""
let page = 1

async function searchimages() {
    inputdata = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${acceskey}` // fixed URL
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    if (page === 1) {
        searchresults.innerHTML = "" // clear previous results
    }

    results.map((result) => { // Use 'result' instead of 'results'
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('search-result')

        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description || "Image" // fixed typo: alt_description

        const imagelink = document.createElement('a')
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description || "View Image" // fixed typo

        // Append elements to the imageWrapper
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imagelink)

        // Append imageWrapper to the searchresults
        searchresults.appendChild(imageWrapper)
    })

    page++

    if (page > 1) {
        showmore.style.display = "block"
    }
}

formel.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1
    searchimages()
})

showmore.addEventListener("click", () => {
    searchimages()
})
