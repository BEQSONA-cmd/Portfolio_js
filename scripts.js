function myFunction() {
    var button = document.querySelector('.dark')
    var body = document.body;
    var currentColor = window.getComputedStyle(body, null).getPropertyValue('background-color');

    if (currentColor === 'rgb(26, 26, 26)' || currentColor === '#1a1a1a') {
        body.style.backgroundColor = 'white';
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        button.textContent = 'Dark Mode';
    } else {
        body.style.backgroundColor = '#1a1a1a';
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        button.textContent = 'Light Mode';
    }
}

