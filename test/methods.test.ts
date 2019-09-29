import SomeComponent from '@test/SampleComponent.vue';
import NoMethodComponent from '@test/NoMethodComponent.vue';
import { methods } from '@src/index';

describe('Methods', () => {
  describe('extraction', () => {
    it('extracts methods', () => {
      const { sayHi } = methods(SomeComponent);
      expect(typeof sayHi).toBe('function');
      expect(typeof sayHi()).toBe('object');
    });
  });

  describe('no method', () => {
    it('throws no method error', () => {
      expect(() => {
        methods(NoMethodComponent);
      }).toThrow('Not exists method.');
    });
  });

  // describe('mock', () => {
  //   describe('return', () => {
  //     it('returns value', () => {
  //       const { sayHi } = methods(SomeComponent);
  //       expect(sayHi().return).toBe('Hi');
  //     });
  //   });
  // });
});