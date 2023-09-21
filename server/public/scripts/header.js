// Create a variable for the header element
const header = document.querySelector('header');

// Create a variable for the header-container element
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

//-------------------- Header Left --------------------//
// Create a variable for the header-left element
const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

// Create an image element for the header logo
const headerLogo = document.createElement('img');
headerLogo.src = '/logo.png';
headerLogo.alt = 'Unearthed Logo';
headerLogo.width = '100';
header

// Create a variable for title
const headerTitle = document.createElement('h1');
headerTitle.textContent = 'Unearthed';

// Append to the left container
headerLeft.appendChild(headerLogo);
headerLeft.appendChild(headerTitle);

//-------------------- Header Right --------------------//
const headerRight = document.createElement('div');
headerRight.className = 'header-right';

// Create a button element
const headerButton = document.createElement('button');
headerButton.textContent = 'Home';
// Register a click event listener on the button that redirects to the root page
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/';
});

// Append to the right container
headerRight.appendChild(headerButton);

//-------------------- Append to Header --------------------//
// Append the left and right containers to the header container
headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);
// Append the header container to the header element
header.appendChild(headerContainer);
