class UserCard extends HTMLElement {
  constructor() {
    // If you define a constructor, always call super() first as it is required by the CE spec.
    super();

    // Setup a click listener on <user-card>
    this.addEventListener('click', e => {
      this.toggleCard();
    });
  }

  toggleCard() {
    console.log("Element was clicked!");
  }
}

customElements.define('user-card', UserCard);
