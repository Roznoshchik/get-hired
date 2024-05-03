enum ApplicationStage {
  TO_APPLY = "Waiting to apply",
  APPLIED = "Applied",
  SCHEDULED = "Interview scheduled",
  STAGE_ONE = "Stage one - intro call",
  STAGE_TWO = "Stage two - technical or team",
  STAGE_THREE = "Stage three - cultural fit",
  WAITING_FOR_OFFER = "Waiting for offer",
  REJECTED = "Rejected",
  RECEIVED_OFFER = "Received offer",
  DECLINED_OFFER = "Offer declined",
}

type Application = {
  name: string;
  appliedDate: Number;
  lastAction: Number;
  stage: ApplicationStage;
  answered: boolean;
  rejected: boolean;
  pointsOfContact: string;
  notes: string;
  url: string;
  usedCoverLetter: boolean;
  coverLetterName: string;
};

class Board extends HTMLElement {
  applications: Application[] = [];
  toApply: Application[] = [];
  applied: Application[] = [];
  scheduled: Application[] = [];
  stageOne: Application[] = [];
  stageTwo: Application[] = [];
  stageThree: Application[] = [];
  waitingForOffer: Application[] = [];
  rejected: Application[] = [];
  receivedOffer: Application[] = [];
  declinedOffer: Application[] = [];

  constructor(applications: Application[]) {
    super();
    this.applications = applications;
    for (let app of this.applications) {
      switch (app.stage) {
        case "Waiting to apply":
          this.toApply.push(app);
          break;
        case "Applied":
          this.applied.push(app);
          break;
        case "Interview scheduled":
          this.scheduled.push(app);
          break;
        case "Stage one - intro call":
          this.stageOne.push(app);
          break;
        case "Stage two - technical or team":
          this.stageTwo.push(app);
          break;
        case "Stage three - cultural fit":
          this.stageThree.push(app);
          break;
        case "Waiting for offer":
          this.waitingForOffer.push(app);
          break;
        case "Rejected":
          this.rejected.push(app);
          break;
        case "Received offer":
          this.receivedOffer.push(app);
          break;
        case "Offer declined":
          this.declinedOffer.push(app);
          break;
        default:
          // Handle unexpected cases or log an error
          console.error("Unexpected stage:", app.stage);
      }
    }
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <div class="board">
      <h1>Lets Get Hired!</h1>
      <div class = "columns">
        <div class="column">
          <h2>${ApplicationStage.TO_APPLY}</h2>
          ${this.toApply.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.APPLIED}</h2>
          ${this.applied.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.SCHEDULED}</h2>
          ${this.scheduled.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.STAGE_ONE}</h2>
          ${this.stageOne.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.STAGE_TWO}</h2>
          ${this.stageTwo.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.STAGE_THREE}</h2>
          ${this.stageThree.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.WAITING_FOR_OFFER}</h2>
          ${this.waitingForOffer.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.RECEIVED_OFFER}</h2>
          ${this.receivedOffer.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
        <div class="column">
          <h2>${ApplicationStage.DECLINED_OFFER}</h2>
          ${this.declinedOffer.map((app) => /*html*/ `<p class="card">${app.name}</p>`).join("")}
        </div>
      </div>
    </div>
    `;
  }
}

if (!customElements.get("job-board")) {
  customElements.define("job-board", Board);
}
export default Board;
