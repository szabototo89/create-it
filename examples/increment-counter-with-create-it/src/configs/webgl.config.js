import configure from './configure';

import button from '../factories/webgl/button';
import container from '../factories/webgl/container';
import text from '../factories/webgl/text';
import { createIt } from '../create-it';

import { createContainer } from '../utils/pixiHelpers';

const renderer = PIXI.autoDetectRenderer(800, 600);
const stage = createContainer();

const create = createIt();

const Button = create({ stage })(button);
const Text = create({ stage })(text);
const Container = create({ stage, renderer })(container);

export default configure({ Button, Container, Text });