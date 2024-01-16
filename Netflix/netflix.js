const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e) {
    removeBorder();
    removeTabContent();
    this.classList.add('tab-border');
    const tabContentItem = document.querySelector(`#${this.id}-content`); //this.id = tab-1, tab-2, tab-3
    tabContentItem.classList.add('show');
}

// Remove border
function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-border'));
}

// Remove tab content
function removeTabContent() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

// Add event listener
tabItems.forEach(item => item.addEventListener('click', selectItem));