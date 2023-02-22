export class StringifiedMap<K extends Record<string, unknown>, V> extends Map<string, V> {
	constructor(iterable?: readonly (readonly [K, V])[] | null) {
		super();
		if (iterable) {
			for (const [key, value] of iterable) {
				this.set(key, value);
			}
		}
	}

	//@ts-expect-error - ts things that key: K is not assignable to key: string becuase it technically could not be stringifiable
	set(key: K, value: V): this {
		const keyString = JSON.stringify(key);
		return super.set(keyString, value);
	}

	//@ts-expect-error - same as above
	get(key: K): V | undefined {
		const keyString = JSON.stringify(key);
		return super.get(keyString);
	}

	//@ts-expect-error - same as above
	has(key: K): boolean {
		const keyString = JSON.stringify(key);
		return super.has(keyString);
	}

	//@ts-expect-error - same as above
	delete(key: K): boolean {
		const keyString = JSON.stringify(key);
		return super.delete(keyString);
	}

	//@ts-expect-error - same as above
	forEach(callbackfn: (value: V, key: K, map: StringifiedMap<K, V>) => void, thisArg?: any): void {
		super.forEach((value, keyString, map) => {
			const key = JSON.parse(keyString) as K;
			//@ts-expect-error - same as above
			callbackfn.call(thisArg, value, key, map);
		});
	}

	//@ts-expect-error - same as above
	*entries(): IterableIterator<[K, V]> {
		for (const [keyString, value] of super.entries()) {
			const key = JSON.parse(keyString) as K;
			yield [key, value];
		}
	}

	//@ts-expect-error - same as above
	*keys(): IterableIterator<K> {
		for (const keyString of super.keys()) {
			const key = JSON.parse(keyString) as K;
			yield key;
		}
	}

	*values(): IterableIterator<V> {
		yield* super.values();
	}

	//@ts-expect-error - ts things that key: K is not assignable to key: string becuase it technically could not be stringifiable
	*[Symbol.iterator](): IterableIterator<[K, V]> {
		yield* this.entries();
	}
}

/* If above types are not enough then use this one vvv
export class StringifiedMap<K, V> extends Map<string, V> {
  set(key: K, value: V): this {
    const stringKey = JSON.stringify(key) as keyof K;
    return super.set(stringKey, value);
  }

  get(key: K): V | undefined {
    const stringKey = JSON.stringify(key) as keyof K;
    return super.get(stringKey);
  }

  has(key: K): boolean {
    const stringKey = JSON.stringify(key) as keyof K;
    return super.has(stringKey);
  }

  delete(key: K): boolean {
    const stringKey = JSON.stringify(key) as keyof K;
    return super.delete(stringKey);
  }

  clear(): void {
    super.clear();
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    const newCallbackfn = (value: V, key: string, map: Map<string, V>) => {
      const parsedKey = JSON.parse(key) as K;
      callbackfn(value, parsedKey, this);
    };
    super.forEach(newCallbackfn, thisArg);
  }

  entries(): IterableIterator<[K, V]> {
    const iterator = super.entries();
    return {
      [Symbol.iterator]: function() {
        return this;
      },
      next: function(): IteratorResult<[K, V]> {
        const { done, value } = iterator.next();
        if (done) {
          return { done: true, value: undefined };
        }
        const parsedKey = JSON.parse(value[0]) as K;
        return { done: false, value: [parsedKey, value[1]] };
      }
    };
  }

  keys(): IterableIterator<K> {
    const iterator = super.keys();
    return {
      [Symbol.iterator]: function() {
        return this;
      },
      next: function(): IteratorResult<K> {
        const { done, value } = iterator.next();
        if (done) {
          return { done: true, value: undefined };
        }
        const parsedKey = JSON.parse(value) as K;
        return { done: false, value: parsedKey };
      }
    };
  }

  values(): IterableIterator<V> {
    return super.values();
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  get size(): number {
    return super.size;
  }
}

*/
