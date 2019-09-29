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

  describe('mock', () => {
    const { sayHi, sayHiWithName, like, callOtherMethods } = methods(SomeComponent);

    describe('return', () => {
      it('returns value', () => {
        expect(sayHi().run().return).toBe('Hi');
      });
    });

    describe('args', () => {
      it('returns value with args', () => {
        expect(sayHiWithName('Ichiro', 'Suzuki').run().return).toBe('Hi, Ichiro Suzuki');
      });
    });

    describe('context', () => {
      it('chaneges context value', () => {
        const result = like().run({ liked: false })
        expect(result.liked).toBe(true);
      });
    });

    describe('mock function', () => {
      it('calls other method', () => {
        const result = callOtherMethods().run();
        expect(result.otherMethod).toBeCalled();
        expect(result.return).toBe(undefined);
      });

      it('overrides default jest.fn', () => {
        const result = callOtherMethods().run({ otherMethod: jest.fn(() => 'override') });
        expect(result.return).toBe('override');
      });
    });
  });
});