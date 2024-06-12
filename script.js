const magikBtn= document.getElementById('magikBtn');
const yesBtn= document.getElementById('yesBtn');
const yesWindow= document.getElementById('yes-window');
const container= document.querySelector('.container');
magikBtn.addEventListener('click', () => {
    // Get the window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get the button dimensions
    const btnWidth = magikBtn.offsetWidth;
    const btnHeight = magikBtn.offsetHeight;
    
    // Generate random positions within the window boundaries
    const randomX = Math.floor(Math.random() * (windowWidth - btnWidth));
    const randomY = Math.floor(Math.random() * (windowHeight - btnHeight));
    
    // Set the button's new position
    magikBtn.style.position = 'absolute';
    magikBtn.style.left = `${randomX}px`;
    magikBtn.style.top = `${randomY}px`;
});

yesBtn.addEventListener('click', () => {
    yesWindow.style.display='block';
    container.style.display='none';
});

yesWindow.addEventListener('click', () => {
    yesWindow.style.display='none';
    container.style.display='flex';
});