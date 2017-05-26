/*global expect*/
describe('to be assertion', function () {
    it('assert === equality', function () {
        var obj = {};
        expect(obj).toBe(obj);
        expect(obj).notToBe({});
        expect(1).toBe(1);
        expect(1).notToBe(true);
        expect('1').notToBe(1);
        expect(null).notToBe(undefined);
        expect(null).toBeNull();
        expect(0).notToBeNull();
        expect(undefined).notToBeNull();
        expect(true).toBeTrue();
        expect(false).notToBeTrue();
        expect(false).toBeFalse();
        expect(true).notToBeFalse();
        expect(undefined).toBeUndefined();
        expect(false).toBeDefined();
        expect({}).toBeDefined();
        expect('').toBeDefined();
        expect(null).toBeDefined()
    });

    it('NaN as equal to NaN', function () {
        expect(NaN).toBe(NaN);
    });

    it('considers negative zero not to be zero', function () {
        expect(-0).notToBe(0);
    });

    it('considers negative zero to be itself', function () {
        expect(-0).toBe(-0);
    });

    it('considers zero to be itself', function () {
        expect(0).toBe(0);
    });

    if (typeof Buffer !== 'undefined') {
        it('asserts === equality for Buffers', function () {
            var buffer = new Buffer([0x45, 0x59]);
            expect(buffer).toBe(buffer);
        });
    }

    if (typeof Uint8Array !== 'undefined') {
        it('asserts === equality for Uint8Array', function () {
            var uint8Array = new Uint8Array([0x45, 0x59]);
            expect(uint8Array).toBe(uint8Array);
        });
    }

    describe('on strings', function () {
        it('throws when the assertion fails', function () {
            expect(function () {
                expect('foo').toBe('bar');
            }, 'to throw exception',
                   "expected 'foo' to be 'bar'\n" +
                   "\n" +
                   "-foo\n" +
                   "+bar");

            expect(function () {
                expect(true).notToBe(true);
            }, 'to throw exception', "expected true not to be true");

            expect(function () {
                expect(undefined).toBeDefined();
            }, 'to throw exception', "expected undefined to be defined");
        });

        it('does not provide a diff when comparing against undefined', function () {
            expect(function () {
                expect('blabla').toBeUndefined();
            }, 'to throw', "expected 'blabla' to be undefined");
        });
    });
});
