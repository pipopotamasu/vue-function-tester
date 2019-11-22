import SampleComponent from '@spec/SampleComponent.vue';
import BlankComponent from '@spec/BlankComponent.vue';
import PlaneObjectComponent from '@spec/PlaneObjectComponent.vue';
import InvalidComponent from '@spec/InvalidComponent.vue';
import { watch } from '@src/index';

describe('Watch', () => {
  describe('extraction', () => {
    it('extracts hooks', () => {
      const { count } = watch(SampleComponent);
      expect(typeof count).toBe('function');
      expect(typeof count()).toBe('object');
    });
  });

  describe('mock', () => {
    const { count } = watch(SampleComponent);

    describe('mock methods', () => {
      it('calls other method', () => {
        expect(count(1).run().otherMethod).toBeCalled();
      });
    });

    describe('context', () => {
      it('chaneges context value', () => {
        const result = count(15).run({ output: '' });
        expect(result.output).toBe('Fizz Buzz');
      });
    });
  });

  describe('no watcher', () => {
    it('throws no watcher error', () => {
      expect(() => {
        watch(BlankComponent);
      }).toThrow('Not exists watcher.');
    });
  });

  describe('invalid component', () => {
    it('throws no invalid component error', () => {
      expect(() => {
        watch(InvalidComponent);
      }).toThrow('Illegal component. component must be object or function.');
    });
  });

  describe('plane object', () => {
    it('returns mock function', () => {
      const { count } = watch(PlaneObjectComponent);
      expect(typeof count).toBe('function');
      expect(count().run().return).toBe(undefined);
    });
  });

  describe('alias', () => {
    const { count } = watch(SampleComponent);

    it('returns value by alias "r"', () => {
      expect(count(1).r().return).toBe(undefined);
    });

    it('returns value by function property alias "run"', () => {
      expect(count.run().return).toBe(undefined);
    });

    it('returns value by function property alias "r"', () => {
      expect(count.r().return).toBe(undefined);
    });
  });
});
