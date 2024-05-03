import Column from "./column";

class Board extends HTMLElement {
  applications: Application[] = [];
  divided_apps: Map<ApplicationStage, Application[]> = new Map([
    ["Waiting to apply", []],
    ["Applied", []],
    ["Interview scheduled", []],
    ["Stage one - intro call", []],
    ["Stage two - skills check", []],
    ["Stage three - cultural fit", []],
    ["Waiting for offer", []],
    ["Rejected", []],
    ["Received offer", []],
    ["Offer declined", []],
  ]);

  constructor(applications: Application[]) {
    super();
    this.applications = applications;

    for (let app of this.applications) {
      const stage: ApplicationStage = app.stage;
      this.divided_apps.get(stage)?.push(app);
    }
    this.classList.add('board')
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <h1>Lets Get Hired!</h1>
    <div class = "columns">
    </div>
    `;
    const columns = Array.from(
      this.divided_apps,
      ([stage, apps]) => new Column(stage, apps, ["column"])
    );

    this.querySelector(".columns")?.append(...columns);
  }
}

if (!customElements.get("job-board")) {
  customElements.define("job-board", Board);
}
export default Board;
