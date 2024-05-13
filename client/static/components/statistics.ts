class Statistics extends HTMLElement {
  apps: Application[];

  constructor(apps: Application[]) {
    super();
    this.apps = apps;
    this.id = "statistics";
    this.render();
  }

  render() {
    const applied = this.apps.filter(app => app.stage != "Waiting to apply");
    const stageOne = applied.filter(app => app.stage != "Applied");
    const stageTwo = stageOne.filter(app => app.stage != "Stage one - intro call");
    const stageThree = stageTwo.filter(app => app.stage != "Stage two - skills check");
    const referenceCheck = stageThree.filter(app => app.stage != "Stage three - cultural fit");
    const receivedOffer = referenceCheck.filter(app => app.stage != "Reference check");

    this.innerHTML = /*html*/ `
    <p><strong>Applied:</strong> ${applied.length} </p>
    <p><strong>Stage One:</strong> ${this.getPercent(
      stageOne.length,
      applied.length
    )}</p>
    <p><strong>Stage Two:</strong> ${this.getPercent(
      stageTwo.length,
      stageOne.length
    )}</p>
    <p><strong>Stage Three:</strong> ${this.getPercent(
      stageThree.length,
      stageTwo.length
    )}</p>
    <p><strong>Reference Check:</strong> ${this.getPercent(
      referenceCheck.length,
      stageThree.length
    )}</p>
    <p><strong>Received Offer:</strong> ${this.getPercent(
      receivedOffer.length,
      referenceCheck.length
    )}</p>
    `;
  }

  getPercent(numerator: number, denominator: number): string {
    return Math.round(numerator / denominator * 100) + "%"
  }

}

if (!customElements.get("job-statistics")) {
  customElements.define("job-statistics", Statistics);
}

export default Statistics;
