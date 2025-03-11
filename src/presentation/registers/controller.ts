import { Request, Response } from "express";
import {
  DeleteRegisterDataCase,
  GetAllRegisterCase,
  GetManyRegisterCase,
  GetOneRegisterCase,
  RegisterDataCase,
  RegisterDto,
  UpdateRegisterDataCase,
  UpdateRegisterDto,
} from "../../domain";
import { handleError } from "../shared/handleError";

export class RegisterController {
  constructor(
    private readonly getAllRegisterCase: GetAllRegisterCase,
    private readonly getManyRegisterCase: GetManyRegisterCase,
    private readonly getOneRegisterCase: GetOneRegisterCase,
    private readonly registerDataCase: RegisterDataCase,
    private readonly updateRegisterDataCase: UpdateRegisterDataCase,
    private readonly deleteRegisterDataCase: DeleteRegisterDataCase
  ) {}

  public getAllRegisters = (req: Request, res: Response) => {
    this.getAllRegisterCase
      .getAllRegisterData()
      .then((registers) => {
        res.json(registers);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public getManyRegisters = (req: Request, res: Response) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const day = parseInt(req.params.day);

    const data = new Date(year, month, day);

    this.getManyRegisterCase
      .getManyRegisterData(data)
      .then((registers) => {
        res.json(registers);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public getOneRegister = (req: Request, res: Response) => {
    const id = req.params.id;

    this.getOneRegisterCase
      .getOneRegisterData(id)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public registerData = (req: Request, res: Response) => {
    const {
      year,
      month,
      day,
      hour,
      minute,
      second,
      lat,
      long,
      imageUrl,
      registerType,
    } = req.body;


    const [err, registerDto] = RegisterDto.create({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      lat: lat,
      long: long,
      imageUrl: imageUrl,
      registerType: registerType,
    });

    if (err) {
      res.status(400).json({ err });
      return;
    }

    this.registerDataCase
      .registerData(registerDto!)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public updateRegisterData = (req: Request, res: Response) => {
    const id = req.params.id;
    const { year, month, day, registerType } = req.body;
    const data = new Date(parseInt(year), parseInt(month), parseInt(day));

    const [err, updateRegisterDto] = UpdateRegisterDto.create({
      data: data,
      registerType: registerType,
    });

    if (err) {
      res.status(400).json({ err });
      return;
    }

    this.updateRegisterDataCase
      .updateRegisterData(id, updateRegisterDto!)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public deleteRegisterData = (req: Request, res: Response) => {
    const id = req.params.id;

    this.deleteRegisterDataCase
      .deleteRegisterData(id)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };
}
