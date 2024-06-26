import Board from "./board";

class JobDialog extends HTMLDialogElement {
  app: Application;

  constructor(app: Application) {
    super();

    this.app = app;

    this.onclose = () => {
      const name = this.querySelector("#name") as HTMLInputElement;
      const notes = this.querySelector("#notes") as HTMLTextAreaElement;
      const pointsOfContact = this.querySelector("#pointsOfContact") as HTMLTextAreaElement;
      const stage = this.querySelector("#stage") as HTMLSelectElement;
      const appliedDate = this.querySelector(
        "#appliedDate"
      ) as HTMLInputElement;
      const lastAction = this.querySelector("#lastAction") as HTMLInputElement;
      const url = this.querySelector("#url") as HTMLInputElement;
      const rejected = this.querySelector("#rejected") as HTMLInputElement;
      const offerDeclined = this.querySelector("#offerDeclined") as HTMLInputElement;
      const usedCoverLetter = this.querySelector(
        "#usedCoverLetter"
      ) as HTMLInputElement;
      const coverLetterName = this.querySelector(
        "#coverLetterName"
      ) as HTMLInputElement;

      const updatedApp: Application = {
        id: this.app.id,
        name: name.value,
        notes: notes.value,
        pointsOfContact: pointsOfContact.value,
        stage: stage.value as ApplicationStage,
        appliedDate: appliedDate.value,
        lastAction: lastAction.value,
        url: url.value,
        rejected: rejected.checked,
        offerDeclined: offerDeclined.checked,
        usedCoverLetter: usedCoverLetter.checked,
        coverLetterName: coverLetterName.value,
      };

      const board = document.querySelector("job-board") as Board;
      board.updateApplication(this.app, updatedApp);

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

    this.innerHTML = /*html*/ `
      <button id="close" aria-label="close">X</button>
      <input type="text" readonly id="name"  value="${this.app.name}" />

      <label for="url">Url</label>
      <input readonly type="text" id="url" value="${this.app.url}"/>

      <label for="notes">Notes</label>
      <div class="textarea-wrapper">
        <textarea readonly id="notes">${this.app.notes}</textarea>
      </div>

      <label for="pointsOfContact">Points of contact</label>
      <div class="textarea-wrapper">
        <textarea readonly id="pointsOfContact">${
          this.app.pointsOfContact
        }</textarea>
      </div>

      <label for="stage">stage</label>
      <select id="stage">
        ${[...board.divided_apps.keys()]
          .map(
            (stage) =>
              `<option value="${stage}" ${
                stage == this.app.stage ? "selected" : ""
              }>${stage}</option>`
          )
          .join("")}
      </select>

      <label for="appliedDate">Applied on</label>
      <input type="date" id="appliedDate" value="${this.app.appliedDate}" />

      <label for="lastAction">Last action</label>
      <input type="date" id="lastAction" value="${this.app.lastAction}" />

      <label for="rejected">Rejected</label>
      <input type="checkbox" id="rejected" ${
        this.app.rejected ? "checked" : ""
      }/>

      <label for="offerDeclined">Offer declined?</label>
      <input type="checkbox" id="offerDeclined" ${
        this.app.rejected ? "checked" : ""
      }/>

      <label for="usedCoverLetter">Used cover letter</label>
      <input type="checkbox" id="usedCoverLetter" ${
        this.app.usedCoverLetter ? "checked" : ""
      }/>

      <label for="coverLetterName">Cover letter name</label>
      <input readonly type="text" id="coverLetterName" value="${
        this.app.coverLetterName
      }"/>
    `;

    const close = this.querySelector("#close") as HTMLButtonElement;
    close.onclick = () => this.close();

    const textareas = this.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.oninput = () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      };
      textarea.onclick = () => (textarea.readOnly = false);
    });

    const inputs = this.querySelectorAll<HTMLInputElement>("input[type='text']");
    inputs.forEach((input) => (input.onclick = () => (input.readOnly = false)));

  }

}

if (!customElements.get("job-dialog")) {
  customElements.define("job-dialog", JobDialog, { extends: "dialog" });
}

export default JobDialog;
