/* what */

const ignored = {
  id: ['volume-slider', 'expand-volume-slider'],
  types: ['mousewheel', 'keydown', 'keyup'],
} as const;

type CustomElementPrototype = typeof Element.prototype & {
  _addEventListener?: typeof Element.prototype.addEventListener;
};

function overrideAddEventListener() {
  // @ts-expect-error - We know what we're doing
  // oxlint-disable-next-line typescript/unbound-method
  Element.prototype._addEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function (
    type: string,
    listener: (event: Event) => void,
    useCapture = false,
  ) {
    if (!(ignored.id.includes(this.id) && ignored.types.includes(type))) {
      (this as CustomElementPrototype)._addEventListener!(type, listener, useCapture);
    } else if (window.electronIs.dev()) {
      console.log(`Ignoring event: "${this.id}.${type}()"`);
    }
  };
}

export const overrideListener = () => {
  overrideAddEventListener();
  window.addEventListener(
    'load',
    () => {
      Element.prototype.addEventListener = (
        Element.prototype as CustomElementPrototype
      )._addEventListener!;
      (Element.prototype as CustomElementPrototype)._addEventListener = undefined;
    },
    { once: true },
  );
};
