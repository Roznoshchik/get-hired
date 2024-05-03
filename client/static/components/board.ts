import Column from "./column";

class Board extends HTMLElement {
  applications: Application[] = [];
  divided_apps: Map<ApplicationStage, Application[]> = new Map();

  constructor(applications: Application[]) {
    super();
    this.applications = applications;

    const all_stages: ApplicationStage[] = [
      "Waiting to apply",
      "Applied",
      "Interview scheduled",
      "Stage one - intro call",
      "Stage two - technical or team",
      "Stage three - cultural fit",
      "Waiting for offer",
      "Rejected",
      "Received offer",
      "Offer declined",
    ];

    all_stages.forEach((stage) => {
      if (!this.divided_apps.has(stage)) {
        this.divided_apps.set(stage, []);
      }
    });

    for (let app of this.applications) {
      const stage: ApplicationStage = app.stage;
      this.divided_apps.get(stage)?.push(app);
    }
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <div class="board">
      <h1>Lets Get Hired!</h1>
      <div class = "columns">
      </div>
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
