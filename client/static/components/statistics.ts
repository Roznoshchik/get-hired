class Statistics extends HTMLElement {
  apps: Application[];

  constructor(apps: Application[]) {
    super();
    this.apps = apps;
    this.id = "statistics";
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <p>In Progress Total: ${this.inProgress} </p>
    `;
  }

  get inProgress() {
    return this.apps.reduce((acc, curr) => {
      if (
        curr.stage != "Waiting to apply" &&
        curr.stage != "Received offer" &&
        !curr.rejected
      )
        acc += 1;
      return acc;
    }, 0);
  }
}

if (!customElements.get("job-statistics")) {
  customElements.define("job-statistics", Statistics);
}

export default Statistics;
