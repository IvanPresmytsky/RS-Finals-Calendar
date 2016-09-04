import deepFreeze from 'deep-freeze';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import proxyquire from 'proxyquire';
var mockCssModules = require("mock-css-modules");


global.expect = chai.expect;
global.assert = chai.assert;
global.deepFreeze = deepFreeze;
global.proxyquire = proxyquire;
global.shallow = shallow;
global.mount = mount;
global.sinon = sinon;

