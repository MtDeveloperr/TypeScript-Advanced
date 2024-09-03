import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";
import { Autobind } from "../decorators/autobind.js";
import { DragTarget } from "../models/drag-drop.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  //component classından alttaki alanları aldık
  // templateElement: HTMLTemplateElement;  //template olduguna dikkat    eger html içindeki türünü bilmiyorsan Htmlelementi kullanabilirsin
  // hostElement: HTMLDivElement;       //host olduguna dikkat
  // element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`); //component classındaki constructorı çalıştırır.Yani super base classın constructorını çalıştırır.
    // this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;  base classdan geliyor artık
    // this.hostElement = document.getElementById('app')! as HTMLDivElement; base classdan geliyor artık
    this.assignedProjects = [];
    // const importedNode = document.importNode(this.templateElement.content, true); base classdan geliyor artık

    // this.element = importedNode.firstElementChild as HTMLElement; base classdan geliyor artık

    // this.element.id = `${this.type}-projects`; base classdan geliyor artık

    // projectState.addListener((projects: Project[]) => {    base classtan gelen configyre abstract metoduna taşındı
    //     const relevantProjects = projects.filter(prj => {
    //         if(this.type === 'active'){
    //             return prj.status === ProjectStatus.Active;
    //         }
    //         return prj.status === ProjectStatus.Finished;
    //     });
    //     this.assignedProjects = relevantProjects;
    //     this.renderProjects();
    // });

    // this.attach(); base classdan geliyor artık
    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      // const listItem = document.createElement('li');
      // listItem.textContent = prjItem.title;
      // listEl.appendChild(listItem);
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
  // private attach(){  base classdan geliyor artık
  //     this.hostElement.insertAdjacentElement('beforeend', this.element);
  // }
}
