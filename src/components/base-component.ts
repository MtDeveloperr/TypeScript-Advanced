export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  //base class olucak ve bu classı extend eden classlar bu classın özelliklerini alıcak
  templateElement: HTMLTemplateElement;
  hostElement: T; //farklı bir element olabilir
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //true olursa tüm childlarıyla birlikte import eder.false olursa sadece parentı import eder
    this.element = importedNode.firstElementChild as U; //import edilen nodeun ilk childını alır
    if (newElementId) {
      //eğer yeni bir id verilmişse onu atar
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}
