// Dumb component: Animal

interface Props {
    type: string;
    name: string;
    age: number;
  }
  
  const Animals: React.FC<Props> = ({ type, name, age }) => {
    return (
        <div className="mt2">
          <li>
            <strong>{type} |</strong> {name} | {age} years old
          </li>
        </div>
    );
  };
  
  export default Animals;
  