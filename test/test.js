import { expect as expect } from 'chai';
import inferno from '../src/module.js';

describe('inferno', () => {
  it('should be runing without any problems', () => {
    expect(inferno).to.not.throw();
  });
});
