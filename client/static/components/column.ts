import JobCard from "./card"

class Column extends HTMLElement {
  stage: ApplicationStage
  apps: Application[]

  constructor(stage: ApplicationStage, apps: Application[], classes: string[] = [] ) {
    super()
    this.stage = stage
    this.apps = apps

    for (let cls of classes) {
      this.classList.add(cls)
    }

    this.render()
  }

  render() {
    this.innerHTML = /*html*/`
    <h2>${this.stage}</h2>
    `

    const apps = this.apps.map(app => new JobCard(app, ['card']));
    this.append(...apps)

  }
}

if (!customElements.get('stage-column')) {
  customElements.define('stage-column', Column)
}

export default Column
