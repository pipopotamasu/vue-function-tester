import SampleComponent from '@spec/SampleComponent.vue';
import BlankComponent from '@spec/BlankComponent.vue';
import PlaneObjectComponent from '@spec/PlaneObjectComponent.vue';
import { methods } from '@src/index';

describe('Methods', () => {
  describe('extraction', () => {
    it('extracts methods', () => {
      const { sayHi } = methods(SampleComponent);
      expect(typeof sayHi).toBe('function');
      expect(typeof sayHi()).toBe('object');
    });
  });

  describe('mock', () => {
    const { sayHi, sayHiWithName, like, callOtherMethod, emitEvent } = methods(
      SampleComponent
    );

    describe('return', () => {
      it('returns value', () => {
        expect(sayHi().run().return).toBe('Hi!');
      });
    });

    describe('args', () => {
      it('returns value with args', () => {
        expect(sayHiWithName('Ichiro', 'Suzuki').run().return).toBe(
          'Hi, Ichiro Suzuki!'
        );
      });
    });

    describe('context', () => {
      it('chaneges context value', () => {
        const result = like().run({ liked: false });
        expect(result.liked).toBe(true);
      });
    });

    describe('mock method', () => {
      it('calls other methods', () => {
        const result = callOtherMethod().run();
        expect(result.otherMethod).toBeCalled();
        expect(result.return).toBe(undefined);
      });

      it('overrides default jest.fn', () => {
        const result = callOtherMethod().run({
          otherMethod: jest.fn(() => 'override')
        });
        expect(result.return).toBe('override');
      });

      it('emits event', () => {
        const result = emitEvent().run();
        expect(result.$emit).toBeCalledWith('some-event', 'value');
      });
    });
  });

  describe('no method', () => {
    it('throws no method error', () => {
      expect(() => {
        methods(BlankComponent);
      }).toThrow('Not exists method.');
    });
  });

  describe('plane object', () => {
    it('returns mock function', () => {
      const { sayHi } = methods(PlaneObjectComponent);
      expect(typeof sayHi).toBe('function');
      expect(sayHi().run().return).toBe('Hi');
    });
  });

  describe('alias', () => {
    const { sayHi } = methods(SampleComponent);

    it('returns value by alias "r"', () => {
      expect(sayHi().r().return).toBe('Hi!');
    });
  });
});
