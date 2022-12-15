interface CommandsProps {
  command: string;
  parameters: string | [];
}

const CommandsHandler = (command: CommandsProps, parameters: CommandsProps) => {
  console.log(command);
  console.log(parameters);
};

export default CommandsHandler;
