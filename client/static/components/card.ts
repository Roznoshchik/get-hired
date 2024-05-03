class JobCard extends HTMLElement {
  app: Application;

  constructor(app: Application, classes: string[] = []) {
    super();

    this.app = app;

    for (let cls of classes) {
      this.classList.add(cls);
    }

    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <span>${this.app.name}</span>
    `;
  }
}

if (!customElements.get("job-card")) {
  customElements.define("job-card", JobCard);
}

export default JobCard;
