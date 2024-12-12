/*//////////////////////////////////////////////////////////////
    Navigation Bar Toggle for Home Page
//////////////////////////////////////////////////////////////*/

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('#nav-bar');

    menuToggle.addEventListener('click', () => {
        navBar.classList.toggle('active'); // Toggle the 'active' class on click
    });
});


/*//////////////////////////////////////////////////////////////
    FAQ Accordion Button
//////////////////////////////////////////////////////////////*/
const allAccordionButton = [firstAccordionButton, secondAccordionButton, thirdAccordionButton, fourthAccordionButton, fifthAccordionButton, sixthAccordionButton];
const allAccordionContent = [firstAccordionContent, secondAccordionContent, thirdAccordionContent, fourthAccordionContent, fifthAccordionContent, sixthAccordionContent];

allAccordionButton.forEach((button, index) => {
    button.addEventListener('click', () => {
        allAccordionContent.forEach((content, contentIndex) => {
            if(contentIndex != index) {
                content.classList.remove("active");
            }
        });

        allAccordionContent[index].classList.toggle("active");
    });
})
