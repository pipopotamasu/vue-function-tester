import SampleComponent from '@spec/SampleComponent.vue';
import BlankComponent from '@spec/BlankComponent.vue';
import PlaneObjectComponent from '@spec/PlaneObjectComponent.vue';
import InvalidComponent from '@spec/InvalidComponent.vue';
import { computed } from '@src/index';

describe('Computed', () => {
  describe('extraction', () => {
    it('extracts computed', () => {
      const { sayHello, displayName } = computed(SampleComponent);
      expect(typeof sayHello).toBe('function');
      expect(typeof sayHello()).toBe('object');
      expect(typeof displayName).toBe('object');
      expect(typeof (displayName as any).get).toBe('function');
      expect(typeof (displayName as any).set).toBe('function');
      expect(typeof (displayName as any).get()).toBe('object');
      expect(typeof (displayName as any).set()).toBe('object');
    });
  });

  describe('mock', () => {
    const { sayHello, displayName } = computed(SampleComponent);

    describe('return', () => {
      describe('computed object', () => {
        it('returns value', () => {
          expect(sayHello().run().return).toBe('Hello!');
        });
      });

      describe('computed getter', () => {
        it('returns value', () => {
          expect(displayName.get().run().return).toContain('Mr');
        });
      });
    });

    describe('context', () => {
      it('applys context value', () => {
        const result = displayName.get().run({ name: 'Tom' });
        expect(result.return).toBe('Mr. Tom');
      });
    });

    describe('mock method', () => {
      it('emits event', () => {
        const result = displayName.set('Tom').run();
        expect(result.$emit).toBeCalledWith('change-name', 'Tom');
      });
    });
  });

  describe('plane object', () => {
    it('returns mock function', () => {
      const { sayHello } = computed(PlaneObjectComponent);
      expect(typeof sayHello).toBe('function');
      expect(sayHello().run().return).toBe('Hello');
    });
  });

  describe('no method', () => {
    it('throws no method error', () => {
      expect(() => {
        computed(BlankComponent);
      }).toThrow('Not exists method.');
    });
  });

  describe('invalid component', () => {
    it('throws no invalid component error', () => {
      expect(() => {
        computed(InvalidComponent);
      }).toThrow('Illegal component. component must be object or function.');
    });
  });

  describe('alias', () => {
    const { sayHello } = computed(SampleComponent);

    it('returns value by alias "r"', () => {
      expect(sayHello().r().return).toBe('Hello!');
    });

    it('returns value by function property alias "run"', () => {
      expect(sayHello.run().return).toBe('Hello!');
    });

    it('returns value by function property alias "r"', () => {
      expect(sayHello.r().return).toBe('Hello!');
    });
  });
});
