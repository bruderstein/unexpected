// THIS FILE IS AUTOGENERATED! DO NOT CHANGE IT MANUALLY.
// It is built based on the examples in the documentation folder
// when the documentation site gets build by running "make site-build".
var expect = require('../');
describe('assertions/any/to-be-a.md', function () {
    it('#1', function () {
        expect(function () {
            expect(true, 'to be a', 'boolean');
            expect(5, 'to be a', 'number');
            expect('abc', 'to be a', 'string');
            expect(expect, 'to be a', 'function');
            expect({foo: 123}, 'to be an', 'object');
            expect([123], 'to be an', 'array');
            expect(/regex/, 'to be a', 'regexp');
            expect(/regex/, 'to be a', 'regex');
            expect(/regex/, 'to be a', 'regular expression');
            expect(new Error(), 'to be an', 'Error');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(expect, 'to be a', 'function');
            expect(expect, 'to be an', 'object');
        }, 'not to throw');
    });
    it('#3', function () {
        expect(function () {
            expect(true, 'to be a boolean');
            expect(5, 'to be a number');
            expect('abc', 'to be a string');
            expect(expect, 'to be a function');
            expect({foo: 123}, 'to be an object');
            expect([123], 'to be an array');
            expect(/regex/, 'to be a regexp');
            expect(/regex/, 'to be a regex');
            expect(/regex/, 'to be a regular expression');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            function Person(name) {
                this.name = name;
            }
            expect(new Person('John Doe'), 'to be a', Person);
            expect(new Person('John Doe'), 'to be an', Object);
        }, 'not to throw');
    });
    it('#5', function () {
        expect(function () {
            expect({ 0: 'foo', 1: 'bar', 2: 'baz' }, 'to be an array');
        }, 'to throw', [
            'expected { 0: \'foo\', 1: \'bar\', 2: \'baz\' } to be an array'
        ].join('\n'));
    });
    it('#6', function () {
        expect(function () {
            expect(true, 'not to be an object');
            expect('5', 'not to be a', 'number');
            expect('abc', 'not to be an', Object);
        }, 'not to throw');
    });
    it('#7', function () {
        expect(function () {
            expect(function () { return 'wat'; }, 'not to be an', Object);
        }, 'to throw', [
            'expected function () { return \'wat\'; } not to be an Object'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-defined.md', function () {
    it('#1', function () {
        expect(function () {
            expect('Hello world!', 'to be defined');
            expect({ foo: { bar: 'baz' } }, 'to be defined');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(undefined, 'to be defined');
        }, 'to throw', [
            'expected undefined to be defined'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-falsy.md', function () {
    it('#1', function () {
        expect(function () {
            expect(0, 'to be falsy');
            expect(false, 'to be falsy');
            expect('', 'to be falsy');
            expect(undefined, 'to be falsy');
            expect(null, 'to be falsy');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect({}, 'to be falsy');
        }, 'to throw', [
            'expected {} to be falsy'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(1, 'not to be falsy');
            expect(true, 'not to be falsy');
            expect({}, 'not to be falsy');
            expect('foo', 'not to be falsy');
            expect(/foo/, 'not to be falsy');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('', 'not to be falsy');
        }, 'to throw', [
            'expected \'\' not to be falsy'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-null.md', function () {
    it('#1', function () {
        expect(function () {
            expect(null, 'to be null');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect({ foo: { bar: 'baz' } }, 'to be null');
        }, 'to throw', [
            'expected { foo: { bar: \'baz\' } } to be null'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect({ foo: { bar: 'baz' } }, 'not to be null');
            expect('Hello world!', 'not to be null');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(null, 'not to be null');
        }, 'to throw', [
            'expected null not to be null'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-ok.md', function () {
    it('#1', function () {
        expect(function () {
            expect(1, 'to be ok');
            expect(true, 'to be ok');
            expect({}, 'to be ok');
            expect('foo', 'to be ok');
            expect(/foo/, 'to be ok');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('', 'to be ok');
        }, 'to throw', [
            'expected \'\' to be ok'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(0, 'not to be ok');
            expect(false, 'not to be ok');
            expect('', 'not to be ok');
            expect(undefined, 'not to be ok');
            expect(null, 'not to be ok');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect({}, 'not to be ok');
        }, 'to throw', [
            'expected {} not to be ok'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-truthy.md', function () {
    it('#1', function () {
        expect(function () {
            expect(1, 'to be truthy');
            expect(true, 'to be truthy');
            expect({}, 'to be truthy');
            expect('foo', 'to be truthy');
            expect(/foo/, 'to be truthy');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('', 'to be truthy');
        }, 'to throw', [
            'expected \'\' to be truthy'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(0, 'not to be truthy');
            expect(false, 'not to be truthy');
            expect('', 'not to be truthy');
            expect(undefined, 'not to be truthy');
            expect(null, 'not to be truthy');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect({}, 'not to be truthy');
        }, 'to throw', [
            'expected {} not to be truthy'
        ].join('\n'));
    });
});
describe('assertions/any/to-be-undefined.md', function () {
    it('#1', function () {
        expect(function () {
            expect(undefined, 'to be undefined');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello world', 'to be undefined');
        }, 'to throw', [
            'expected \'Hello world\' to be undefined'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello world!', 'not to be undefined');
            expect({ foo: { bar: 'baz' } }, 'not to be undefined');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(undefined, 'not to be undefined');
        }, 'to throw', [
            'expected undefined not to be undefined'
        ].join('\n'));
    });
});
describe('assertions/any/to-be.md', function () {
    it('#1', function () {
        expect(function () {
            var obj = {};
            expect(obj, 'to be', obj);
            expect(1, 'to be', 1);
            expect(null, 'to be', null);
            expect(undefined, 'to be', obj.foo);
            expect(true, 'to be', !false);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('1', 'to be', 1);
        }, 'to throw', [
            'expected \'1\' to be 1'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect({}, 'not to be', {});
            expect(1, 'not to be', true);
            expect('1', 'not to be', 1);
            expect(null, 'not to be', undefined);
            expect(0, 'not to be', 'null');
            expect(undefined, 'not to be', 'null');
            expect(false, 'not to be', 'true');
            expect(true, 'not to be', 'false');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(1, 'not to be', 1);
        }, 'to throw', [
            'expected 1 not to be 1'
        ].join('\n'));
    });
});
describe('assertions/any/to-equal.md', function () {
    it('#1', function () {
        expect(function () {
            expect({ a: 'b' }, 'to equal', { a: 'b' });
            var now = new Date();
            expect(now, 'to equal', now);
            expect(now, 'to equal', new Date(now.getTime()));
            expect({ now: now }, 'to equal', { now: now });
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect({ text: 'foo!' }, 'to equal', { text: 'f00!' });
        }, 'to throw', [
            'expected { text: \'foo!\' } to equal { text: \'f00!\' }',
            '',
            '{',
            '  text: \'foo!\' // should be \'f00!\'',
            '               // -foo!',
            '               // +f00!',
            '}'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect({ one: 1, two: 2, four: 4, five: 5 }, 'to equal', { one: 1, two: 2, three: 3, four: 4 });
        }, 'to throw', [
            'expected { one: 1, two: 2, four: 4, five: 5 } to equal { one: 1, two: 2, three: 3, four: 4 }',
            '',
            '{',
            '  one: 1,',
            '  two: 2,',
            '  four: 4,',
            '  five: 5, // should be removed',
            '  three: undefined // should be 3',
            '}'
        ].join('\n'));
    });
    it('#4', function () {
        expect(function () {
            expect([ 0, 1, 2, 4, 5], 'to equal', [ 1, 2, 3, 4]);
        }, 'to throw', [
            'expected [ 0, 1, 2, 4, 5 ] to equal [ 1, 2, 3, 4 ]',
            '',
            '[',
            '  0, // should be removed',
            '  1,',
            '  2,',
            '  // missing 3',
            '  4,',
            '  5 // should be removed',
            ']'
        ].join('\n'));
    });
    it('#5', function () {
        expect(function () {
            expect(
                new Buffer('\x00\x01\x02Here is the thing I was talking about', 'utf-8'),
                'to equal',
                new Buffer('\x00\x01\x02Here is the thing I was quuxing about', 'utf-8')
            );
        }, 'to throw', [
            'expected Buffer([0x00, 0x01, 0x02, 0x48, 0x65, 0x72, 0x65, 0x20, 0x69, 0x73, 0x20, 0x74, 0x68, 0x65, 0x20, 0x74 /* 24 more */ ])',
            'to equal Buffer([0x00, 0x01, 0x02, 0x48, 0x65, 0x72, 0x65, 0x20, 0x69, 0x73, 0x20, 0x74, 0x68, 0x65, 0x20, 0x74 /* 24 more */ ])',
            '',
            ' 00 01 02 48 65 72 65 20 69 73 20 74 68 65 20 74  │...Here is the t│',
            '-68 69 6E 67 20 49 20 77 61 73 20 74 61 6C 6B 69  │hing I was talki│',
            '+68 69 6E 67 20 49 20 77 61 73 20 71 75 75 78 69  │hing I was quuxi│',
            ' 6E 67 20 61 62 6F 75 74                          │ng about│'
        ].join('\n'));
    });
    it('#6', function () {
        expect(function () {
            expect(1, 'not to equal', '1');
            expect({ one: 1 }, 'not to equal', { one: '1' });
            expect(null, 'not to equal', '1');
            var now = new Date();
            var later = new Date(now.getTime() + 42);
            expect(now, 'not to equal', later);
            expect({ time: now }, 'not to equal', { time: later });
        }, 'not to throw');
    });
    it('#7', function () {
        expect(function () {
            expect({ a: { b: 'd'} }, 'not to equal', { a: { b: 'd'} });
        }, 'to throw', [
            'expected { a: { b: \'d\' } } not to equal { a: { b: \'d\' } }'
        ].join('\n'));
    });
});
describe('assertions/array/to-be-empty.md', function () {
    it('#1', function () {
        expect(function () {
            expect([], 'to be empty');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect([1,2,3], 'to be empty');
        }, 'to throw', [
            'expected [ 1, 2, 3 ] to be empty'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect([1,2,3], 'not to be empty');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect([], 'not to be empty');
        }, 'to throw', [
            'expected [] not to be empty'
        ].join('\n'));
    });
});
describe('assertions/array/to-contain.md', function () {
    it('#1', function () {
        expect(function () {
            expect([0, 1, 2], 'to contain', 1);
            expect([ { name: 'John Doe' }, { name: 'Jane Doe' } ], 'to contain', { name: 'Jane Doe' });
            expect([0, 1, 2], 'to contain', 0, 2);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect([ { name: 'John Doe' }, { name: 'Jane Doe' } ], 'to contain', { name: 'Jonnie Doe' });
        }, 'to throw', [
            'expected [ { name: \'John Doe\' }, { name: \'Jane Doe\' } ] to contain { name: \'Jonnie Doe\' }'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect([ { name: 'John Doe' }, { name: 'Jane Doe' } ], 'not to contain', { name: 'Jonnie Doe' });
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect([ { name: 'John Doe' }, { name: 'Jane Doe' } ], 'not to contain', { name: 'Jane Doe' });
        }, 'to throw', [
            'expected [ { name: \'John Doe\' }, { name: \'Jane Doe\' } ] not to contain { name: \'Jane Doe\' }',
            '',
            '[',
            '  { name: \'John Doe\' },',
            '  { name: \'Jane Doe\' } // should be removed',
            ']'
        ].join('\n'));
    });
});
describe('assertions/array/to-have-length.md', function () {
    it('#1', function () {
        expect(function () {
            expect([1,2,3], 'to have length', 3);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect([1,2,3], 'to have length', 4);
        }, 'to throw', [
            'expected [ 1, 2, 3 ] to have length 4',
            '  expected 3 to be 4'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect([1,2,3], 'not to have length', 4);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect([1,2,3], 'not to have length', 3);
        }, 'to throw', [
            'expected [ 1, 2, 3 ] not to have length 3'
        ].join('\n'));
    });
});
describe('assertions/boolean/to-be-false.md', function () {
    it('#1', function () {
        expect(function () {
            expect(false, 'to be false');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(true, 'to be false');
        }, 'to throw', [
            'expected true to be false'
        ].join('\n'));
    });
});
describe('assertions/boolean/to-be-true.md', function () {
    it('#1', function () {
        expect(function () {
            expect(true, 'to be true');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(false, 'to be true');
        }, 'to throw', [
            'expected false to be true'
        ].join('\n'));
    });
});
describe('assertions/function/to-have-arity.md', function () {
    it('#1', function () {
        expect(function () {
            expect(Math.max, 'to have arity', 2);
            expect('wat'.substring, 'to have arity', 2);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(function wat(foo, bar) {
              return foo + bar;
            }, 'to have arity', 3);
        }, 'to throw', [
            'expected',
            'function wat(foo, bar) {',
            '  return foo + bar;',
            '}',
            'to have arity 3'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-NaN.md', function () {
    it('#1', function () {
        expect(function () {
            expect(NaN, 'to be NaN');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(2, 'to be NaN');
        }, 'to throw', [
            'expected 2 to be NaN'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(2, 'not to be NaN');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(NaN, 'not to be NaN');
        }, 'to throw', [
            'expected NaN not to be NaN'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-close-to.md', function () {
    it('#1', function () {
        expect(function () {
            expect(1.5, 'to be close to', 1.500001, 1e-5);
            expect(1.5, 'to be close to', 1.5000000001)
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(1.5, 'to be close to', 1.50001, 1e-5);
        }, 'to throw', [
            'expected 1.5 to be close to 1.50001 (epsilon: 1e-5)'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(1.5, 'not to be close to', 1.499, 1e-4);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(1.5, 'not to be close to', 1.5000000001)
        }, 'to throw', [
            'expected 1.5 not to be close to 1.5000000001 (epsilon: 1e-9)'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-finite.md', function () {
    it('#1', function () {
        expect(function () {
            expect(123, 'to be finite');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(Infinity, 'to be finite');
        }, 'to throw', [
            'expected Infinity to be finite'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(Infinity, 'not to be finite');
            expect(-Infinity, 'not to be finite');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(123, 'not to be finite');
        }, 'to throw', [
            'expected 123 not to be finite'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-greater-than-or-equal-to.md', function () {
    it('#1', function () {
        expect(function () {
            expect(3, 'to be greater than or equal to', 3);
            expect(4, 'to be >=', 3);
            expect(4, '>=', 4);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(1, 'to be greater than or equal to', 2);
        }, 'to throw', [
            'expected 1 to be greater than or equal to 2'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(1, 'not to be greater than or equal to', 2);
            expect(3, 'not to be >=', 4);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(2, 'not to be greater than or equal to', 2);
        }, 'to throw', [
            'expected 2 not to be greater than or equal to 2'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-greater-than.md', function () {
    it('#1', function () {
        expect(function () {
            expect(3, 'to be greater than', 2);
            expect(1, 'to be above', 0);
            expect(4, 'to be >', 3);
            expect(4, '>', 3);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(2, 'to be greater than', 2);
        }, 'to throw', [
            'expected 2 to be greater than 2'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(2, 'not to be greater than', 2);
            expect(0, 'not to be above', 1);
            expect(3, 'not to be >', 4);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(3, 'not to be greater than', 2);
        }, 'to throw', [
            'expected 3 not to be greater than 2'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-infinite.md', function () {
    it('#1', function () {
        expect(function () {
            expect(Infinity, 'to be infinite');
            expect(-Infinity, 'to be infinite');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(123, 'to be infinite');
        }, 'to throw', [
            'expected 123 to be infinite'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(123, 'not to be infinite');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(Infinity, 'not to be infinite');
        }, 'to throw', [
            'expected Infinity not to be infinite'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-less-than.md', function () {
    it('#1', function () {
        expect(function () {
            expect(2, 'to be less than', 3);
            expect(0, 'to be below', 1);
            expect(3, 'to be <', 4);
            expect(3, '<', 4);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(2, 'to be less than', 2);
        }, 'to throw', [
            'expected 2 to be less than 2'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(2, 'not to be less than', 2);
            expect(1, 'not to be below', 0);
            expect(4, 'not to be <', 3);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(2, 'not to be less than', 3);
        }, 'to throw', [
            'expected 2 not to be less than 3'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-negative.md', function () {
    it('#1', function () {
        expect(function () {
            expect(-42, 'to be negative');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(0, 'to be negative');
        }, 'to throw', [
            'expected 0 to be negative'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(0, 'not to be negative');
            expect(42, 'not to be negative');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(-1, 'not to be negative');
        }, 'to throw', [
            'expected -1 not to be negative'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-positive.md', function () {
    it('#1', function () {
        expect(function () {
            expect(42, 'to be positive');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(0, 'to be positive');
        }, 'to throw', [
            'expected 0 to be positive'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(0, 'not to be positive');
            expect(-42, 'not to be positive');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(1, 'not to be positive');
        }, 'to throw', [
            'expected 1 not to be positive'
        ].join('\n'));
    });
});
describe('assertions/number/to-be-within.md', function () {
    it('#1', function () {
        expect(function () {
            expect(0, 'to be within', 0, 4);
            expect(1, 'to be within', 0, 4);
            expect(2.5, 'to be within', 0, 4);
            expect(4, 'to be within', 0, 4);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(-1, 'to be within', 0, 4);
        }, 'to throw', [
            'expected -1 to be within 0..4'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect(-1, 'not to be within', 0, 4);
            expect(5, 'not to be within', 0, 4);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect(0, 'not to be within', 0, 4);
        }, 'to throw', [
            'expected 0 not to be within 0..4'
        ].join('\n'));
    });
});
describe('assertions/object/to-be-canonical.md', function () {
    it('#1', function () {
        expect(function () {
            expect({ a: 123, b: 456 }, 'to be canonical');
            expect([456, { a: 123 }], 'to be canonical');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect([456, { b: 456, a: 123 }], 'to be canonical');
        }, 'to throw', [
            'expected [ 456, { b: 456, a: 123 } ] to be canonical'
        ].join('\n'));
    });
});
describe('assertions/string/to-be-empty.md', function () {
    it('#1', function () {
        expect(function () {
            expect('', 'to be empty');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello world', 'to be empty');
        }, 'to throw', [
            'expected \'Hello world\' to be empty'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello world', 'not to be empty');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('', 'not to be empty');
        }, 'to throw', [
            'expected \'\' not to be empty'
        ].join('\n'));
    });
});
describe('assertions/string/to-be-greater-than-or-equal-to.md', function () {
    it('#1', function () {
        expect(function () {
            expect('b', 'to be greater than or equal to', 'b');
            expect('c', 'to be >=', 'b');
            expect('c', '>=', 'c');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect(1, 'to be greater than or equal to', 'a');
        }, 'to throw', [
            'expected 1 to be greater than or equal to \'a\''
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('a', 'not to be greater than or equal to', 'b');
            expect('b', 'not to be >=', 'c');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('a', 'not to be greater than or equal to', 'a');
        }, 'to throw', [
            'expected \'a\' not to be greater than or equal to \'a\''
        ].join('\n'));
    });
});
describe('assertions/string/to-be-greater-than.md', function () {
    it('#1', function () {
        expect(function () {
            expect('b', 'to be greater than', 'a');
            expect('b', 'to be above', 'a');
            expect('b', 'to be >', 'a');
            expect('b', '>', 'a');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('a', 'to be greater than', 'a');
        }, 'to throw', [
            'expected \'a\' to be greater than \'a\''
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('a', 'not to be greater than', 'a');
            expect('a', 'not to be above', 'a');
            expect('a', 'not to be >', 'a');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('b', 'not to be above', 'a');
        }, 'to throw', [
            'expected \'b\' not to be above \'a\''
        ].join('\n'));
    });
});
describe('assertions/string/to-be-within.md', function () {
    it('#1', function () {
        expect(function () {
            expect('a', 'to be within', 'a', 'd');
            expect('b', 'to be within', 'a', 'd');
            expect('aabbcc', 'to be within', 'aaa', 'aaz');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('abbbcc', 'to be within', 'aaa', 'aaz');
        }, 'to throw', [
            'expected \'abbbcc\' to be within \'aaa\'..\'aaz\''
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('bar', 'not to be within', 'foo', 'baz');
            expect('e', 'not to be within', 'a', 'd');
            expect('abbbcc', 'not to be within', 'aaa', 'aaz');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('c', 'not to be within', 'a', 'd');
        }, 'to throw', [
            'expected \'c\' not to be within \'a\'..\'d\''
        ].join('\n'));
    });
});
describe('assertions/string/to-be.md', function () {
    it('#1', function () {
        expect(function () {
            expect('Hello', 'to be', 'Hello');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello beautiful!', 'to be', 'Hello world!');
        }, 'to throw', [
            'expected \'Hello beautiful!\' to be \'Hello world!\'',
            '',
            '-Hello beautiful!',
            '+Hello world!'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello', 'not to be', 'Hello world!');
            expect('1', 'not to be', 1);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('Hello world!', 'not to be', 'Hello world!');
        }, 'to throw', [
            'expected \'Hello world!\' not to be \'Hello world!\''
        ].join('\n'));
    });
});
describe('assertions/string/to-contain.md', function () {
    it('#1', function () {
        expect(function () {
            expect('Hello beautiful world!', 'to contain', 'beautiful');
            expect('Hello beautiful world!', 'to contain', 'Hello', 'world');
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello world!', 'to contain', 'beautiful');
        }, 'to throw', [
            'expected \'Hello world!\' to contain \'beautiful\''
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello world!', 'not to contain', 'beautiful', 'ugly');
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('Hello beautiful world!', 'not to contain', 'beautiful', 'ugly');
        }, 'to throw', [
            'expected \'Hello beautiful world!\' not to contain \'beautiful\', \'ugly\'',
            '',
            'Hello beautiful world!'
        ].join('\n'));
    });
});
describe('assertions/string/to-have-length.md', function () {
    it('#1', function () {
        expect(function () {
            expect('Hello world', 'to have length', 11);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello world', 'to have length', 12);
        }, 'to throw', [
            'expected \'Hello world\' to have length 12',
            '  expected 11 to be 12'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello world', 'not to have length', 12);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('Hello world', 'not to have length', 11);
        }, 'to throw', [
            'expected \'Hello world\' not to have length 11'
        ].join('\n'));
    });
});
describe('assertions/string/to-match.md', function () {
    it('#1', function () {
        expect(function () {
            expect('Hello beautiful world!', 'to match', /bea.t.*/);
        }, 'not to throw');
    });
    it('#2', function () {
        expect(function () {
            expect('Hello world!', 'to match', /beautiful/);
        }, 'to throw', [
            'expected \'Hello world!\' to match /beautiful/'
        ].join('\n'));
    });
    it('#3', function () {
        expect(function () {
            expect('Hello world!', 'not to match', /beautiful/);
        }, 'not to throw');
    });
    it('#4', function () {
        expect(function () {
            expect('Hello beautiful world!', 'not to match', /beautiful/);
        }, 'to throw', [
            'expected \'Hello beautiful world!\' not to match /beautiful/',
            '',
            'Hello beautiful world!'
        ].join('\n'));
    });
});
