import Board from "./board";

class JobDialog extends HTMLDialogElement {
  app: Application;

  constructor(app: Application) {
    super();

    this.app = app;

    this.onclose = () => {
      const name = this.querySelector("#name") as HTMLInputElement;
      const notes = this.querySelector("#notes") as HTMLTextAreaElement;
      const stage = this.querySelector("#stage") as HTMLSelectElement;
      const appliedDate = this.querySelector(
        "#appliedDate"
      ) as HTMLInputElement;

      this.remove();
    };

    this.onclick = (event) => {
      const rect = this.getBoundingClientRect();
      const target = event.target as Element;

      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        if (!target.closest("select")) {
          this.close();
        }
      }
    };

    this.render();
  }

  render() {
    const board = document.querySelector("job-board") as Board;
    this.classList.add("job-dialog");
    const appliedDate = this.getDate(this.app.appliedDate);
    const lastAction = this.getDate(this.app.lastAction);

    this.innerHTML = /*html*/ `
      <button id="close" aria-label="close">X</button>
      <input readonly id="name"  value="${this.app.name}" />
      <label for="notes">Notes</label>
      <textarea readonly id="notes">${this.app.notes}</textarea>

      <label for="stage">stage</label>
      <select id="stage">
        ${[...board.divided_apps.keys()]
          .map((stage) => `<option value="${stage}">${stage}</option>`)
          .join("")}
      </select>

      <label for="appliedDate">Applied on</label>
      <input type="date" id="appliedDate" value="${appliedDate}" />

      <label for="lastAction">Last action</label>
      <input type="date" id="lastAction" value="${lastAction}" />
    `;

    const name = this.querySelector("#name") as HTMLInputElement;
    const notes = this.querySelector("#notes") as HTMLTextAreaElement;

    name.onclick = () => (name.readOnly = false);
    notes.onclick = () => (notes.readOnly = false);

    const stage = this.querySelector("#stage") as HTMLSelectElement;
    stage.value = this.app.stage;

    const close = this.querySelector("#close") as HTMLButtonElement;
    close.onclick = () => this.close();
  }

  getDate(unix_timestamp: number) {
    const tzOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
    const date = new Date(unix_timestamp * 1000 - tzOffset); // Apply the timezone offset

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }

  toUnixTimestamp(dateString: string): number {
    const date = new Date(dateString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    const unixTimestamp = Math.floor((date.getTime() + tzOffset) / 1000);

    return unixTimestamp;
  }
}

if (!customElements.get("job-dialog")) {
  customElements.define("job-dialog", JobDialog, { extends: "dialog" });
}

export default JobDialog;