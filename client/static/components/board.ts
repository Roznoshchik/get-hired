import Column from "./column";
import Statistics from "./statistics";

class Board extends HTMLElement {
  applications: Application[] = [];
  divided_apps: Map<ApplicationStage, Application[]> = new Map([
    ["Waiting to apply", []],
    ["Applied", []],
    ["Stage one - intro call", []],
    ["Stage two - skills check", []],
    ["Stage three - cultural fit", []],
    ["Reference check", []],
    ["Received offer", []],
  ]);

  constructor(applications: Application[]) {
    super();
    this.applications = applications;

    for (let app of this.applications) {
      const stage: ApplicationStage = app.stage;
      this.divided_apps.get(stage)?.push(app);
    }
    this.classList.add("board");
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <header>
      <h1>Lets Get Hired!</h1>
    </header>
    <div class = "columns">
    </div>
    `;

    const columns = Array.from(
      this.divided_apps,
      ([stage, apps]) => new Column(stage, apps, ["column"])
    );

    this.querySelector(".columns")?.append(...columns);
    this.querySelector("header")?.append(new Statistics(this.applications))

  }

  async updateApplication(app: Application, updatedApp: Application) {
    let appIsUpdated = false;
    for (let key of Object.keys(app)) {
      if (
        app[key as keyof Application] != updatedApp[key as keyof Application]
      ) {
        appIsUpdated = true;
        break;
      }
    }
    if (appIsUpdated) {
      this.updateAppOnBoard(app, updatedApp);
      const res = await fetch("/update-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApp),
      });

      if (!res.ok) {
        console.error("Couldn't update app: ", app);
      }
    }
  }

  updateAppOnBoard(app: Application, updatedApp: Application) {
    const currentStage = app.stage;
    const newStage = updatedApp.stage;

    const currStageColumn = this.querySelector(
      `stage-column[data-stage="${currentStage}"]`
    ) as Column;

    const newStageColumn = this.querySelector(
      `stage-column[data-stage="${newStage}"]`
    ) as Column;

    this.applications = this.applications.map((app) =>
      app.id == updatedApp.id ? updatedApp : app
    );

    currStageColumn.apps = currStageColumn.apps.filter(
      (stageApp) => stageApp.id != updatedApp.id
    );
    newStageColumn.apps.push(updatedApp);
    newStageColumn.render();

    if (currentStage != newStage) {
      currStageColumn.render();
    }
    this.querySelector<Statistics>("#statistics")?.render();
  }

  async postData() {
    const res = await fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.applications),
    });

    if (!res.ok) {
      console.error("Couldn't save data");
    }
  }

}

if (!customElements.get("job-board")) {
  customElements.define("job-board", Board);
}
export default Board;
