import CharacterRepository from "../data/CharacterRepository";
import TableModule from "./base/TableModule";

export class StudentsModule extends TableModule {
  async loadData() {
    return CharacterRepository.getStudents();
  }
}

export class GryffindorModule extends TableModule {
  async loadData() {
    return CharacterRepository.getGryffindor();
  }
}

export class SlytherinModule extends TableModule {
  async loadData() {
    return CharacterRepository.getSlytherin();
  }
}

export class HufflepuffModule extends TableModule {
  async loadData() {
    return CharacterRepository.getHufflepuff();
  }
}

export class RavenclawModule extends TableModule {
  async loadData() {
    return CharacterRepository.getRavenclaw();
  }
}
