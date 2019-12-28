import SampleComponent from '@spec/SampleComponent.vue';
import BlankComponent from '@spec/BlankComponent.vue';
import PlaneObjectComponent from '@spec/PlaneObjectComponent.vue';
import InvalidComponent from '@spec/InvalidComponent.vue';
import { hooks } from '@src/index';

describe('Methods', () => {
  describe('extraction', () => {
    it('extracts hooks', () => {
      const { mounted } = hooks(SampleComponent);
      expect(typeof mounted).toBe('function');
      expect(typeof mounted()).toBe('object');
    });
  });

  describe('mock', () => {
    const { mounted, updated } = hooks(SampleComponent);

    describe('mock methods', () => {
      it('calls other method', () => {
        expect(mounted().run().otherMethod).toBeCalled();
      });
    });

    describe('return', () => {
      it('returns value', () => {
        const { mounted } = hooks(SampleComponent);
        expect(mounted().run().return).toBe(undefined);
      });
    });

    describe('context', () => {
      it('chaneges context value', () => {
        const result = updated().run({ updatedCount: 0 });
        expect(result.updatedCount).toBe(1);
      });
    });
  });

  describe('additional hooks', () => {
    describe('register additional hooks', () => {
      it('returns mock function', () => {
        const { beforeRouteEnter } = hooks(SampleComponent, [
          'beforeRouteEnter'
        ]);
        const next = jest.fn();
        expect(typeof beforeRouteEnter).toBe('function');
        beforeRouteEnter('', '', next).run();
        expect(next).toBeCalled();
      });
    });

    describe('no additional hooks', () => {
      it('returns undefined', () => {
        const { beforeRouteEnter } = hooks(SampleComponent);
        expect(typeof beforeRouteEnter).toBe('undefined');
      });
    });
  });

  describe('no method', () => {
    it('throws no hook error', () => {
      expect(() => {
        hooks(BlankComponent);
      }).toThrow('Not exists hook.');
    });
  });

  describe('invalid component', () => {
    it('throws no invalid component error', () => {
      expect(() => {
        hooks(InvalidComponent);
      }).toThrow('Illegal component. component must be object or function.');
    });
  });

  describe('plane object', () => {
    it('returns mock function', () => {
      const { mounted } = hooks(PlaneObjectComponent);
      expect(typeof mounted).toBe('function');
      expect(mounted().run().return).toBe(undefined);
    });
  });

  describe('alias', () => {
    const { mounted } = hooks(SampleComponent);

    it('returns value by alias "r"', () => {
      expect(mounted().r().return).toBe(undefined);
    });

    it('returns value by function property alias "run"', () => {
      expect(mounted.run().return).toBe(undefined);
    });

    it('returns value by function property alias "r"', () => {
      expect(mounted.r().return).toBe(undefined);
    });
  });

  describe('async', () => {
    const { created } = hooks(SampleComponent);

    it('finishs loading', async () => {
      const result = await created.r();
      expect(result.loading).toBe(false);
      expect(result.asyncMethod).toBeCalled();
    });
  });
});
