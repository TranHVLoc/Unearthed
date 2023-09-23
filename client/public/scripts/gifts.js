const renderGifts = async () => {
    // Fetch all gifts from the server
    const response = await fetch('/gifts')
    const data = await response.json()

    // Get the main content element
    const mainContent = document.getElementById('main-content')

    if (data) {
        // Loop through the gifts and create a card for each gift
        data.map(gift => {
            // Create a div element with the class 'card'
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            // Create an image element on the upper container
            topContainer.style.backgroundImage = `url(${gift.image})`

            // Create a h3 element with the gift name on the bottom container
            const name = document.createElement('h3')
            name.textContent = gift.name
            bottomContainer.appendChild(name)

            // Create a p element with the gift description on the bottom container
            const pricePoint = document.createElement('p')
            pricePoint.textContent = 'Price: ' + gift.pricePoint
            bottomContainer.appendChild(pricePoint)

            // Create a p element with the gift description on the bottom container
            const audience = document.createElement('p')
            audience.textContent = 'Great For: ' + gift.audience
            bottomContainer.appendChild(audience)

            // Creat a link element
            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/gifts/${gift.id}`
            bottomContainer.appendChild(link)

            // Append the top and bottom containers to the card
            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })
    }
    else {
        // If there are no gifts, display a message
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
    }
}

const renderGift = async () => {
    // Get the gift id from the url
    const requestedID = parseInt(window.location.href.split('/').pop())

    // Fetch the gift from the server
    const response = await fetch('/gifts')
    const data = await response.json()

    // giftContent that points to the element with ID 'gift-content'
    const giftContent = document.getElementById('gift-content')

    // Find the gift with the requested id
    let gift = data.find(gift => gift.id === requestedID)
    // Conditionally render the gift based on whether it was found
    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
        document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
        document.getElementById('audience').textContent = 'Great For: ' + gift.audience
        document.getElementById('description').textContent = gift.description
        document.title = `UnEarthed - ${gift.name}`
    } else {
        const message = document.createElement('h2')
        message.textContent = 'Gift Not Available 😞'
        giftContent.appendChild(message)
    }
}

const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl && isNaN(parseInt(requestedUrl))) {
    window.location.href = '../404.html'
} else if (requestedUrl) {
    renderGift()
} else {
    renderGifts()
}
