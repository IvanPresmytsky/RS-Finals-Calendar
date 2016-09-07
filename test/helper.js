import deepFreeze from 'deep-freeze';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import proxyquire from 'proxyquire';
import mockCssModules from 'mock-css-modules';
import jsdom from 'jsdom';

const DEFAULT_HTML = '<html><body></body></html>';


global.expect = chai.expect;
global.assert = chai.assert;
global.deepFreeze = deepFreeze;
global.proxyquire = proxyquire;
global.shallow = shallow;
global.mount = mount;
global.sinon = sinon;

global.document = jsdom.jsdom(DEFAULT_HTML);
global.window = document.defaultView;

