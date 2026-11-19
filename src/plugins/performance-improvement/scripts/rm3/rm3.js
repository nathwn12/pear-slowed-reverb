/*

MIT License

Copyright 2024-2025 CY Fung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/* oxlint-disable */

export const rm3 = {};

export const injectRm3 = () => {
  const DEBUG_OPT = false;
  const CONFIRM_TIME = 4000;
  const CHECK_INTERVAL = 400;
  const DEBUG_dataChangeReflection = true;

  /** @type {globalThis.PromiseConstructor} */
  const Promise = (async () => {})().constructor; // hacks Promise in WaterFox Classic and "Promise.resolve(0)" nevers resolve.

  function uniq(array) {
    return [...new Set(array)];
  }

  rm3.uniq = uniq; // [[debug]]
  DEBUG_OPT && (rm3.location = location.href);

  rm3.inspect = () => {
    return uniq(
      [...document.getElementsByTagName('*')]
        .filter((e) => e?.polymerController?.createComponent_)
        .map((e) => e.nodeName),
    ); // [[debug]]
  };

  const insp = (o) => o ? o.polymerController || o.inst || o || 0 : o || 0;
  const indr = (o) => insp(o).$ || o.$ || 0;

  const getProto = (element) => {
    if (element) {
      const cnt = insp(element);
      return cnt.constructor.prototype || null;
    }
    return null;
  };

  const LinkedArray = (() => {
    class Node {
      constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
      }
    }

    class LinkedArray {
      constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }

      push(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
        }
        this.length++;
        return this.length;
      }

      pop() {
        if (this.length === 0) return undefined;
        const removedNode = this.tail;
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.tail = removedNode.prev;
          this.tail.next = null;
          removedNode.prev = null;
        }
        this.length--;
        return removedNode.value;
      }

      unshift(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
        }
        this.length++;
        return this.length;
      }

      shift() {
        if (this.length === 0) return undefined;
        const removedNode = this.head;
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = removedNode.next;
          this.head.prev = null;
          removedNode.next = null;
        }
        this.length--;
        return removedNode.value;
      }

      size() {
        return this.length;
      }

      getNode(index) {
        if (index < 0 || index >= this.length) return null;

        let current;
        let counter;

        if (index < this.length / 2) {
          current = this.head;
          counter = 0;
          while (counter !== index) {
            current = current.next;
            counter++;
          }
        } else {
          current = this.tail;
          counter = this.length - 1;
          while (counter !== index) {
            current = current.prev;
            counter--;
          }
        }
        return current;
      }

      get(index) {
        const node = this.getNode(index);
        return node ? node.value : undefined;
      }

      findNode(value) {
        let current = this.head;
        let idx = 0;
        while (current) {
          if (current.value === value) {
            return { node: current, index: idx };
          }
          current = current.next;
          idx++;
        }
        return { node: null, index: -1 };
      }

      toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
          arr.push(current.value);
          current = current.next;
        }
        return arr;
      }

      insertBeforeNode(node, newValue) {
        if (!node) {
          this.unshift(newValue);
          return true;
        }

        if (node === this.head) {
          this.unshift(newValue);
        } else {
          const newNode = new Node(newValue);
          const prevNode = node.prev;

          prevNode.next = newNode;
          newNode.prev = prevNode;
          newNode.next = node;
          node.prev = newNode;

          this.length++;
        }
        return true;
      }

      insertAfterNode(node, newValue) {
        if (!node) {
          this.push(newValue);
          return true;
        }

        if (node === this.tail) {
          this.push(newValue);
        } else {
          const newNode = new Node(newValue);
          const nextNode = node.next;

          node.next = newNode;
          newNode.prev = node;
          newNode.next = nextNode;
          nextNode.prev = newNode;

          this.length++;
        }
        return true;
      }

      insertBefore(existingValue, newValue) {
        const { node } = this.findNode(existingValue);
        if (!node) return false; // Not found
        return this.insertBeforeNode(node, newValue);
      }

      insertAfter(existingValue, newValue) {
        const { node } = this.findNode(existingValue);
        if (!node) return false; // Not found
        return this.insertAfterNode(node, newValue);
      }

      deleteNode(node) {
        if (!node) return false;

        if (this.length === 1 && node === this.head && node === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (node === this.head) {
          this.head = node.next;
          this.head.prev = null;
          node.next = null;
        } else if (node === this.tail) {
          this.tail = node.prev;
          this.tail.next = null;
          node.prev = null;
        } else {
          const prevNode = node.prev;
          const nextNode = node.next;
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
          node.prev = null;
          node.next = null;
        }

        this.length--;
        return true;
      }
    }

    LinkedArray.Node = Node;
    return LinkedArray;
  })();

  class LimitedSizeSet extends Set {
    constructor(n) {
      super();
      this.limit = n;
    }

    add(key) {
      if (!super.has(key)) {
        super.add(key);
        let n = super.size - this.limit;
        if (n > 0) {
          const iterator = super.values();
          do {
            const firstKey = iterator.next().value; // Get the first (oldest) key
            super.delete(firstKey); // Delete the oldest key
          } while (--n > 0);
        }
      }
    }

    removeAdd(key) {
      super.delete(key);
      this.add(key);
    }
  }

  if (
    !document.createElement9512 &&
    typeof document.createElement === 'function' &&
    document.createElement.length === 1
  ) {

    const hookTos = new Set(); // [[debug]]
    DEBUG_OPT && (rm3.hookTos = hookTos);

    const entryRecords = new WeakMap(); // a weak link between element and record


    const operations = rm3.operations = new Set(); // to find out the "oldest elements"

    const availablePools = rm3.availablePools = new Map(); // those "old elements" can be used
    let lastTimeCheck = 0;

    const reuseRecord_ = new LimitedSizeSet(256); // [[debug]]
    const reuseCount_ = new Map();

    let noTimeCheck = false;


    const timeCheck = () => {

      const ct = Date.now();
      if (ct - lastTimeCheck < CHECK_INTERVAL || noTimeCheck) return;
      lastTimeCheck = ct;
      noTimeCheck = true;

      if (hookTos.size > 777216) hookTos.clear(); // just debug usage, dont concern
      if (operations.size > 7777216) {
        const half = operations.size >>> 1;
        let i = 0;
        for (const value of operations) {
          if (i++ > half) break;
          operations.delete(value);
        }
      }

      const iterator = operations[Symbol.iterator]();

      const targetTime = ct - CONFIRM_TIME;

      const pivotNodes = new WeakMap();

      while (true) {
        const iteratorResult = iterator.next(); // 順番に値を取りだす
        if (iteratorResult.done) break; // 取り出し終えたなら、break
        const entryRecord = iteratorResult.value;
        if (entryRecord[3] > targetTime) break;

        if (!entryRecord[4] && entryRecord[1] < 0 && entryRecord[2] > 0) {
          const element = entryRecord[0].deref();
          const eKey = (element || 0).__rm3Tag003__;
          if (!eKey) {
            operations.delete(entryRecord);
          } else if (
            element.isConnected === false &&
            insp(element).isAttached === false
          ) {
            entryRecord[4] = true;

            let availablePool = availablePools.get(eKey);
            if (!availablePool)
              availablePools.set(eKey, availablePool = new LinkedArray());
            if (!(availablePool instanceof LinkedArray)) throw new Error();
            DEBUG_OPT &&
              console.log(3885, 'add key', eKey, availablePools.size);
            let pivotNode = pivotNodes.get(availablePool);
            if (!pivotNode)
              pivotNodes.set(availablePool, pivotNode = availablePool.head); // cached the previous newest node (head) as pivotNode

            availablePool.insertBeforeNode(pivotNode, entryRecord); // head = newest, tail = oldest
          }
        }
      }
      noTimeCheck = false;
    };

    const attachedDefine = function () {
      Promise.resolve().then(timeCheck);
      try {
        const hostElement = this?.hostElement;
        if (hostElement instanceof HTMLElement) {
          const entryRecord = entryRecords.get(hostElement);
          if (
            entryRecord &&
            entryRecord[0].deref() === hostElement &&
            hostElement.isConnected === true &&
            this?.isAttached === true
          ) {
            noTimeCheck = true;
            const ct = Date.now();
            entryRecord[1] = ct;
            entryRecord[2] = -1;
            entryRecord[3] = ct;
            operations.delete(entryRecord);
            operations.add(entryRecord);
            noTimeCheck = false;
          }
        }
      } catch (e) {}
      return this.attached9512();
    };
    const detachedDefine = function () {
      Promise.resolve().then(timeCheck);
      try {
        const hostElement = this?.hostElement;
        if (hostElement instanceof HTMLElement) {
          const entryRecord = entryRecords.get(hostElement);
          if (
            entryRecord &&
            entryRecord[0].deref() === hostElement &&
            hostElement.isConnected === false &&
            this?.isAttached === false
          ) {
            noTimeCheck = true;
            const ct = Date.now();
            entryRecord[2] = ct;
            entryRecord[1] = -1;
            entryRecord[3] = ct;
            operations.delete(entryRecord);
            operations.add(entryRecord);
            noTimeCheck = false;
          }
        }
      } catch (e) {}

      return this.detached9512();
    };


    async function digestMessage(message) {
      const msgUint8 = new TextEncoder().encode(message); // (utf-8 の) Uint8Array にエンコードする
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // メッセージをハッシュする
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // バッファーをバイト列に変換する
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(''); // バイト列を 16 進文字列に変換する
      return hashHex.toUpperCase();
    }

    let onPageContainer = null;

    // onCreateComponentError - see https://github.com/cyfung1031/userscript-supports/issues/99
    const createComponentDefine_ = function (a, b, c, onCreateComponentError) {
      Promise.resolve().then(timeCheck);

      const creatorTag = this?.is || this?.nodeName?.toLowerCase() || '';

      const componentTag = typeof a === 'string' ? a : (a || 0).component || '';

      const eKey =
        creatorTag && componentTag ? `${creatorTag}.${componentTag}` : '*'; // '*' for play-safe
      const availablePool = availablePools.get(eKey);

      try {
        if (availablePool instanceof LinkedArray) {
          noTimeCheck = true;

          let node = availablePool.tail; // oldest

          while (node instanceof LinkedArray.Node) {
            const entryRecord = node.value;
            const prevNode = node.prev;

            let ok = false;
            let elm = null;
            if (entryRecord[1] < 0 && entryRecord[2] > 0 && entryRecord[4]) {
              elm = entryRecord[0].deref();
              if (
                elm &&
                elm instanceof HTMLElement &&
                elm.isConnected === false &&
                insp(elm).isAttached === false &&
                elm.parentNode === null
              ) {
                ok = true;
              }
            }

            if (ok) {
              entryRecord[4] = false;
              availablePool.deleteNode(node);

              if (!onPageContainer) {
                let p = document.createElement('noscript');
                document.body.prepend(p);
                onPageContainer = p;
              }

              onPageContainer.appendChild(elm); // to fix some issues for the rendered elements

              const cnt = insp(elm);

              cnt.__dataInvalid = false;

              if (typeof (cnt.__data || 0) === 'object') {
                cnt.__data = Object.assign({}, cnt.__data);
              }
              cnt.__dataPending = {};
              cnt.__dataOld = {};

              try {
                cnt.markDirty();
              } catch (e) {}
              try {
                cnt.markDirtyVisibilityObserver();
              } catch (e) {}

              try {
                cnt.wasPrescan = cnt.wasVisible = !1;
              } catch (e) {}


              if (DEBUG_OPT && DEBUG_dataChangeReflection) {
                let jC1 = null;
                let jC2 = null;
                const jKey = `${Math.floor(Math.random() * 314159265359 + 314159265359).toString(36)}`;
                try {
                  jC1 =
                    cnt.hostElement.__shady_native_textContent ||
                    cnt.hostElement.textContent;
                } catch (e) {
                  console.warn(e);
                }

                setTimeout(() => {
                  try {
                    jC2 =
                      cnt.hostElement.__shady_native_textContent ||
                      cnt.hostElement.textContent;
                  } catch (e) {
                    console.warn(e);
                  }

                  (async () => {
                    jC1 = await digestMessage(jC1);
                    jC2 = await digestMessage(jC2);

                    console.log(
                      83804,
                      jKey,
                      jC1.substring(0, 7),
                      jC2.substring(0, 7),
                    );
                  })();
                }, 1000);
              }

              if (entryRecord[5] < 1e9) entryRecord[5] += 1;
              DEBUG_OPT &&
                Promise.resolve().then(() =>
                  console.log(`${eKey} reuse`, entryRecord),
                ); // give some time for attach process
              DEBUG_OPT && reuseRecord_.add([Date.now(), cnt.is, entryRecord]);
              DEBUG_OPT &&
                reuseCount_.set(cnt.is, (reuseCount_.get(cnt.is) || 0) + 1);
              if (rm3.reuseCount < 1e9) rm3.reuseCount++;

              return elm;
            }


            entryRecord[4] = false;

            availablePool.deleteNode(node);
            node = prevNode;
          }
        }
      } catch (e) {
        console.warn(e);
      }
      noTimeCheck = false;




      const newElement = this.createComponent9512_(a, b, c, onCreateComponentError);

      try {
        const cntE = insp(newElement);
        if (!cntE.attached9512 && cntE.attached) {
          const cProtoE = getProto(newElement);

          if (cProtoE.attached === cntE.attached) {
            if (
              !cProtoE.attached9512 &&
              typeof cProtoE.attached === 'function' &&
              cProtoE.attached.length === 0
            ) {
              cProtoE.attached9512 = cProtoE.attached;

              cProtoE.attached = attachedDefine;
            }
          } else {
            if (
              typeof cntE.attached === 'function' &&
              cntE.attached.length === 3
            ) {
              cntE.attached9512 = cntE.attached;

              cntE.attached = attachedDefine;
            }
          }
        }

        if (!cntE.detached9512 && cntE.detached) {
          const cProtoE = getProto(newElement);

          if (cProtoE.detached === cntE.detached) {
            if (
              !cProtoE.detached9512 &&
              typeof cProtoE.detached === 'function' &&
              cProtoE.detached.length === 0
            ) {
              cProtoE.detached9512 = cProtoE.detached;

              cProtoE.detached = detachedDefine;
            }
          } else {
            if (
              typeof cntE.detached === 'function' &&
              cntE.detached.length === 3
            ) {
              cntE.detached9512 = cntE.detached;

              cntE.detached = detachedDefine;
            }
          }
        }

        const acceptance = true;
        if (acceptance) {
          const entryRecord = [new WeakRef(newElement), -1, -1, -1, false, 0];

          newElement.__rm3Tag003__ = eKey;
          entryRecords.set(newElement, entryRecord);
        } else {
        }
      } catch (e) {
        console.warn(e);
      }
      return newElement;
    };

    document.createElement9512 = document.createElement;
    document.createElement = function (a) {
      const r = document.createElement9512(a);
      try {
        const cnt = insp(r);
        if (cnt.createComponent_ && !cnt.createComponent9512_) {
          const cProto = getProto(r);
          if (cProto.createComponent_ === cnt.createComponent_) {
            if (
              !cProto.createComponent9512_ &&
              typeof cProto.createComponent_ === 'function' &&
              (
                cProto.createComponent_.length === 4 ||
                cProto.createComponent_.length === 3
              )
            ) {
              cProto.createComponent9512_ = cProto.createComponent_;

              cProto.createComponent_ = createComponentDefine_;
              DEBUG_OPT && hookTos.add(a);
            }
          } else {
            if (
              typeof cnt.createComponent_ === 'function' &&
              (
                cnt.createComponent_.length === 4 ||
                cnt.createComponent_.length === 3
              )
            ) {
              cnt.createComponent9512_ = cnt.createComponent_;

              cnt.createComponent_ = createComponentDefine_;
              DEBUG_OPT && hookTos.add(a);
            }
          }
        }
      } catch (e) {
        console.warn(e);
      }

      return r;
    };

    rm3.checkWhetherUnderParent = () => {
      const r = [];
      for (const operation of operations) {
        const elm = operation[0].deref();
        if (operation[2] > 0) {
          r.push([
            !!elm,
            elm?.nodeName.toLowerCase(),
            elm?.parentNode === null,
          ]);
        }
      }
      return r;
    };

    rm3.hookTags = () => {
      const r = new Set();
      for (const operation of operations) {
        const elm = operation[0].deref();
        if (elm && elm.is) {
          r.add(elm.is);
        }
      }
      return [...r];
    };

    DEBUG_OPT &&
      (rm3.reuseRecord = () => {
        return [...reuseRecord_]; // [[debug]]
      });

    DEBUG_OPT && (rm3.reuseCount_ = reuseCount_);
  }

  rm3.reuseCount = 0;
};
