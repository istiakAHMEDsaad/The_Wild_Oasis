import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Input from './ui/Input';

function App() {
  return (
    <>
      <GlobalStyles />
      <Heading as='h1'>The Wild Oasis</Heading>
      <Button>Print</Button>
      <Input placeholder='hola' />
    </>
  );
}

export default App;
