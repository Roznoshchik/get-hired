import JobDialog from "./dialog";
class JobCard extends HTMLElement {
  app: Application;

  constructor(app: Application, classes: string[] = []) {
    super();

    this.app = app;

    for (let cls of classes) {
      this.classList.add(cls);
    }
    if (this.app.rejected) this.classList.add("rejected");

    this.setAttribute('draggable', 'true')
    this.setAttribute('data-name', app.name)
    this.addEventListener('dragstart', (ev) => ev.dataTransfer?.setData('text/plain', app.name));
    this.onclick = () => {
      const dialog = new JobDialog(this.app);
      document.body.appendChild(dialog);
      dialog.showModal();
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
