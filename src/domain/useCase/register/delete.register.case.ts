import { RegisterRepository } from "../..";

export class DeleteRegisterDataCase {
  private readonly registerRepository: RegisterRepository;

  constructor(registerRepository: RegisterRepository) {
    this.registerRepository = registerRepository;
  }

  deleteRegisterData(id: string): Promise<boolean> {
    return this.registerRepository.deleteRegisterData(id);
  }
}
