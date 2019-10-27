import SampleComponent from '@spec/SampleComponent.vue';
import BlankComponent from '@spec/BlankComponent.vue';
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

    describe('mock method', () => {
      it('emits event', () => {
        const result = displayName.set('Tom').run();
        expect(result.$emit).toBeCalledWith('change-name', 'Tom');
      });
    })
  });

  describe('no method', () => {
    it('throws no method error', () => {
      expect(() => {
        computed(BlankComponent);
      }).toThrow('Not exists method.');
    });
  });
})