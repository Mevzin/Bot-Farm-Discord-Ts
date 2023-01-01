import RegisterManager from "./registerManager";
import WelcomeMessage from "./welcomeMessage";

interface CommandsProps {
  command: string;
  parameters: string | [];
}

const CommandsHandler = (command: string, parameters: CommandsProps, message: any) => {
  if(command == "welcome"){
    WelcomeMessage(message);
  }
  if(command == "register"){
    RegisterManager(parameters, message);
  }
};

export default CommandsHandler;
