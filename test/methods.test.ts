import SomeComponent from '@src/SampleComponent.vue';
import tester from '@src/index';

describe('Methods', () => {
  describe('extraction', () => {
    it('extracts methods', () => {
      console.log(SomeComponent)
      const mockMethods = tester.methods(SomeComponent);
      expect(typeof mockMethods.sayHi).toBe('function')
    });
  });
});