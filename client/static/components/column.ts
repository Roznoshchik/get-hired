import JobCard from "./card";
import Board from "./board";

class Column extends HTMLElement {
  stage: ApplicationStage;
  apps: Application[];

  constructor(
    stage: ApplicationStage,
    apps: Application[],
    classes: string[] = []
  ) {
    super();
    this.stage = stage;
    this.apps = apps;

    this.setAttribute("data-stage", stage);
    this.setClasses(classes);
    this.addListeners();
    this.render();
  }

  addListeners() {
    this.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
        this.classList.add("dragover");
      }
    });

    this.addEventListener("dragleave", (event) => {
      this.classList.remove("dragover");
    });

    this.addEventListener("drop", (event) => {
      event.preventDefault();
      this.classList.remove("dragover");
      if (event.dataTransfer) {
        const appName = event.dataTransfer.getData("text");
        const board = document.querySelector("job-board") as Board;

        const targetApp = board.applications.filter(
          (app) => app.name == appName
        )[0];

        const targetElem = document.querySelector(
          `job-card[data-name="${appName}"]`
        );

        if (!targetApp || !targetElem) {
          console.error(
            `Missing app or elem. App = ${targetApp} elem = ${targetElem}`
          );
          return;
        }

        const prevStage = document.querySelector(
          `stage-column[data-stage="${targetApp.stage}"]`
        ) as Column;

        prevStage.apps = prevStage.apps.filter((app) => app != targetApp);
        targetApp.stage = this.stage;
        this.apps.push(targetApp);
        this.appendChild(targetElem);
      }
    });
  }

  setClasses(classes: string[]) {
    for (let cls of classes) {
      this.classList.add(cls);
    }
  }

  render() {
    this.innerHTML = /*html*/ `
    <h2>${this.stage}</h2>
    `;

    const apps = this.apps.map((app) => new JobCard(app, ["card"]));
    this.append(...apps);
  }
}

if (!customElements.get("stage-column")) {
  customElements.define("stage-column", Column);
}

export default Column;
