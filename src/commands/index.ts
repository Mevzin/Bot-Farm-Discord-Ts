import WelcomeMessage from "./welcomeMesage";

interface CommandsProps {
  command: string;
  parameters: string | [];
}

const CommandsHandler = (command: string, parameters: CommandsProps, message: any) => {
  console.log(command);
  console.log(parameters);
  if(command == "welcome"){
    WelcomeMessage(message);
  }
};

export default CommandsHandler;
