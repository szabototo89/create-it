import app from '../factories/app';
import status from '../factories/status';
import increment from '../factories/increment';
debugger;
import createIt from 'create-it';

const configure = ({ Button, Container, Text }) => {
  const create = (actualComponents, ...dependencies) => createIt()({ 
    Button, Container, Text, ...actualComponents 
  }, ...dependencies);

  const Increment = create()(increment);
  const Status = create()(status);
  const App = create({ Status, Increment })(app);

  return App;
};

export default configure;
