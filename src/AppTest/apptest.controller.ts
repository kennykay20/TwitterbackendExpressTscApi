import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AppController {
  SayHello = () => {
    return "Hello world";
  };
}
