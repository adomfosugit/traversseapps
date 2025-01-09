interface IStageIconProp {
    iconNumber: string;
  }
  const StageIcon = ({ iconNumber }: IStageIconProp) => {
    return (
      <div className="border border-primary rounded-full ml-5 p-1 w-7 h-7 text-primart text-center text-xs">
        {iconNumber}
      </div>
    );
  };
  
  export default StageIcon;
  