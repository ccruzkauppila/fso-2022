const Header = (props) => {
  return <h2>{props.course}</h2>;
};
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
const Total = ({ parts }) => {
  return <p>Total number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>;
};

export default Course;
