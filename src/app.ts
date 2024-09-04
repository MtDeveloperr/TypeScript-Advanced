import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
//dist dosyası boş olsa bile webpack bundle dosyasını oluşturup memory de tutuyor fakat bunu diste yazmıyor ama herhangi bir sorun olmuyor

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
