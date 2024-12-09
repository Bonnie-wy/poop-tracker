import Container from "./Container";
import CreateRecordButton from "./CreateRecordButton";

const Habit = (habitId: string) => {
  return (
    <Container>
      <CreateRecordButton habitId={habitId} />
    </Container>
  );
};

export default Habit;
