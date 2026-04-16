import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

function App() {
  return (
    <>
      <GlobalStyles />
      <Button>Hello World</Button>
      <Input placeholder='hola' />
    </>
  );
}

export default App;
