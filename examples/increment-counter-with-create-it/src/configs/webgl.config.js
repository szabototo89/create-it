import configure from './configure';

import button from '../factories/webgl/button';
import container from '../factories/webgl/container';
import text from '../factories/webgl/text';

import { createContainer } from '../utils/pixiHelpers';

const createIt = (middlewares = []) => (...dependencies) => (factory) => factory(...dependencies);
const create = createIt();

const renderer = PIXI.autoDetectRenderer(800, 600);
const stage = createContainer();

const Button = create({ stage })(button);
const Text = create({ stage })(text);
const Container = create({ stage, renderer })(container);

export default configure({ Button, Container, Text });